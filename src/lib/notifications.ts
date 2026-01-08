/**
 * Notification System
 * Sends email and WhatsApp notifications for orders
 */

interface OrderNotificationData {
    orderNumber: string;
    customerName: string;
    email: string;
    phone: string;
    total: number;
    paymentMethod: string;
    items: { title: string; quantity: number; price: string }[];
}

/**
 * Send email notification via Resend
 * Resend offers 3,000 emails/month free
 */
export async function sendOrderEmailNotification(order: OrderNotificationData): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;
    const merchantEmail = process.env.MERCHANT_EMAIL;

    if (!resendApiKey || !merchantEmail) {
        console.warn("Email notification skipped: RESEND_API_KEY or MERCHANT_EMAIL not configured");
        return false;
    }

    const itemsList = order.items
        .map((item) => `• ${item.title} × ${item.quantity} - ${item.price}`)
        .join("\n");

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Amrit Milk <orders@amritmilkorganic.com>",
                to: merchantEmail.split(",").map((e) => e.trim()),
                subject: `🛒 New Order: ${order.orderNumber} - ₹${order.total}`,
                html: `
                    <h2>New Order Received!</h2>
                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                    <p><strong>Customer:</strong> ${order.customerName}</p>
                    <p><strong>Phone:</strong> ${order.phone}</p>
                    <p><strong>Email:</strong> ${order.email}</p>
                    <p><strong>Payment:</strong> ${order.paymentMethod.toUpperCase()}</p>
                    <hr>
                    <h3>Items:</h3>
                    <pre>${itemsList}</pre>
                    <hr>
                    <p><strong>Total: ₹${order.total}</strong></p>
                    <p><a href="https://amritmilkorganic.com/admin">View in Admin Dashboard</a></p>
                `,
            }),
        });

        if (response.ok) {
            console.log(`Email notification sent for order ${order.orderNumber}`);
            return true;
        } else {
            console.error("Email send failed:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Email notification error:", error);
        return false;
    }
}

/**
 * Send customer confirmation email
 */
export async function sendCustomerConfirmationEmail(
    order: OrderNotificationData
): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey || !order.email) {
        console.warn("Customer email skipped: No API key or customer email");
        return false;
    }

    const itemsList = order.items
        .map((item) => `• ${item.title} × ${item.quantity} - ${item.price}`)
        .join("<br>");

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Amrit Milk <orders@amritmilkorganic.com>",
                to: [order.email],
                subject: `Order Confirmed: ${order.orderNumber} - Amrit Milk`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #D4AF37;">Thank you for your order!</h1>
                        <p>Hi ${order.customerName},</p>
                        <p>Your order has been received and is being prepared with care.</p>
                        
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                            <p><strong>Payment Method:</strong> ${order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
                        </div>
                        
                        <h3>Order Items:</h3>
                        <p>${itemsList}</p>
                        
                        <p style="font-size: 24px; color: #D4AF37;"><strong>Total: ₹${order.total}</strong></p>
                        
                        <hr>
                        <p style="color: #666; font-size: 14px;">
                            If you have any questions, reply to this email or reach out on WhatsApp.
                        </p>
                        <p style="color: #D4AF37;"><strong>Welcome to the Amrit family! 🥛</strong></p>
                    </div>
                `,
            }),
        });

        if (response.ok) {
            console.log(`Customer confirmation email sent to ${order.email}`);
            return true;
        } else {
            console.error("Customer email failed:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Customer email error:", error);
        return false;
    }
}

/**
 * Send WhatsApp notification via CallMeBot (FREE)
 * Setup: Send "I allow callmebot to send me messages" to +34 644 71 98 67 on WhatsApp
 * Then use the apikey you receive
 */
export async function sendWhatsAppNotification(order: OrderNotificationData): Promise<boolean> {
    const whatsappNumber = process.env.MERCHANT_WHATSAPP;
    const apiKey = process.env.CALLMEBOT_API_KEY;

    if (!whatsappNumber || !apiKey) {
        console.warn(
            "WhatsApp notification skipped: MERCHANT_WHATSAPP or CALLMEBOT_API_KEY not configured"
        );
        return false;
    }

    const message = encodeURIComponent(
        `🛒 *New Order!*\n\n` +
            `Order: ${order.orderNumber}\n` +
            `Customer: ${order.customerName}\n` +
            `Phone: ${order.phone}\n` +
            `Total: ₹${order.total}\n` +
            `Payment: ${order.paymentMethod.toUpperCase()}\n\n` +
            `View: amritmilkorganic.com/admin`
    );

    try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${whatsappNumber}&text=${message}&apikey=${apiKey}`;
        const response = await fetch(url);

        if (response.ok) {
            console.log(`WhatsApp notification sent for order ${order.orderNumber}`);
            return true;
        } else {
            console.error("WhatsApp send failed:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("WhatsApp notification error:", error);
        return false;
    }
}

/**
 * Send all notifications for a new order
 */
export async function sendOrderNotifications(order: OrderNotificationData): Promise<void> {
    // Send all notifications in parallel
    await Promise.allSettled([
        sendOrderEmailNotification(order),
        sendCustomerConfirmationEmail(order),
        sendWhatsAppNotification(order),
    ]);
}
