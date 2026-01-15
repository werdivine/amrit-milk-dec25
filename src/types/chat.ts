/**
 * Amrit AI - Chat Types
 * Type definitions for the conversational AI system
 */

// Intent Classification
export enum IntentCategory {
    PUBLIC_FAQ = "public_faq",
    PRODUCT_INFO = "product_info",
    PRODUCT_PRICING = "product_pricing",
    SUBSCRIPTION_INQUIRY = "subscription_inquiry",
    BULK_ORDER = "bulk_order",
    ORDER_REQUEST = "order_request",
    COMPLAINT = "complaint",
    VISIT_BOOKING = "visit_booking",
    OFF_TOPIC = "off_topic",
    MALICIOUS = "malicious",
}

// Intent routing configuration
export const INTENT_ROUTING: Record<
    IntentCategory,
    | "rag_answer"
    | "product_catalog_lookup"
    | "escalate_whatsapp"
    | "collect_lead_then_escalate"
    | "polite_redirect"
    | "block_and_log"
> = {
    [IntentCategory.PUBLIC_FAQ]: "rag_answer",
    [IntentCategory.PRODUCT_INFO]: "product_catalog_lookup",
    [IntentCategory.PRODUCT_PRICING]: "product_catalog_lookup",
    [IntentCategory.SUBSCRIPTION_INQUIRY]: "escalate_whatsapp",
    [IntentCategory.BULK_ORDER]: "escalate_whatsapp",
    [IntentCategory.ORDER_REQUEST]: "escalate_whatsapp",
    [IntentCategory.COMPLAINT]: "escalate_whatsapp",
    [IntentCategory.VISIT_BOOKING]: "collect_lead_then_escalate",
    [IntentCategory.OFF_TOPIC]: "polite_redirect",
    [IntentCategory.MALICIOUS]: "block_and_log",
};

// Escalation triggers
export const ESCALATION_INTENTS = new Set([
    IntentCategory.SUBSCRIPTION_INQUIRY,
    IntentCategory.BULK_ORDER,
    IntentCategory.ORDER_REQUEST,
    IntentCategory.COMPLAINT,
]);

// Language detection
export type Language = "hi" | "en" | "hinglish";

// Message types
export interface Message {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
    metadata?: MessageMetadata;
}

export interface MessageMetadata {
    intent?: IntentCategory;
    language?: Language;
    productMentioned?: string[];
    escalationTriggered?: boolean;
    retrievalConfidence?: number;
}

// Conversation state for multi-turn context
export interface ConversationState {
    sessionId: string;
    userId?: string;
    turns: Message[];
    extractedEntities: ExtractedEntities;
    currentIntent: IntentCategory;
    escalationStarted: boolean;
    language: Language;
    createdAt: Date;
    updatedAt: Date;
}

export interface ExtractedEntities {
    name?: string;
    area?: string;
    city?: string;
    phone?: string;
    interests: string[];
}

// Handover payload for WhatsApp escalation
export interface HandoverPayload {
    name: string;
    city: string;
    area?: string;
    phone?: string;
    requirement: "milk" | "ghee" | "oil" | "visit" | "support" | "subscription" | "bulk" | "other";
    conversationSummary: string;
    originalMessages: Message[];
    timestamp: Date;
    source: "website_chat";
}

// Product pricing context
export interface ProductPricingContext {
    productId: string;
    title: string;
    price: string;
    regularPrice?: string;
    category: string;
    description: string;
    availability: "in_stock" | "limited" | "out_of_stock";
    isSubscriptionProduct: boolean;
    slug: string;
}

// RAG retrieval result
export interface RetrievalResult {
    content: string;
    source: string;
    category: string;
    confidence: number;
    language: Language;
}

// Input validation result
export interface ValidationResult {
    valid: boolean;
    blocked: boolean;
    sanitizedText: string;
    reason?: string;
}

// Output validation result
export interface OutputValidationResult {
    valid: boolean;
    containsSensitiveInfo: boolean;
    patterns: string[];
    sanitizedOutput?: string;
}

// Analytics event
export interface ChatAnalyticsEvent {
    sessionId: string;
    messageType: "user" | "assistant";
    intentClassified: IntentCategory;
    languageDetected: Language;
    retrievalTimeMs: number;
    generationTimeMs: number;
    totalTimeMs: number;
    contextChunksUsed: number;
    confidenceScore: number;
    escalated: boolean;
    inputFiltered: boolean;
    outputFiltered: boolean;
    topicCategory: string;
    wordCount: number;
}

// Chat widget props
export interface ChatWidgetProps {
    initialOpen?: boolean;
    position?: "bottom-right" | "bottom-left";
    theme?: "light" | "dark" | "auto";
    welcomeMessage?: string;
}

// Quick reply option
export interface QuickReply {
    id: string;
    label: string;
    labelHindi?: string;
    value: string;
}

// Default quick replies
export const DEFAULT_QUICK_REPLIES: QuickReply[] = [
    { id: "ghee-price", label: "Ghee ka price?", value: "Ghee ka price kya hai?" },
    { id: "a2-milk", label: "A2 milk kya hai?", value: "A2 milk kya hota hai?" },
    { id: "farm-visit", label: "Farm visit", value: "Farm visit kaise karein?" },
    { id: "delivery", label: "Delivery area?", value: "Lucknow me delivery hoti hai?" },
];

// Welcome message
export const WELCOME_MESSAGE = `🙏 नमस्ते! मैं हूँ Amrit AI।
Amrit Milk Organic के बारे में कोई भी सवाल पूछिए।

"Ghee ka price?" | "A2 milk kya hai?" | "Farm visit kaise karein?"`;
