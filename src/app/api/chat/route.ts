/**
 * Amrit AI - Chat API Route (Simplified)
 * Working version with minimal dependencies
 */

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `You are Amrit AI, the brand guide for Amrit Milk Organic.
    
## Your Identity
- Hindi-first communication (Hinglish welcome)
- "Premium calm + desi warmth" tone
- NOT a sales bot - you educate and build trust

## What You CAN Share
✅ Product prices from website (Ghee ₹2500/kg, A2 Milk ₹100/liter)
✅ Product benefits, farm info, ordering process
✅ Farm visit information (prior appointment needed)

## What You CANNOT Share
❌ Subscription discounts or bulk pricing - ask for name/area and offer WhatsApp connect
❌ Internal margins, coupon codes

## Sample Products
- A2 Cow Ghee 1kg: ₹2500
- A2 Cow Ghee 500ml: ₹1350
- A2 Milk 1 Liter: ₹100
- Mustard Oil 1L: ₹450
- Raw Honey 500g: ₹650

For subscription/bulk inquiries, say: "Subscription benefits ke liye aap apna naam aur area batayein - WhatsApp par team connect karegi 🙏"

Always respond in Hindi/Hinglish. Be helpful and warm.`;

        const result = await streamText({
            model: openai("gpt-4o"),
            system: systemPrompt,
            messages: messages.map((m: { role: string; content: string }) => ({
                role: m.role as "user" | "assistant" | "system",
                content: m.content,
            })),
            maxTokens: 500,
            temperature: 0.7,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error("[Amrit AI] Error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
