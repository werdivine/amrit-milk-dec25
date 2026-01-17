import { NextRequest, NextResponse } from "next/server";

// Hardcoded coupons for production (Vercel doesn't support SQLite)
// To add new coupons, add them to this list
const COUPONS = [
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

        const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());

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
