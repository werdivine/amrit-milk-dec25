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

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ionos.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        // IONOS compatibility settings
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
});

/**
 * Send email notification via SMTP (IONOS)
 */
export async function sendOrderEmailNotification(order: OrderNotificationData): Promise<boolean> {
    const smtpUser = process.env.SMTP_USER;
    const merchantEmail = process.env.MERCHANT_EMAIL || "hello@amritmilk.com";

    if (!smtpUser) {
        console.warn("Email notification skipped: SMTP_USER not configured");
        return false;
    }

    const itemsList = order.items
        .map((item) => `• ${item.title} × ${item.quantity} - ${item.price}`)
        .join("\n");

    try {
        await transporter.sendMail({
            from: `"Amrit Milk Orders" <${smtpUser}>`,
            to: merchantEmail.split(",").map((e) => e.trim()),
            subject: `🛒 New Order: ${order.orderNumber} - ₹${order.total}`,
            text: `New Order Received!\n\nOrder Number: ${order.orderNumber}\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nEmail: ${order.email}\nPayment: ${order.paymentMethod.toUpperCase()}\n\nItems:\n${itemsList}\n\nTotal: ₹${order.total}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #D4AF37;">New Order Received!</h2>
                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                    <p><strong>Customer:</strong> ${order.customerName}</p>
                    <p><strong>Phone:</strong> ${order.phone}</p>
                    <p><strong>Email:</strong> ${order.email}</p>
                    <p><strong>Payment:</strong> ${order.paymentMethod.toUpperCase()}</p>
                    <hr>
                    <h3>Items:</h3>
                    <pre style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${itemsList}</pre>
                    <hr>
                    <p style="font-size: 18px;"><strong>Total: ₹${order.total}</strong></p>
                </div>
            `,
        });

        console.log(`SMTP Email notification sent for order ${order.orderNumber}`);
        return true;
    } catch (error) {
        console.error("SMTP Email notification error:", error);
        return false;
    }
}

/**
 * Send customer confirmation email via SMTP
 */
export async function sendCustomerConfirmationEmail(
    order: OrderNotificationData
): Promise<boolean> {
    const smtpUser = process.env.SMTP_USER;

    if (!smtpUser || !order.email) {
        console.warn("Customer email skipped: No SMTP user or customer email");
        return false;
    }

    const itemsList = order.items
        .map((item) => `• ${item.title} × ${item.quantity} - ${item.price}`)
        .join("<br>");

    try {
        await transporter.sendMail({
            from: `"Amrit Milk" <${smtpUser}>`,
            to: order.email,
            subject: `Order Confirmed: ${order.orderNumber} - Amrit Milk`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a; padding: 30px; background: #fff;">
                    <h1 style="color: #D4AF37; text-align: center;">Thank you for your order!</h1>
                    <p>Hi ${order.customerName},</p>
                    <p>Your order has been received and is being prepared with pure care from our farm to your kitchen.</p>
                    
                    <div style="background: #fdfaf0; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5d1b1;">
                        <p style="margin: 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
                        <p style="margin: 5px 0 0 0;"><strong>Payment Method:</strong> ${order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
                    </div>
                    
                    <h3 style="border-bottom: 2px solid #D4AF37; padding-bottom: 5px;">Order Summary:</h3>
                    <p style="line-height: 1.6;">${itemsList}</p>
                    
                    <p style="font-size: 24px; color: #1a1a1a; text-align: right;"><strong>Total Paid: ₹${order.total}</strong></p>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #666; font-size: 14px; text-align: center;">
                        If you have any questions, reply to this email or reach out on WhatsApp (+91 81306 93767).
                    </p>
                    <p style="color: #D4AF37; text-align: center; font-size: 18px;"><strong>Welcome to the Amrit family! 🥛</strong></p>
                </div>
            `,
        });

        console.log(`Customer SMTP confirmation email sent to ${order.email}`);
        return true;
    } catch (error: any) {
        console.error("Customer SMTP email error details:", {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
        });
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
            `View Order: Not available`
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
    console.log(`Starting notifications for order: ${order.orderNumber} to ${order.email}`);
    // Send all notifications in parallel
    const results = await Promise.allSettled([
        sendOrderEmailNotification(order),
        sendCustomerConfirmationEmail(order),
        sendWhatsAppNotification(order),
    ]);
    console.log(
        `Notifications complete for ${order.orderNumber}:`,
        results.map((r) => r.status)
    );
}
