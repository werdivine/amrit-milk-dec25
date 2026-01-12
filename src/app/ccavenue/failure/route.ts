import { decrypt, parseResponse } from "@/lib/ccavenue";
import { updateOrderPaymentStatus } from "@/lib/sanity-orders";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const encResp = formData.get("encResp") as string;
        // Urgent Fix: Hardcoded key to match user provided credentials
        const workingKey = "7E11E36439A6169B00EB122F6155B84A";
        // const workingKey = process.env.CCAVENUE_WORKING_KEY;

        if (!encResp || !workingKey) {
            return NextResponse.redirect(new URL("/checkout?error=invalid_response", req.url));
        }

        const decryptedResponse = decrypt(encResp, workingKey);
        const params = parseResponse(decryptedResponse);

        console.log("CCAvenue Failure Callback:", params);

        const orderId = params.order_id;
        const trackingId = params.tracking_id;

        try {
            if (process.env.SANITY_WRITE_TOKEN) {
                await updateOrderPaymentStatus(orderId, "failed", trackingId);
            }
        } catch (err) {
            console.error("Sanity update failed:", err);
        }

        return NextResponse.redirect(new URL(`/checkout?error=payment_failed`, req.url));
    } catch (error) {
        console.error("CCAvenue Failure Error:", error);
        return NextResponse.redirect(new URL("/checkout?error=processing_error", req.url));
    }
}
