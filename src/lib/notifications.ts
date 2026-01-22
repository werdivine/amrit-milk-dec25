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
    // Delivery address fields
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
}

import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
 * Helper to format payment status
 */
function formatPaymentStatus(method: string): string {
    const m = method.toLowerCase();
    if (m === "cod") return "Cash on Delivery (Pending Collection)";
    if (m === "online" || m === "ccavenue") return "Paid Online (Verified)";
    return method.toUpperCase();
}

/**
 * Send email notification via SMTP (IONOS)
 */
export async function sendOrderEmailNotification(order: OrderNotificationData): Promise<boolean> {
    const smtpUser = process.env.SMTP_USER;
    const merchantEmail = process.env.MERCHANT_EMAIL || "hello@amritmilkorganic.com";

    if (!smtpUser) {
        console.warn("Email notification skipped: SMTP_USER not configured");
        return false;
    }

    const itemsList = order.items
        .map((item) => `• ${item.title} × ${item.quantity} - ${item.price}`)
        .join("\n");

    const paymentStatus = formatPaymentStatus(order.paymentMethod);
    const fullAddress = [order.address, order.city, order.state, order.pincode]
        .filter(Boolean)
        .join(", ");

    try {
        await transporter.sendMail({
            from: `"Amrit Milk Orders" <${smtpUser}>`,
            to: merchantEmail.split(",").map((e) => e.trim()),
            subject: `🛒 New Order: ${order.orderNumber} - ₹${order.total}`,
            text: `New Order Received!\n\nOrder Number: ${order.orderNumber}\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nEmail: ${order.email}\nDelivery Address: ${fullAddress || "Not provided"}\nPayment: ${paymentStatus}\n\nItems:\n${itemsList}\n\nTotal: ₹${order.total}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #D4AF37;">New Order Received!</h2>
                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                    <p><strong>Customer:</strong> ${order.customerName}</p>
                    <p><strong>Phone:</strong> ${order.phone}</p>
                    <p><strong>Email:</strong> ${order.email}</p>
                    <div style="background: #fff8e1; padding: 12px; border-radius: 6px; margin: 10px 0; border-left: 4px solid #D4AF37;">
                        <p style="margin: 0;"><strong>📍 Delivery Address:</strong></p>
                        <p style="margin: 5px 0 0 0;">${order.address || "N/A"}</p>
                        <p style="margin: 5px 0 0 0;">${order.city || ""}${order.state ? ", " + order.state : ""} - ${order.pincode || ""}</p>
                    </div>
                    <p><strong>Payment:</strong> <span style="background: #e8f5e9; padding: 4px 8px; border-radius: 4px; color: #2e7d32; font-weight: bold;">${paymentStatus}</span></p>
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

    const paymentStatus = formatPaymentStatus(order.paymentMethod);

    const fullAddress = [order.address, order.city, order.state, order.pincode]
        .filter(Boolean)
        .join(", ");

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
                        <p style="margin: 5px 0 0 0;"><strong>Payment Status:</strong> 
                            <span style="font-weight: bold; color: ${order.paymentMethod === "cod" ? "#e65100" : "#2e7d32"};">
                                ${paymentStatus}
                            </span>
                        </p>
                    </div>
                    
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h4 style="margin: 0 0 10px 0; color: #333;">📍 Delivering To:</h4>
                        <p style="margin: 0; color: #555;">${order.address || "Address not provided"}</p>
                        <p style="margin: 5px 0 0 0; color: #555;">${order.city || ""}${order.state ? ", " + order.state : ""} - ${order.pincode || ""}</p>
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
 */
export async function sendWhatsAppNotification(order: OrderNotificationData): Promise<boolean> {
    const whatsappNumber = process.env.MERCHANT_WHATSAPP;
    const apiKey = process.env.CALLMEBOT_API_KEY;

    if (!whatsappNumber || !apiKey) {
        return false;
    }

    const fullAddress = [order.address, order.city, order.pincode].filter(Boolean).join(", ");
    const message = encodeURIComponent(
        `🛒 *New Order!*\n\n` +
            `Order: ${order.orderNumber}\n` +
            `Customer: ${order.customerName}\n` +
            `Phone: ${order.phone}\n` +
            `📍 Address: ${fullAddress || "N/A"}\n` +
            `Total: ₹${order.total}\n` +
            `Payment: ${formatPaymentStatus(order.paymentMethod)}`
    );

    try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${whatsappNumber}&text=${message}&apikey=${apiKey}`;
        const response = await fetch(url);
        return response.ok;
    } catch (error) {
        console.error("WhatsApp error:", error);
        return false;
    }
}

/**
 * Send email notification via Resend (HIGH RELIABILITY)
 */
export async function sendResendEmail(order: OrderNotificationData): Promise<boolean> {
    if (!resend || !process.env.RESEND_API_KEY) return false;

    const merchantEmail = process.env.MERCHANT_EMAIL || "hello@amritmilk.com";
    const itemsList = order.items
        .map((item) => `• ${item.title} × ${item.quantity} - ${item.price}`)
        .join("<br>");

    const paymentStatus = formatPaymentStatus(order.paymentMethod);
    const fullAddress = [order.address, order.city, order.state, order.pincode]
        .filter(Boolean)
        .join(", ");

    try {
        await resend.emails.send({
            from: "Amrit Milk <orders@amritmilkorganic.com>",
            to: merchantEmail.split(",").map((e) => e.trim()),
            subject: `🛒 New Order: ${order.orderNumber}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #D4AF37;">New Order Received!</h2>
                    <p><strong>Order:</strong> ${order.orderNumber}</p>
                    <p><strong>Customer:</strong> ${order.customerName}</p>
                    <p><strong>Phone:</strong> ${order.phone}</p>
                    <p><strong>📍 Deliver To:</strong> ${fullAddress || "Not provided"}</p>
                    <p><strong>Total:</strong> ₹${order.total}</p>
                     <p><strong>Payment:</strong> ${paymentStatus}</p>
                    <hr>
                    <h3>Items:</h3>
                    <p>${itemsList}</p>
                </div>
            `,
        });
        console.log(`Resend: Merchant notification sent for ${order.orderNumber}`);
        return true;
    } catch (error) {
        console.error("Resend error:", error);
        return false;
    }
}

/**
 * Trigger Automation Webhook (Pipedream / Make / Gumloop)
 * Pipedream is the recommended partner for high-reliability AI automation.
 */
export async function sendAutomationWebhook(order: OrderNotificationData): Promise<boolean> {
    const webhookUrl = process.env.AUTOMATION_WEBHOOK_URL;
    if (!webhookUrl) return false;

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                source: "amrit-milk-website",
                event: "new_order",
                timestamp: new Date().toISOString(),
                data: order,
            }),
        });

        const status = response.ok ? "SUCCESS" : "FAILED";
        console.log(
            `[Webhook] Pipedream/Automation Trigger: ${status} (${webhookUrl.substring(0, 25)}...)`
        );
        return response.ok;
    } catch (error) {
        console.error("[Webhook] Automation Trigger error:", error);
        return false;
    }
}

/**
 * Send Telegram Notification (Instant Mobile Alert)
 */
export async function sendTelegramNotification(order: OrderNotificationData): Promise<boolean> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return false;

    const paymentStatus = formatPaymentStatus(order.paymentMethod);
    const fullAddress = [order.address, order.city, order.pincode].filter(Boolean).join(", ");

    const text =
        `🛒 *New Order: ${order.orderNumber}*\n\n` +
        `👤 *Customer:* ${order.customerName}\n` +
        `📞 *Phone:* ${order.phone}\n` +
        `📍 *Address:* ${fullAddress || "N/A"}\n` +
        `💰 *Total:* ₹${order.total}\n` +
        `💳 *Payment:* ${paymentStatus}\n\n` +
        `📦 *Items:*\n` +
        order.items.map((i) => `• ${i.title} x${i.quantity}`).join("\n");

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "Markdown",
            }),
        });
        console.log("Telegram notification sent");
        return res.ok;
    } catch (error) {
        console.error("Telegram error:", error);
        return false;
    }
}

/**
 * Send ntfy.sh Notification (Ultra-fast Mobile Push)
 */
export async function sendNtfyNotification(order: OrderNotificationData): Promise<boolean> {
    const topic = process.env.NTFY_TOPIC;
    if (!topic) return false;

    try {
        const res = await fetch(`https://ntfy.sh/${topic}`, {
            method: "POST",
            body: `New Order: ${order.orderNumber} from ${order.customerName} (₹${order.total}) - ${formatPaymentStatus(order.paymentMethod)}`,
            headers: {
                Title: "🛒 Amrit Milk Order",
                Priority: "5",
                Tags: "shopping_cart,milk_glass",
            },
        });
        console.log("ntfy.sh notification sent");
        return res.ok;
    } catch (error) {
        console.error("ntfy error:", error);
        return false;
    }
}

/**
 * Send all notifications for a new order
 */
export async function sendOrderNotifications(order: OrderNotificationData): Promise<void> {
    console.log(`Starting notifications for order: ${order.orderNumber} to ${order.email}`);

    // Track all notification attempts
    const attempts = [
        sendOrderEmailNotification(order), // SMTP Fallback
        sendCustomerConfirmationEmail(order), // Customer SMTP
        sendWhatsAppNotification(order), // WhatsApp CallMeBot
        sendResendEmail(order), // Resend (Modern)
        sendAutomationWebhook(order), // Gumloop / Pipedream
        sendTelegramNotification(order), // Telegram Bot
        sendNtfyNotification(order), // Instant Mobile Push
    ];

    const results = await Promise.allSettled(attempts);

    console.log(
        `All Notification attempts for ${order.orderNumber} completed:`,
        results.map((r, i) => `${i}: ${r.status}`)
    );
}
