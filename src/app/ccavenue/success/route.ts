import { decrypt, parseResponse } from "@/lib/ccavenue";
import { updateOrderPaymentStatus } from "@/lib/sanity-orders";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const encResp = formData.get("encResp") as string;
        const workingKey = process.env.CCAVENUE_WORKING_KEY;

        if (!encResp || !workingKey) {
            console.error("Missing encResp or workingKey");
            return NextResponse.redirect(new URL("/checkout?error=invalid_response", req.url));
        }

        const decryptedResponse = decrypt(encResp, workingKey);
        const params = parseResponse(decryptedResponse);

        console.log("CCAvenue Success Callback:", params);

        const orderId = params.order_id;
        const trackingId = params.tracking_id;
        const orderStatus = params.order_status;

        if (orderStatus === "Success") {
            try {
                if (process.env.SANITY_WRITE_TOKEN) {
                    await updateOrderPaymentStatus(orderId, "success", trackingId);
                }
            } catch (err) {
                console.error("Sanity update failed:", err);
            }
            // Redirect to success page
            return NextResponse.redirect(new URL(`/checkout/success?order_id=${orderId}`, req.url));
        } else {
            // Unexpected status in success route
            return NextResponse.redirect(
                new URL(`/checkout?error=payment_failed_status_${orderStatus}`, req.url)
            );
        }
    } catch (error) {
        console.error("CCAvenue Success Error:", error);
        return NextResponse.redirect(new URL("/checkout?error=processing_error", req.url));
    }
}
