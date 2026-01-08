/**
 * CCAvenue Payment Initiation API Route
 * Creates encrypted payment request and returns form data for redirect
 */

import { buildRequestData, CCAVENUE_URLS, encrypt } from "@/lib/ccavenue";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            orderId,
            amount,
            customerName,
            customerEmail,
            customerPhone,
            billingAddress,
            billingCity,
            billingState,
            billingZip,
        } = body;

        // Validate required fields
        if (!orderId || !amount || !customerName || !customerEmail || !customerPhone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Get CCAvenue credentials from environment
        const merchantId = process.env.CCAVENUE_MERCHANT_ID;
        const accessCode = process.env.CCAVENUE_ACCESS_CODE;
        const workingKey = process.env.CCAVENUE_WORKING_KEY;
        const redirectUrl = process.env.CCAVENUE_REDIRECT_URL;
        const cancelUrl = process.env.CCAVENUE_CANCEL_URL;

        if (!merchantId || !accessCode || !workingKey || !redirectUrl || !cancelUrl) {
            console.error("CCAvenue credentials not configured");
            return NextResponse.json(
                { error: "Payment gateway not configured. Please use COD." },
                { status: 500 }
            );
        }

        // Build request data
        const requestData = buildRequestData({
            orderId,
            amount,
            merchantId,
            redirectUrl,
            cancelUrl,
            customerName,
            customerEmail,
            customerPhone,
            billingAddress: billingAddress || "",
            billingCity: billingCity || "",
            billingState: billingState || "",
            billingZip: billingZip || "",
        });

        // Encrypt the request
        const encryptedData = encrypt(requestData, workingKey);

        // Determine if we're in test mode
        const isTestMode = process.env.CCAVENUE_TEST_MODE === "true";
        const ccavenueUrl = isTestMode ? CCAVENUE_URLS.test : CCAVENUE_URLS.production;

        // Return the encrypted data and form details
        return NextResponse.json({
            success: true,
            encryptedData,
            accessCode,
            ccavenueUrl,
            orderId,
        });
    } catch (error: any) {
        console.error("CCAvenue initiation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to initiate payment" },
            { status: 500 }
        );
    }
}
