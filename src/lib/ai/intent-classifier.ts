/**
 * Amrit AI - Intent Classifier
 * Classifies user queries into actionable categories
 */

import { IntentCategory, Language } from "@/types/chat";
import { isPublicPricingQuery, isRestrictedPricingQuery } from "./guardrails";

// Product-related keywords
const PRODUCT_KEYWORDS = [
    "ghee",
    "milk",
    "doodh",
    "dudh",
    "paneer",
    "curd",
    "dahi",
    "khoya",
    "oil",
    "tel",
    "mustard",
    "sarson",
    "groundnut",
    "mungfali",
    "coconut",
    "nariyal",
    "sesame",
    "til",
    "tulsi",
    "lemongrass",
    "menthol",
    "honey",
    "shahad",
    "madhu",
    "atta",
    "flour",
    "wheat",
    "multigrain",
    "bajra",
    "besan",
    "sattu",
    "rice",
    "chawal",
    "basmati",
    "kala jeera",
    "kala namak",
    "jaggery",
    "gur",
    "rasgulla",
    "gobar",
    "gaumutra",
    "cow dung",
    "manure",
    "lip balm",
    "bees wax",
    "bull balm",
];

// Brand/Trust keywords
const BRAND_KEYWORDS = [
    "amrit",
    "brand",
    "movement",
    "philosophy",
    "organic",
    "natural",
    "farm",
    "gaushala",
    "cow",
    "gir",
    "sahiwal",
    "desi",
    "bilona",
    "a2",
    "traditional",
    "chemical free",
    "journey",
    "story",
    "vision",
    "trust",
    "quality",
];

// Visit keywords
const VISIT_KEYWORDS = [
    "visit",
    "farm visit",
    "gaushala",
    "dekhna",
    "aana",
    "tour",
    "school visit",
    "corporate visit",
    "book",
    "booking",
    "schedule",
];

// Complaint keywords
const COMPLAINT_KEYWORDS = [
    "complaint",
    "shikayat",
    "problem",
    "issue",
    "wrong",
    "bad",
    "kharab",
    "spoiled",
    "damage",
    "refund",
    "late",
    "delay",
    "not received",
    "missing",
];

// Order keywords
const ORDER_KEYWORDS = [
    "order",
    "buy",
    "khareedna",
    "lena",
    "chahiye",
    "delivery",
    "shipping",
    "time",
    "kab milega",
];

// Subscription keywords (RESTRICTED)
const SUBSCRIPTION_KEYWORDS = [
    "subscription",
    "subscribe",
    "monthly",
    "regular",
    "daily delivery",
    "roz",
    "har din",
];

// Bulk order keywords (RESTRICTED)
const BULK_KEYWORDS = [
    "bulk",
    "wholesale",
    "dealer",
    "distributor",
    "large order",
    "bada order",
    "quantity",
];

// Malicious patterns
const MALICIOUS_PATTERNS = [
    /hack/i,
    /exploit/i,
    /inject/i,
    /\bsql\b/i,
    /admin/i,
    /password/i,
    /token/i,
];

export interface ClassificationResult {
    intent: IntentCategory;
    confidence: number;
    requiresEscalation: boolean;
    language: Language;
    matchedKeywords: string[];
}

/**
 * Classify user intent from message
 */
export async function classifyIntent(message: string): Promise<ClassificationResult> {
    const lowerMessage = message.toLowerCase();
    const language = detectLanguage(message);
    const matchedKeywords: string[] = [];

    // Step 1: Check for malicious intent first
    for (const pattern of MALICIOUS_PATTERNS) {
        if (pattern.test(lowerMessage)) {
            return {
                intent: IntentCategory.MALICIOUS,
                confidence: 0.95,
                requiresEscalation: false,
                language,
                matchedKeywords: ["malicious_pattern"],
            };
        }
    }

    // Step 2: Check for complaint (high priority)
    if (containsKeywords(lowerMessage, COMPLAINT_KEYWORDS)) {
        return {
            intent: IntentCategory.COMPLAINT,
            confidence: 0.9,
            requiresEscalation: true,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, COMPLAINT_KEYWORDS),
        };
    }

    // Step 3: Check for subscription inquiry (RESTRICTED)
    if (
        containsKeywords(lowerMessage, SUBSCRIPTION_KEYWORDS) ||
        isRestrictedPricingQuery(message)
    ) {
        return {
            intent: IntentCategory.SUBSCRIPTION_INQUIRY,
            confidence: 0.85,
            requiresEscalation: true,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, SUBSCRIPTION_KEYWORDS),
        };
    }

    // Step 4: Check for bulk order (RESTRICTED)
    if (containsKeywords(lowerMessage, BULK_KEYWORDS)) {
        return {
            intent: IntentCategory.BULK_ORDER,
            confidence: 0.85,
            requiresEscalation: true,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, BULK_KEYWORDS),
        };
    }

    // Step 5: Check for product pricing query (ALLOWED - public MRP)
    if (isPublicPricingQuery(message) && containsKeywords(lowerMessage, PRODUCT_KEYWORDS)) {
        return {
            intent: IntentCategory.PRODUCT_PRICING,
            confidence: 0.9,
            requiresEscalation: false,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, PRODUCT_KEYWORDS),
        };
    }

    // Step 6: Check for visit booking
    if (containsKeywords(lowerMessage, VISIT_KEYWORDS)) {
        return {
            intent: IntentCategory.VISIT_BOOKING,
            confidence: 0.85,
            requiresEscalation: true,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, VISIT_KEYWORDS),
        };
    }

    // Step 7: Check for order request
    if (containsKeywords(lowerMessage, ORDER_KEYWORDS)) {
        return {
            intent: IntentCategory.ORDER_REQUEST,
            confidence: 0.8,
            requiresEscalation: true,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, ORDER_KEYWORDS),
        };
    }

    // Step 8: Check for product info (general product questions)
    if (containsKeywords(lowerMessage, PRODUCT_KEYWORDS)) {
        return {
            intent: IntentCategory.PRODUCT_INFO,
            confidence: 0.85,
            requiresEscalation: false,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, PRODUCT_KEYWORDS),
        };
    }

    // Step 9: Check for brand/trust questions
    if (containsKeywords(lowerMessage, BRAND_KEYWORDS)) {
        return {
            intent: IntentCategory.PUBLIC_FAQ,
            confidence: 0.8,
            requiresEscalation: false,
            language,
            matchedKeywords: findMatchedKeywords(lowerMessage, BRAND_KEYWORDS),
        };
    }

    // Step 10: Default to PUBLIC_FAQ if message seems relevant, else OFF_TOPIC
    const relevantPatterns = [
        /kya|hai|kaise|kahan|kab|kyun|kaun/i, // Hindi question words
        /what|how|where|when|why|who/i, // English question words
        /milk|dairy|organic|farm|natural/i, // Industry terms
    ];

    const seemsRelevant = relevantPatterns.some((p) => p.test(lowerMessage));

    return {
        intent: seemsRelevant ? IntentCategory.PUBLIC_FAQ : IntentCategory.OFF_TOPIC,
        confidence: 0.6,
        requiresEscalation: false,
        language,
        matchedKeywords: [],
    };
}

/**
 * Detect language of the message
 */
export function detectLanguage(text: string): Language {
    // Hindi Unicode range: \u0900-\u097F (Devanagari)
    const hindiPattern = /[\u0900-\u097F]/;

    // Count Hindi vs Latin characters
    const hindiChars = (text.match(/[\u0900-\u097F]/g) || []).length;
    const latinChars = (text.match(/[a-zA-Z]/g) || []).length;

    if (hindiChars > 0 && hindiChars > latinChars * 0.5) {
        return "hi";
    }

    // Check for Hinglish patterns (Hindi words in Latin script)
    const hinglishPatterns = [
        /\b(kya|hai|kaise|nahi|haan|theek|acha|bahut|abhi|aap|mujhe|main)\b/i,
        /\b(karlo|batao|dijiye|chahiye|milega|dena|lena|karega)\b/i,
    ];

    if (hinglishPatterns.some((p) => p.test(text))) {
        return latinChars > 0 ? "hinglish" : "hi";
    }

    return "en";
}

// Helper functions
function containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function findMatchedKeywords(text: string, keywords: string[]): string[] {
    return keywords.filter((keyword) => text.includes(keyword.toLowerCase()));
}
