/**
 * Sanity Order Management
 * Functions for creating and updating orders in Sanity
 */

import { createClient } from "@sanity/client";

// Create a write-enabled Sanity client
const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fqzgs92z",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false, // Must be false for writes
    token: process.env.SANITY_WRITE_TOKEN, // Required for mutations
});

interface OrderItem {
    title: string;
    quantity: number;
    price: string;
}

interface CreateOrderData {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee?: number;
    total: number;
    paymentMethod: "cod" | "ccavenue";
}

/**
 * Generate unique order number
 * Format: AMR-YYYYMMDD-XXXX
 */
function generateOrderNumber(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.floor(1000 + Math.random() * 9000);
    return `AMR-${dateStr}-${random}`;
}

/**
 * Create a new order in Sanity
 */
export async function createOrder(
    data: CreateOrderData
): Promise<{ orderNumber: string; id: string }> {
    const orderNumber = generateOrderNumber();

    const result = await writeClient.create({
        _type: "order",
        orderNumber,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        items: data.items.map((item) => ({
            _type: "object",
            _key: Math.random().toString(36).slice(2),
            title: item.title,
            quantity: item.quantity,
            price: item.price,
        })),
        subtotal: data.subtotal,
        deliveryFee: data.deliveryFee || 0,
        total: data.total,
        paymentMethod: data.paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
    });

    console.log(`Order created in Sanity: ${orderNumber}`);

    return {
        orderNumber,
        id: result._id,
    };
}

/**
 * Update order payment status after CCAvenue callback
 */
export async function updateOrderPaymentStatus(
    orderNumber: string,
    status: "success" | "failed",
    trackingId?: string
): Promise<void> {
    // Find the order by orderNumber
    const query = `*[_type == "order" && orderNumber == $orderNumber][0]._id`;
    const orderId = await writeClient.fetch(query, { orderNumber });

    if (!orderId) {
        console.error(`Order not found: ${orderNumber}`);
        return;
    }

    await writeClient
        .patch(orderId)
        .set({
            paymentStatus: status,
            orderStatus: status === "success" ? "processing" : "pending",
            ...(trackingId && { trackingId }),
        })
        .commit();

    console.log(`Order ${orderNumber} payment status updated to ${status}`);
}

/**
 * Create a contact query in Sanity
 */
export async function createContactQuery(data: {
    name: string;
    email?: string;
    phone?: string;
    subject?: string;
    message: string;
}): Promise<{ id: string }> {
    const result = await writeClient.create({
        _type: "contactQuery",
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        subject: data.subject || "",
        message: data.message,
        status: "new",
    });

    console.log(`Contact query created: ${result._id}`);

    return { id: result._id };
}

/**
 * Get recent orders for Admin Dashboard
 */
export async function getOrders(limit = 50) {
    const query = `*[_type == "order"] | order(_createdAt desc) [0...$limit] {
        _id,
        orderNumber,
        customerName,
        email,
        phone,
        address,
        city,
        pincode,
        items,
        total,
        paymentMethod,
        paymentStatus,
        orderStatus,
        _createdAt
    }`;

    try {
        const orders = await writeClient.fetch(query, { limit });
        return orders.map((order: any) => ({
            id: order._id,
            ...order,
            createdAt: order._createdAt,
        }));
    } catch (error) {
        console.error("Failed to fetch orders from Sanity:", error);
        throw new Error("Failed to fetch orders");
    }
}
