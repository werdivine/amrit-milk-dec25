/**
 * Subscription Payment Response Handler
 * Processes CCAvenue callback for recurring payments
 */

import { decrypt, parseResponse } from "@/lib/ccavenue";
import { client } from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const encResponse = formData.get("encResp") as string;

        if (!encResponse) {
            console.error("[Subscription] No encrypted response from CCAvenue");
            return NextResponse.redirect(new URL("/subscription/failed", req.url), 303);
        }

        const workingKey = "7E11E36439A6169B00EB122F6155B84A".trim();
        const decrypted = decrypt(encResponse, workingKey);
        const responseParams = parseResponse(decrypted);

        console.log("[Subscription] CCAvenue Response:", {
            orderId: responseParams.order_id,
            status: responseParams.order_status,
        });

        const isSuccess = responseParams.order_status === "Success";

        if (isSuccess) {
            // Create subscription in Sanity
            const subscription = {
                _type: "subscription",
                subscriptionId: responseParams.order_id,
                customer: {
                    name: responseParams.billing_name,
                    email: responseParams.billing_email,
                    phone: responseParams.billing_tel,
                    address: `${responseParams.billing_address}, ${responseParams.billing_city}, ${responseParams.billing_zip}`,
                },
                product: {
                    productId: responseParams.merchant_param2 || "unknown",
                    name: responseParams.merchant_param4 || "Product Name",
                    quantity: 1,
                    price: parseFloat(responseParams.amount),
                },
                plan: {
                    planType: responseParams.merchant_param3 || "one_time",
                    startDate: new Date().toISOString().split("T")[0],
                    nextDelivery: new Date(Date.now() + 86400000).toISOString(), // +1 day
                },
                status: "active", // Active immediately after payment
                paymentMethod: "prepaid_one_time",
                ccavenueData: {
                    // Store tracking ID for the initial payment
                    subscriptionRefNo: responseParams.tracking_id,
                    mandateId: "N/A", // No mandate for one-time
                    cardToken: responseParams.card_name,
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            await client.create(subscription);

            console.log(`[Subscription] Created ${responseParams.order_id}`);

            return NextResponse.redirect(
                new URL(`/subscription/success?id=${responseParams.order_id}`, req.url),
                303
            );
        } else {
            console.error("[Subscription] Payment failed:", responseParams.failure_message);

            return NextResponse.redirect(
                new URL(
                    `/subscription/failed?reason=${encodeURIComponent(
                        responseParams.failure_message || "Unknown error"
                    )}`,
                    req.url
                ),
                303
            );
        }
    } catch (error: any) {
        console.error("[Subscription] Handler error:", error);
        return NextResponse.redirect(
            new URL("/subscription/failed?reason=server_error", req.url),
            303
        );
    }
}
