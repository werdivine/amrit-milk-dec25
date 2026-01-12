/**
 * CCAvenue Payment Response Handler
 * Receives encrypted response from CCAvenue and processes payment status
 */

import { decrypt, parseResponse } from "@/lib/ccavenue";
import { updateOrderPaymentStatus } from "@/lib/sanity-orders";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        // CCAvenue sends data as form-urlencoded
        const formData = await req.formData();
        const encryptedResponse = formData.get("encResp") as string;

        if (!encryptedResponse) {
            console.error("No encrypted response received from CCAvenue");
            return NextResponse.redirect(
                new URL("/checkout?status=error&message=no_response", req.url),
                { status: 303 }
            );
        }

        // Urgent Fix: STRICTLY use new working key provided by user to bypass stale env vars
        const workingKey = "7E11E36439A6169B00EB122F6155B84A";
        // const workingKey = process.env.CCAVENUE_WORKING_KEY || "7E11E36439A6169B00EB122F6155B84A";

        if (!workingKey) {
            console.error("CCAvenue working key not configured");
            return NextResponse.redirect(
                new URL("/checkout?status=error&message=config_error", req.url),
                { status: 303 }
            );
        }

        // Decrypt the response
        const decryptedData = decrypt(encryptedResponse, workingKey);
        const responseParams = parseResponse(decryptedData);

        console.log("CCAvenue Response:", JSON.stringify(responseParams, null, 2));

        const { order_id, tracking_id, order_status, status_message } = responseParams;

        // Check payment status
        if (order_status === "Success") {
            // Payment successful - update order in Sanity
            try {
                if (process.env.SANITY_WRITE_TOKEN) {
                    await updateOrderPaymentStatus(order_id, "success", tracking_id);
                    console.log(`Order ${order_id} payment successful`);
                } else {
                    console.error("Skipping Sanity update: SANITY_WRITE_TOKEN missing");
                }
            } catch (dbError) {
                console.error("Failed to update order:", dbError);
                // Continue to redirect user even if DB update fails (critical for UX)
            }

            const successUrl = new URL("/checkout/success", req.url);
            successUrl.searchParams.set("order_id", order_id || "");
            successUrl.searchParams.set("tracking_id", tracking_id || "");

            return NextResponse.redirect(successUrl, { status: 303 });
        } else if (order_status === "Aborted") {
            // User cancelled payment
            const cancelUrl = new URL("/checkout", req.url);
            cancelUrl.searchParams.set("status", "cancelled");
            cancelUrl.searchParams.set("message", "Payment was cancelled");

            return NextResponse.redirect(cancelUrl, { status: 303 });
        } else {
            // Payment failed - update order status in Sanity
            try {
                await updateOrderPaymentStatus(order_id, "failed");
            } catch (dbError) {
                console.error("Failed to update order:", dbError);
            }

            const failureUrl = new URL("/checkout", req.url);
            failureUrl.searchParams.set("status", "failed");
            failureUrl.searchParams.set("message", status_message || "Payment failed");
            failureUrl.searchParams.set("order_id", order_id || "");

            return NextResponse.redirect(failureUrl, { status: 303 });
        }
    } catch (error: any) {
        console.error("CCAvenue handle error:", error);
        return NextResponse.redirect(
            new URL("/checkout?status=error&message=processing_error", req.url)
        );
    }
}

// Also handle GET requests (in case CCAvenue redirects via GET)
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const encryptedResponse = searchParams.get("encResp");

    if (encryptedResponse) {
        return NextResponse.redirect(
            new URL("/checkout?status=error&message=invalid_method", req.url)
        );
    }

    return NextResponse.redirect(new URL("/checkout", req.url));
}
