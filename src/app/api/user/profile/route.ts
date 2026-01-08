import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const phone = searchParams.get("phone");

        if (!phone) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }

        // Normalize phone: remove non-digits, keep last 10
        const cleanPhone = phone.replace(/\D/g, "").slice(-10);

        // Find all orders for this phone (using contains or endsWith to be safe with +91 etc)
        // Since sqlite/prisma string matching can be tricky with diverse formats,
        // we'll try to match vaguely or use the exact string if consistent.
        // For now, let's assume the frontend sends a format that matches or we search loosely.
        const orders = await prisma.order.findMany({
            where: {
                phone: {
                    contains: cleanPhone,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (orders.length === 0) {
            return NextResponse.json({
                exists: false,
                profile: {
                    name: "Guest",
                    phone: phone,
                    tier: "Silver",
                    totalSpent: 0,
                    activeSubscriptions: 0,
                    impactPoints: 0,
                },
                orders: [],
            });
        }

        const lastOrder = orders[0];

        // Calculate Stats
        const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);

        // Determine Tier
        let tier = "Silver";
        if (totalSpent > 15000) tier = "Platinum Elite";
        else if (totalSpent > 5000) tier = "Gold Member";

        // Impact Points (Mock logic: 10% of spend)
        const impactPoints = Math.floor(totalSpent * 0.1);

        return NextResponse.json({
            exists: true,
            profile: {
                name: lastOrder.customerName,
                email: lastOrder.email,
                phone: lastOrder.phone,
                address: lastOrder.address,
                city: lastOrder.city,
                state: lastOrder.state,
                tier,
                totalSpent,
                activeSubscriptions: 0, // We assume 0 for now as Subscription model isn't visible yet
                impactPoints,
            },
            orders: orders.map((o) => ({
                id: o.id,
                orderNumber: o.orderNumber,
                date: o.createdAt,
                status: o.orderStatus,
                total: o.total,
                items: o.items, // simpler to pass raw string or parse if needed, but client can handle
            })),
        });
    } catch (error) {
        console.error("Profile fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}
