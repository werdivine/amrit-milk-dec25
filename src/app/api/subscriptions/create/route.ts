/**
 * Subscription Creation API
 * Initiates recurring payment with CCAvenue
 */

import { encrypt, CCAVENUE_URLS, buildRequestData } from "@/lib/ccavenue";
import { calculateNextDelivery } from "@/lib/ccavenue-recurring";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            productId,
            productName,
            variant,
            quantity,
            price,
            frequency,
            customerName,
            customerEmail,
            customerPhone,
            billingAddress,
            billingCity,
            billingState,
            billingZip,
            startDate, // YYYY-MM-DD format
        } = body;

        // Validate
        if (!productId || !customerName || !customerEmail || !customerPhone || !frequency) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Use same CCAvenue credentials
        const merchantId = "1475948".trim();
        const accessCode = "AVPB87NA49AZ79BPZA".trim();
        const workingKey = "7E11E36439A6169B00EB122F6155B84A".trim();

        const redirectUrl = "https://www.amritmilkorganic.com/api/subscriptions/handle";
        const cancelUrl = "https://www.amritmilkorganic.com/api/subscriptions/handle";

        // Generate subscription ID
        const subscriptionId = `SUB-${Date.now()}-${productId.slice(0, 8)}`;
        const amount = price * quantity;

        // Build recurring payment request
        const requestData = buildRequestData({
            orderId: subscriptionId,
            amount: amount,
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

        // Add subscription metadata as custom parameters
        const params = new URLSearchParams(requestData);
        params.set("merchant_param1", "subscription"); // Type
        params.set("merchant_param2", productId); // Product ID
        params.set("merchant_param3", frequency); // Frequency
        params.set("merchant_param4", productName); // Product Name

        console.log(`[Subscription] Creating one-time payment subscription ${subscriptionId}`);

        // Encrypt for CCAvenue
        const encryptedData = encrypt(params.toString(), workingKey);

        // Calculate next delivery
        const nextDelivery = calculateNextDelivery(new Date(startDate || Date.now()), frequency);

        const isTestMode = process.env.CCAVENUE_TEST_MODE === "true";
        const ccavenueUrl = isTestMode ? CCAVENUE_URLS.test : CCAVENUE_URLS.production;

        // Return encrypted data for client-side form submission
        return NextResponse.json({
            success: true,
            subscriptionId,
            encryptedData,
            accessCode,
            ccavenueUrl,
            nextDelivery: nextDelivery.toISOString(),
            metadata: {
                productId,
                productName,
                variant,
                quantity,
                frequency,
            },
        });
    } catch (error: any) {
        console.error("[Subscription] Creation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create subscription" },
            { status: 500 }
        );
    }
}
