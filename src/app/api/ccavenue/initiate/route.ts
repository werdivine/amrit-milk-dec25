/**
 * CCAvenue Payment Initiation API Route
 * Creates encrypted payment request and returns form data for redirect
 */

import { buildRequestData, CCAVENUE_URLS, encrypt } from "@/lib/ccavenue";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function cleanEnv(value?: string | null): string | null {
    if (!value) return null;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
}

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

        if (Number(amount) <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // Urgent Fix: STRICTLY use new credentials provided by user to bypass stale env vars
        const merchantId = "1475948".trim();
        const accessCode = "AVPB87NA49AZ79BPZA".trim();
        const workingKey = "7E11E36439A6169B00EB122F6155B84A".trim();

        // const merchantId = cleanEnv(process.env.CCAVENUE_MERCHANT_ID) || "1475948";
        // const accessCode = cleanEnv(process.env.CCAVENUE_ACCESS_CODE) || "AVPB87NA49AZ79BPZA";
        // const workingKey = cleanEnv(process.env.CCAVENUE_WORKING_KEY) || "7E11E36439A6169B00EB122F6155B84A";

        const redirectUrl = "https://www.amritmilkorganic.com/ccavenue/success";
        const cancelUrl = "https://www.amritmilkorganic.com/ccavenue/failure";

        // const redirectUrl =
        //     cleanEnv(process.env.CCAVENUE_REDIRECT_URL) ||
        //     "https://www.amritmilkorganic.com/api/ccavenue/handle";
        // const cancelUrl =
        //     cleanEnv(process.env.CCAVENUE_CANCEL_URL) ||
        //     "https://www.amritmilkorganic.com/checkout?status=cancelled";

        if (!accessCode || !workingKey) {
            console.error("CCAvenue credentials (Access Code/Working Key) not configured");
            return NextResponse.json(
                { error: "Payment gateway credentials missing." },
                { status: 500 }
            );
        }

        const safeOrderId = String(orderId).slice(0, 30);

        // Build request data
        const requestData = buildRequestData({
            orderId: safeOrderId,
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
        });

        console.log(
            "CCAvenue Request Data (Raw):",
            JSON.stringify(
                {
                    orderId: safeOrderId,
                    amount,
                    merchantId: "***",
                    redirectUrl,
                    cancelUrl,
                },
                null,
                2
            )
        );

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
