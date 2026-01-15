/**
 * Amrit AI - WhatsApp Integration
 * Handles escalation/handover messages via CallMeBot (Foundational)
 * Can be upgraded to Twilio/WhatsApp Business API later
 */

import { HandoverPayload } from "@/types/chat";

/**
 * Send handover notification to merchant via WhatsApp
 */
export async function sendHandoverNotification(payload: HandoverPayload): Promise<boolean> {
    const whatsappNumber = process.env.MERCHANT_WHATSAPP;
    const apiKey = process.env.CALLMEBOT_API_KEY;

    if (!whatsappNumber || !apiKey) {
        console.error("[WhatsApp] Missing configuration");
        return false;
    }

    // Format message for merchant
    const message =
        `🤖 *AI Lead Handover*\n\n` +
        `👤 *Name:* ${payload.name}\n` +
        `📍 *Location:* ${payload.area}, ${payload.city}\n` +
        `📞 *Phone:* ${payload.phone || "Not provided"}\n\n` +
        `📌 *Requirement:* ${payload.requirement.toUpperCase()}\n` +
        `📝 *Summary:* ${payload.conversationSummary}\n\n` +
        `🕒 ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

    try {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${whatsappNumber}&text=${encodedMessage}&apikey=${apiKey}`;

        const response = await fetch(url);

        if (response.ok) {
            console.log(`[WhatsApp] Handover sent for ${payload.name}`);
            return true;
        } else {
            console.error("[WhatsApp] API Error:", response.statusText);
            return false;
        }
    } catch (error) {
        console.error("[WhatsApp] Network Error:", error);
        return false;
    }
}
