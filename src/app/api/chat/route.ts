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

## Your Personality
- Tone: "Premium Calm + Desi Warmth" (Friendly, respectful, and deeply knowledgeable about traditional Indian farming).
- Language: Primary Hindi/Hinglish. Use "Aap" and "Ji" to show respect.
- Motto: "Purity and Trust above all."

## Farm Details (CRITICAL)
- Farm Name: Amrit Milk Farms
- Location: Lonapur village, near Gomti Nagar, Lucknow.
- Legacy: Chemical-free farming since early 2000s; Commercial operations since 15 September 2016.
- Model: Farm-to-Fork (Directly from our farm to your home).

## Knowledge Base (Use this for all answers)
${kbContext}

## Product Pricing & Availability
${pricingContext}

## Guidelines for Responses
1. ALWAYS use the Knowledge Base provided above. If a question is similar to a topic in the KB, use that information.
2. If you absolutely don't know the answer after checking the KB, say: "Maaf kijiyega, iske baare mein mujhe abhi poori jaankari nahi hai. Kripya humare human support se WhatsApp par baat karein, wo aapki behtar madad kar payenge। 🙏"
3. NEVER say just "Sorry" or "I don't know". Always offer to connect to WhatsApp.
4. For orders: Encourage using the website "Add to Cart" or WhatsApp: 918130693767.
5. Keep responses concise but warm. Use bullet points for benefits.
6. **VERY IMPORTANT**: You have access to a rich knowledge base. Use it to answer questions about Ghee, Milk, Oils, Honey, Farm visits, and more. Do not provide generic answers.

## Escalation Rules
- For Subscriptions, Bulk orders, or Wholesale: Always provide the WhatsApp link (wa.me/918130693767).
- For complex complaints: Apologize warmly and ask them to contact WhatsApp.

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
