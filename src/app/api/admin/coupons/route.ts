import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: List all coupons
export async function GET(req: NextRequest) {
    try {
        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, coupons });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch coupons" },
            { status: 500 }
        );
    }
}

// POST: Create new coupon
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { code, type, value, minOrderValue, isActive, description } = body;

        // Basic validation
        if (!code || !type || !value) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const coupon = await prisma.coupon.create({
            data: {
                code,
                type,
                value: parseFloat(value),
                minOrderValue: minOrderValue ? parseFloat(minOrderValue) : 0,
                isActive: isActive ?? true,
                description,
            },
        });

        return NextResponse.json({ success: true, coupon });
    } catch (error: any) {
        console.error("Create coupon error:", error);
        if (error.code === "P2002") {
            return NextResponse.json(
                { success: false, error: "Coupon code already exists" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: "Failed to create coupon" },
            { status: 500 }
        );
    }
}

// DELETE: Delete coupon
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
        }

        await prisma.coupon.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Coupon deleted" });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to delete coupon" },
            { status: 500 }
        );
    }
}
