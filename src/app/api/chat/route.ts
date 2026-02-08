/**
 * Amrit AI - Chat API Route (Full Featured)
 * Streaming responses with guardrails, intent classification, and product pricing
 */

import { products } from "@/lib/products";
import { KNOWLEDGE_BASE } from "@/lib/ai/knowledge-base";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
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
        const apiKey =
            process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ||
            "AIzaSyD56yPjGyQ6T14bYE540oNk7qmA8UZ_2yk"; // User provided key as fallback

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

        const systemPrompt = `You are Amrit AI, the warm and wise brand guide for Amrit Milk Organic. 
Your goal is to provide a "Human-First" experience - treat every user like a member of the Amrit family.

## CRITICAL INSTRUCTION: USE THE KNOWLEDGE BASE
You MUST use the Knowledge Base below as your PRIMARY source for specific facts. 
If the user asks a question covered in the Knowledge Base, providing that answer is your priority.

## Knowledge Base (THE SOURCE OF TRUTH)
${kbContext}

${pricingContext}

## Your Personality: "Human-Centric & Desi Warmth"
- Tone: Extremely warm, respectful, and helpful. Use "Namaste 🙏", "Aap", and "Ji".
- Language: Hindi/Hinglish. Communicate like a helpful elder brother or a trusted family friend.
- Human-First Rule: If a user seems confused or frustrated, offer comfort first before technical answers.
- Motto: "Shuddhata aur Vishwas" (Purity and Trust).

## Strict Response Rules
1. **MANDATORY**: Always check the Knowledge Base first.
2. **Google Maps**: If asked for our location or how to visit, provide this link: https://share.google/0qteuIjm84bSxZWD7 (Amrit Milk Farms, Lonapur).
3. **Product Facts**: For Ghee, always mention "Bilona Method" and "Grass-fed A2 Gir Cows".
4. **Delivery**: We deliver fresh "Farm-to-Fridge" every morning in Lucknow. Non-perishables are shipped PAN India.
5. **Human Escalation**: If you can't find an answer, say: "Maaf kijiyega, iski jaankari mere paas nahi hai. Par ghabraiye mat, aap humare support team se WhatsApp par seedhe baat kar sakte hain: 918130693767. Hum aapki madad ke liye hamesha taiyaar hain। 🙏"
6. **Conciseness**: Don't be robotic. Use short, meaningful sentences and inviting bullet points.
7. **Farm Location**: Our beautiful farm is in Lonapur village, Gomti Nagar Extension, Lucknow.

Always represent the purity, tradition, and heart of Amrit Milk. Treat every interaction as a chance to bond with a customer.`;

        console.log("[Amrit AI] Request Body:", JSON.stringify({ messages }, null, 2));

        // Initialize Google Provider with explicit API key
        const google = createGoogleGenerativeAI({
            apiKey: apiKey
        });

        const result = await streamText({
            model: google("gemini-1.5-flash"), // Use Gemini via Google AI SDK
            system: systemPrompt,
            messages: messages.map((m: { role: string; content: string }) => ({
                role: m.role as "user" | "assistant" | "system",
                content: m.content,
            })),
            temperature: 0.5, // Lower temperature for more factual responses from KB
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
