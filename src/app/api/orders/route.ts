/**
 * Orders API Route
 * Creates orders in Sanity and sends notifications
 */

import { sendOrderNotifications } from "@/lib/notifications";
import { createOrder } from "@/lib/sanity-orders";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for new orders
const orderSchema = z.object({
    customerName: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().optional().default(""),
    pincode: z.string().min(5, "Pincode is required"),
    items: z.array(
        z.object({
            id: z.string().optional(),
            title: z.string(),
            price: z.string(),
            quantity: z.number(),
            image: z.string().optional(),
            slug: z.string().optional(),
        })
    ),
    subtotal: z.number(),
    deliveryFee: z.number().optional().default(0),
    total: z.number(),
    paymentMethod: z.enum(["cod", "ccavenue"]),
});

/**
 * POST - Create new order
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const validationResult = orderSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    details: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        // Config Check
        if (!process.env.SANITY_WRITE_TOKEN) {
            console.error("Critical: SANITY_WRITE_TOKEN is missing.");
            return NextResponse.json(
                {
                    success: false,
                    error: "Server configuration error: Database write token missing.",
                },
                { status: 500 }
            );
        }

        const data = validationResult.data;

        // Create order in Sanity
        const { orderNumber, id } = await createOrder({
            customerName: data.customerName,
            email: data.email || "",
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state || "",
            pincode: data.pincode,
            items: data.items.map((item) => ({
                title: item.title,
                quantity: item.quantity,
                price: item.price,
            })),
            subtotal: data.subtotal,
            deliveryFee: data.deliveryFee || 0,
            total: data.total,
            paymentMethod: data.paymentMethod,
        });

        console.log(`Order created: ${orderNumber}`);

        // Send notifications (Await to ensure completion in serverless)
        try {
            await sendOrderNotifications({
                orderNumber,
                customerName: data.customerName,
                email: data.email || "",
                phone: data.phone,
                total: data.total,
                paymentMethod: data.paymentMethod,
                items: data.items.map((item) => ({
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price,
                })),
            });
        } catch (err) {
            console.error("Notification error:", err);
        }

        return NextResponse.json({
            success: true,
            order: {
                id,
                orderNumber,
                total: data.total,
                paymentMethod: data.paymentMethod,
            },
        });
    } catch (error: any) {
        console.error("Order creation error:", error);

        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to create order",
            },
            { status: 500 }
        );
    }
}

/**
 * GET - List orders (for Admin UI)
 */
export async function GET(req: NextRequest) {
    try {
        // Simple auth check (can be enhanced)
        // For now, relies on route protection or obscure URL if needed
        // Since this is an admin route, usually protected by middleware

        // Fetch orders from Sanity
        const { getOrders } = await import("@/lib/sanity-orders");
        const orders = await getOrders(50);

        return NextResponse.json({
            success: true,
            orders,
        });
    } catch (error: any) {
        console.error("Orders GET Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
