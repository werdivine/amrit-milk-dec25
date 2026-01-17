import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { code, cartTotal } = await req.json();

        if (!code) {
            return NextResponse.json(
                { valid: false, message: "Please enter a coupon code" },
                { status: 400 }
            );
        }

        const coupon = await prisma.coupon.findUnique({
            where: { code: code.trim() },
        });

        if (!coupon) {
            return NextResponse.json(
                { valid: false, message: "Invalid coupon code" },
                { status: 200 } // Return 200 so frontend handles it gracefully
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
