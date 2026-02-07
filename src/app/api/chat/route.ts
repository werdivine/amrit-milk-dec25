/**
 * Amrit AI - Chat API Route (Full Featured)
 * Streaming responses with guardrails, intent classification, and product pricing
 */

import { products } from "@/lib/products";
import { KNOWLEDGE_BASE } from "@/lib/ai/knowledge-base";
import { google } from "@ai-sdk/google";
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
        // Check for Google AI API Key
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
        if (!apiKey) {
            console.error("[Amrit AI] Missing Google AI API Key environment variable");
            return Response.json({
                error: "Technical issue: AI configuration missing.",
                details: "GOOGLE_GENERATIVE_AI_API_KEY is not configured on the server."
            }, { status: 500 });
        }

        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userInput = lastMessage?.content || "";

        console.log(`[Amrit AI] Received query: "${userInput.slice(0, 50)}..."`);

        // Guardrail: Block malicious input
        if (isBlocked(userInput)) {
            console.warn("[Amrit AI] Blocked input detected");
            return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        // Check for subscription/bulk queries - escalate to WhatsApp
        if (isSubscriptionQuery(userInput)) {
            console.log("[Amrit AI] Subscription query detected - escalating to WhatsApp");
            return new Response(
                JSON.stringify({
                    role: "assistant",
                    content: `Subscription benefits aur bulk pricing ke liye humari team se baat karein। 🙏

Aap apna **naam** aur **area** batayein - WhatsApp par team jaldi respond karegi।

📱 Direct WhatsApp: wa.me/918130693767`,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        // Get product pricing context
        const pricingContext = findProductPricing(userInput);

        // Prepare knowledge base context
        const kbContext = KNOWLEDGE_BASE.map(
            (faq) => `Q: ${faq.question_en} / ${faq.question_hi}\nA: ${faq.answer_en} / ${faq.answer_hi}`
        ).join("\n\n");

        const systemPrompt = `You are Amrit AI, the expert brand guide for Amrit Milk Organic. 
Your goal is to provide warm, accurate, and helpful information about our organic products and farm.

## CRITICAL INSTRUCTION: USE THE KNOWLEDGE BASE
You MUST use the Knowledge Base below as your PRIMARY and ONLY source for specific facts about Amrit Milk. 
If the user asks a question that is covered in the Knowledge Base, you MUST provide the answer from there.
Do NOT hallucinate or make up details not present in the Knowledge Base.

## Knowledge Base (THE SOURCE OF TRUTH)
${kbContext}

${pricingContext}

## Your Personality
- Tone: "Premium Calm + Desi Warmth" (Friendly, respectful, and deeply knowledgeable about traditional Indian farming).
- Language: Primary Hindi/Hinglish. Use "Aap" and "Ji" to show respect.
- Motto: "Purity and Trust above all."

## Strict Response Rules
1. **MANDATORY**: Always check the Knowledge Base above first.
2. **Product Facts**: If asked about Ghee, you MUST mention "Bilona method" and "A2 Gir Cow".
3. **Delivery**: We deliver fresh daily in Lucknow. Non-perishables like Ghee are shipped across India.
4. **Unknown Info**: If the answer is NOT in the Knowledge Base, say: "Maaf kijiyega, iske baare mein mujhe abhi poori jaankari nahi hai. Kripya humare human support se WhatsApp par baat karein: 918130693767. 🙏"
5. **Conciseness**: Keep responses short and sweet. Use bullet points for benefits.
6. **Farm Location**: We are in Lonapur village, Lucknow.

Always represent the purity and traditional values of Amrit Milk.`;

        console.log("[Amrit AI] Request Body:", JSON.stringify({ messages }, null, 2));

        const result = await streamText({
            model: google("gemini-1.5-flash"), // Use Gemini via Google AI SDK
            system: systemPrompt,
            messages: messages.map((m: { role: string; content: string }) => ({
                role: m.role as "user" | "assistant" | "system",
                content: m.content,
            })),
            temperature: 0.5, // Lower temperature for more factual responses from KB
            apiKey: apiKey // Explicitly pass API key if not picked up by env default
        });

        console.log("[Amrit AI] streamText success");
        return result.toTextStreamResponse();
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
