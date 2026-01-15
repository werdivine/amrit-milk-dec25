/**
 * Amrit AI - Chat API Route (Full Featured)
 * Streaming responses with guardrails, intent classification, and product pricing
 */

import { products } from "@/lib/products";
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

        const systemPrompt = `You are Amrit AI, the brand guide for Amrit Milk Organic.

## Your Identity
- Hindi-first communication (Hinglish welcome)
- "Premium calm + desi warmth" tone
- NOT a sales bot - you educate and build trust
- Farm location: Lonapur village, near Gomti Nagar, Lucknow

## Brand Story
"Amrit sirf brand nahi, ek movement hai."
- Chemical-free farming since early 2000s
- Commercial operations since 15 September 2016
- Farm-to-Fork model with lab testing

## What You CAN Share
✅ Product MRP prices from website
✅ Product benefits and descriptions
✅ A2 milk, Bilona ghee explanations
✅ Farm visit info (prior appointment required)
✅ Ordering process (website or WhatsApp)

## What You CANNOT Share (Escalate to WhatsApp)
❌ Subscription discounts
❌ Bulk/wholesale pricing
❌ Internal margins
${pricingContext}

## Key Products & Prices
- A2 Cow Ghee 1kg: ₹2500
- A2 Cow Ghee 500ml: ₹1350
- A2 Milk 1 Liter: ₹100
- Mustard Oil 1L: ₹450
- Raw Honey 500g: ₹650
- Essential Oils: ₹350-₹450

## Response Style
- Answer in Hindi/Hinglish
- Short answer first, then explanation
- Never be pushy about sales
- For orders: "Website par Add to Cart karein ya WhatsApp karein: 918130693767"

Always respond warmly and helpfully. You represent Amrit Milk's values of purity and trust.`;

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
