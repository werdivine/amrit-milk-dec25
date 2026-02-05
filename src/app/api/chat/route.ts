/**
 * Amrit AI - Chat API Route (Full Featured)
 * Streaming responses with guardrails, intent classification, and product pricing
 */

import { products } from "@/lib/products";
import { KNOWLEDGE_BASE } from "@/lib/ai/knowledge-base";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Simple guardrails
const BLOCKED_PATTERNS = [
    /ignore.*instructions/i,
    /forget.*rules/i,
    /system.*prompt/i,
    /jailbreak/i,
];

const SUBSCRIPTION_KEYWORDS = [
    "subscription",
    "discount",
    "bulk",
    "wholesale",
    "monthly",
    "weekly",
];

function isBlocked(text: string): boolean {
    return BLOCKED_PATTERNS.some((p) => p.test(text));
}

function isSubscriptionQuery(text: string): boolean {
    const lower = text.toLowerCase();
    return SUBSCRIPTION_KEYWORDS.some((k) => lower.includes(k));
}

function findProductPricing(query: string): string {
    const lower = query.toLowerCase();
    const matched = products.filter(
        (p) =>
            lower.includes(p.title.toLowerCase().split(" ")[0]) ||
            lower.includes(p.category.toLowerCase()) ||
            (lower.includes("ghee") && p.category === "Ghee") ||
            (lower.includes("milk") && p.category === "Milk") ||
            (lower.includes("honey") && p.category === "Honey") ||
            (lower.includes("oil") && p.category.includes("Oil"))
    );

    if (matched.length === 0) return "";

    let context = "\n\n## Product Pricing (PUBLIC - SHARE THIS):\n";
    matched.slice(0, 5).forEach((p) => {
        context += `- ${p.title}: ${p.price}\n`;
    });
    return context;
}

export async function POST(req: Request) {
    try {
        // Check for OpenAI API Key
        if (!process.env.OPENAI_API_KEY) {
            console.error("[Amrit AI] Missing OPENAI_API_KEY environment variable");
            return Response.json({ 
                error: "Technical issue: AI configuration missing.",
                details: "OPENAI_API_KEY is not configured on the server."
            }, { status: 500 });
        }

        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userInput = lastMessage?.content || "";

        // Guardrail: Block malicious input
        if (isBlocked(userInput)) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        // Check for subscription/bulk queries - escalate to WhatsApp
        if (isSubscriptionQuery(userInput)) {
            return new Response(
                JSON.stringify({
                    role: "assistant",
                    content: `Subscription benefits aur bulk pricing ke liye humari team se baat karein। 🙏

Aap apna **naam** aur **area** batayein - WhatsApp par team jaldi respond karegi।

📱 Direct WhatsApp: wa.me/918130693767`,
                }),
                { headers: { "Content-Type": "application/json" } }
            );
        }

        // Get product pricing context
        const pricingContext = findProductPricing(userInput);

        // Prepare knowledge base context
        const kbContext = KNOWLEDGE_BASE.map(
            (faq) => `Q: ${faq.question_en} / ${faq.question_hi}\nA: ${faq.answer_en} / ${faq.answer_hi}`
        ).join("\n\n");

        const systemPrompt = `You are Amrit AI, the friendly and expert brand guide for Amrit Milk Organic. Your goal is to provide helpful, warm, and accurate information about our organic products and farm.

## YOUR MISSION
You are the primary source of truth for Amrit Milk Organic. Customers ask about Ghee, Milk, Oils, and our farm. You must use the provided Knowledge Base to answer them accurately.

## Your Personality
- Tone: "Premium Calm + Desi Warmth" (Friendly, respectful, and deeply knowledgeable about traditional Indian farming).
- Language: Primary Hindi/Hinglish. Use "Aap" and "Ji" to show respect.
- Motto: "Purity and Trust above all."

## Knowledge Base (CRITICAL - USE THIS FOR ALL ANSWERS)
${kbContext}

## Farm Details
- Farm Name: Amrit Milk Farms
- Location: Lonapur village, near Gomti Nagar, Lucknow.
- Legacy: Chemical-free farming since early 2000s; Commercial operations since 15 September 2016.
- Model: Farm-to-Fork (Directly from our farm to your home).

## Product Pricing & Availability
${pricingContext}

## Strict Guidelines for Responses
1. **MANDATORY**: Always check the Knowledge Base above first. If the answer is there, use it!
2. If a customer asks about Ghee quality, mention "Bilona method" and "A2 Gir Cow".
3. If they ask about delivery, mention we deliver fresh daily in Lucknow.
4. If you absolutely don't know the answer after checking the KB, say: "Maaf kijiyega, iske baare mein mujhe abhi poori jaankari nahi hai. Kripya humare human support se WhatsApp par baat karein, wo aapki behtar madad kar payenge। 🙏"
5. NEVER provide generic information that contradicts our brand values.
6. For orders: Encourage using the website "Add to Cart" or WhatsApp: 918130693767.
7. Keep responses concise but warm. Use bullet points for benefits.

Always represent the purity and traditional values of Amrit Milk.`;

        console.log("[Amrit AI] Request Body:", JSON.stringify({ messages }, null, 2));

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

        console.log("[Amrit AI] streamText success");
        return result.toDataStreamResponse();
    } catch (error: any) {
        console.error("[Amrit AI] Error details:", {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
            name: error.name
        });
        return Response.json({ 
            error: "Internal server error", 
            details: error.message 
        }, { status: 500 });
    }
}
