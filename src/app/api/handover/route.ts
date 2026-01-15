/**
 * Amrit AI - Handover API
 * Handles escalation from AI chat to Human Agent (WhatsApp)
 */

import { sendHandoverNotification } from "@/lib/ai/whatsapp";
import { HandoverPayload } from "@/types/chat";

export async function POST(req: Request) {
    try {
        const payload: HandoverPayload = await req.json();

        // Validate payload
        if (!payload.name || !payload.requirement || !payload.conversationSummary) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Send WhatsApp notification
        const success = await sendHandoverNotification(payload);

        if (success) {
            return Response.json({ success: true, message: "Handover initiated" });
        } else {
            return Response.json(
                { error: "Failed to send WhatsApp notification" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("[Handover API] Error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
