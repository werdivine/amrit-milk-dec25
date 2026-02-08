import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "@/lib/products";
import { KNOWLEDGE_BASE } from "@/lib/ai/knowledge-base";

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
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ||
            "AIzaSyD56yPjGyQ6T14bYE540oNk7qmA8UZ_2yk";

        if (!apiKey) {
            return Response.json(
                { error: "Configuration Error: Missing API Key" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userInput = lastMessage?.content || "";

        if (isBlocked(userInput)) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        if (isSubscriptionQuery(userInput)) {
            return new Response(
                JSON.stringify({
                    role: "assistant",
                    content: `Subscription benefits aur bulk pricing ke liye humari team se baat karein। 🙏\n\nAap apna **naam** aur **area** batayein - WhatsApp par team jaldi respond karegi।\n\n📱 Direct WhatsApp: wa.me/918130693767`,
                }),
                { status: 200 }
            );
        }

        const pricingContext = findProductPricing(userInput);
        const kbContext = KNOWLEDGE_BASE.map(
            (faq) => `Q: ${faq.question_en} / ${faq.question_hi}\nA: ${faq.answer_en} / ${faq.answer_hi}`
        ).join("\n\n");

        const systemPrompt = `You are Amrit AI, the warm and wise brand guide for Amrit Milk Organic.
Your goal is to provide a "Human-First" experience.

## Context
${kbContext}

${pricingContext}

## Rules
1. Tone: "Human-Centric & Desi Warmth" (Namaste 🙏, Ji, Aap).
2. Language: Hindi/Hinglish.
3. Check Knowledge Base first.
4. Location Link: https://share.google/0qteuIjm84bSxZWD7
5. Contact: 918130693767 (WhatsApp).
6. Be concise and helpful.`;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Namaste! Main Amrit AI hoon. Main aapki kaise madad kar sakta hoon aaj? 🙏" }],
                },
                ...messages.slice(0, -1).map((m: any) => ({
                    role: m.role === "user" ? "user" : "model",
                    parts: [{ text: m.content }],
                })),
            ],
        });

        const result = await chat.sendMessage(userInput);
        const response = result.response;
        const text = response.text();

        // Use simple text response
        return new Response(text);

    } catch (error: any) {
        console.error("Chat Error:", error);
        return Response.json(
            { error: "Kshama karein, kuch technical issue hai. Kripya thodi der baad try karein. 🙏" },
            { status: 500 }
        );
    }
}
