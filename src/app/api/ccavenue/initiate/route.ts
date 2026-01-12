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

        // Use the exact URLs provided by the user + fallback to Merchant 1475948
        const merchantId = process.env.CCAVENUE_MERCHANT_ID || "1475948";
        const accessCode = process.env.CCAVENUE_ACCESS_CODE;
        const workingKey = process.env.CCAVENUE_WORKING_KEY;

        // HARDCODED as strict requirement to fix "Invalid Response"
        const redirectUrl = "https://www.amritmilkorganic.com/ccavenue/success";
        const cancelUrl = "https://www.amritmilkorganic.com/ccavenue/failure";

        if (!accessCode || !workingKey) {
            console.error("CCAvenue credentials (Access Code/Working Key) not configured");
            return NextResponse.json(
                { error: "Payment gateway credentials missing." },
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
            currency: "INR",
            language: "EN",
        });

        console.log(
            "CCAvenue Request Data (Raw):",
            JSON.stringify(
                {
                    ...requestData,
                    merchantId: "***", // Masking sensitive info
                },
                null,
                2
            )
        );

        console.log("CCAvenue Request Encrypted String:", requestData);

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
