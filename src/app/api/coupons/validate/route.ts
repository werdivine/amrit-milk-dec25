import { createClient } from "@sanity/client";
import { NextRequest, NextResponse } from "next/server";

// Sanity client for reading coupons
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fqzgs92z",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true, // Use CDN for faster reads
});

// Fallback coupons in case Sanity is empty or fails
const FALLBACK_COUPONS = [
    { code: "IBS20", type: "percentage", value: 20, minOrderValue: 0, isActive: true },
    { code: "CMS25", type: "percentage", value: 25, minOrderValue: 0, isActive: true },
    { code: "FRIENDS30", type: "percentage", value: 30, minOrderValue: 0, isActive: true },
    { code: "AMRIT5", type: "percentage", value: 5, minOrderValue: 0, isActive: true },
    { code: "AMRIT10", type: "percentage", value: 10, minOrderValue: 0, isActive: true },
    { code: "AMRIT15", type: "percentage", value: 15, minOrderValue: 0, isActive: true },
    { code: "AMRIT20", type: "percentage", value: 20, minOrderValue: 0, isActive: true },
    { code: "GAGAN30", type: "percentage", value: 30, minOrderValue: 0, isActive: true },
    { code: "WELCOME10", type: "percentage", value: 10, minOrderValue: 0, isActive: true },
];

export async function POST(req: NextRequest) {
    try {
        const { code, cartTotal } = await req.json();

        if (!code) {
            return NextResponse.json(
                { valid: false, message: "Please enter a coupon code" },
                { status: 200 }
            );
        }

        const upperCode = code.trim().toUpperCase();

        // Try to find coupon in Sanity first
        let coupon = null;
        try {
            const query = `*[_type == "coupon" && code == $code && isActive == true][0]{
                code, type, value, minOrderValue, isActive
            }`;
            coupon = await sanityClient.fetch(query, { code: upperCode }, {
                next: { tags: ["coupon"] }
            });
        } catch (sanityError) {
            console.warn("Sanity fetch failed, using fallback:", sanityError);
        }

        // If not found in Sanity, check fallback list
        if (!coupon) {
            coupon = FALLBACK_COUPONS.find((c) => c.code === upperCode && c.isActive);
        }

        if (!coupon) {
            return NextResponse.json(
                { valid: false, message: "Invalid coupon code" },
                { status: 200 }
            );
        }

        if (!coupon.isActive) {
            return NextResponse.json(
                { valid: false, message: "This coupon is no longer active" },
                { status: 200 }
            );
        }

        if (coupon.minOrderValue && cartTotal < coupon.minOrderValue) {
            return NextResponse.json(
                {
                    valid: false,
                    message: `Minimum order of ₹${coupon.minOrderValue} required`,
                },
                { status: 200 }
            );
        }

        let discount = 0;
        if (coupon.type === "percentage") {
            discount = Math.round((cartTotal * coupon.value) / 100);
        } else {
            discount = coupon.value;
        }

        // Ensure discount doesn't exceed total
        discount = Math.min(discount, cartTotal);

        return NextResponse.json({
            valid: true,
            discount,
            type: coupon.type,
            value: coupon.value,
            message: `Coupon applied: ${coupon.type === "percentage" ? coupon.value + "% OFF" : "₹" + coupon.value + " OFF"}`,
        });
    } catch (error: any) {
        console.error("Coupon validation error:", error);
        return NextResponse.json(
            { valid: false, message: "Error validating coupon" },
            { status: 500 }
        );
    }
}
