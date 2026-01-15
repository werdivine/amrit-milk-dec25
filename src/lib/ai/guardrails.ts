/**
 * Amrit AI - Guardrails System
 * Input/output validation with Zero-Trust security
 */

import { OutputValidationResult, ValidationResult } from "@/types/chat";

// ============================================
// FORBIDDEN OUTPUT PATTERNS
// Only blocks subscription/bulk/internal info
// Public MRP is ALLOWED
// ============================================
const FORBIDDEN_OUTPUT_PATTERNS = [
    /\d+\s*(percent|%)\s*discount/i, // Discount percentages
    /subscription\s*(discount|offer|benefit|rate)/i,
    /bulk\s*(rate|price|discount)/i,
    /wholesale\s*(rate|price)/i,
    /margin|profit|revenue|cost\s*price/i,
    /delivery\s*boy\s*name/i,
    /cow\s*count|staff\s*count/i,
    /internal\s*report|dashboard/i,
    /customer\s*(phone|email|address)\s*:/i, // Customer PII with colon
    /coupon\s*code\s*:/i,
    /dealer\s*(rate|price|margin)/i,
];

// Prompt injection patterns
const INJECTION_PATTERNS = [
    /ignore\s*(previous|above|all)\s*instructions/i,
    /you\s*are\s*now\s*a/i,
    /system\s*prompt/i,
    /forget\s*(everything|your|all)\s*(rules|instructions)?/i,
    /<\/?script/i,
    /\[\[.*?\]\]/, // Double bracket injection
    /{{.*?}}/, // Template injection
];

// Control characters to strip
const CONTROL_CHAR_PATTERN = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

// Maximum input length
const MAX_INPUT_LENGTH = 1000;

/**
 * Validate and sanitize user input
 */
export function validateInput(input: string): ValidationResult {
    // Step 1: Strip control characters
    let sanitized = input.replace(CONTROL_CHAR_PATTERN, "");

    // Step 2: Trim and check length
    sanitized = sanitized.trim();
    if (sanitized.length === 0) {
        return {
            valid: false,
            blocked: true,
            sanitizedText: "",
            reason: "Empty input",
        };
    }

    // Step 3: Check for injection attempts
    for (const pattern of INJECTION_PATTERNS) {
        if (pattern.test(sanitized)) {
            console.warn("[Guardrails] Prompt injection attempt detected");
            return {
                valid: false,
                blocked: true,
                sanitizedText: "[FILTERED]",
                reason: "Potential injection attempt",
            };
        }
    }

    // Step 4: Length limit
    if (sanitized.length > MAX_INPUT_LENGTH) {
        sanitized = sanitized.substring(0, MAX_INPUT_LENGTH);
    }

    return {
        valid: true,
        blocked: false,
        sanitizedText: sanitized,
    };
}

/**
 * Validate LLM output for sensitive information leaks
 */
export function validateOutput(output: string): OutputValidationResult {
    const matchedPatterns: string[] = [];

    for (const pattern of FORBIDDEN_OUTPUT_PATTERNS) {
        if (pattern.test(output)) {
            matchedPatterns.push(pattern.toString());
        }
    }

    if (matchedPatterns.length > 0) {
        console.warn("[Guardrails] Sensitive info detected in output:", matchedPatterns);
        return {
            valid: false,
            containsSensitiveInfo: true,
            patterns: matchedPatterns,
            sanitizedOutput: getSafeFallbackResponse(),
        };
    }

    return {
        valid: true,
        containsSensitiveInfo: false,
        patterns: [],
    };
}

/**
 * Check if query is about subscription/bulk (needs escalation)
 */
export function isRestrictedPricingQuery(query: string): boolean {
    const restrictedPatterns = [
        /subscription/i,
        /bulk\s*(order|rate|price)/i,
        /wholesale/i,
        /dealer\s*(rate|price)/i,
        /special\s*rate/i,
        /discount\s*(milega|chahiye|hai)/i,
        /kitna\s*discount/i,
    ];

    return restrictedPatterns.some((pattern) => pattern.test(query));
}

/**
 * Check if query is about public product pricing (allowed)
 */
export function isPublicPricingQuery(query: string): boolean {
    const publicPatterns = [
        /price\s*(kya|kitna|batao)/i,
        /kitne\s*(ka|rupee|rs)/i,
        /cost\s*(kya|kitna)/i,
        /rate\s*(kya|batao)/i,
        /kya\s*price/i,
        /₹/,
    ];

    // If it's public pricing AND not restricted, allow it
    return (
        publicPatterns.some((pattern) => pattern.test(query)) && !isRestrictedPricingQuery(query)
    );
}

/**
 * Safe fallback response when output validation fails
 */
function getSafeFallbackResponse(): string {
    return `Main is baare me abhi information share nahi kar sakta. 
Kya main aapko kisi aur topic me help kar sakta hoon?`;
}

/**
 * Detect PII in text (basic detection)
 */
export function containsPII(text: string): boolean {
    const piiPatterns = [
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
        /\b\d{10}\b/, // 10-digit phone
        /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Card number
        /\b\d{6}\b/, // PIN code (be careful, might have false positives)
    ];

    return piiPatterns.some((pattern) => pattern.test(text));
}

/**
 * Redact PII from text
 */
export function redactPII(text: string): string {
    let redacted = text;

    // Email
    redacted = redacted.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL]");

    // Phone (10 digits)
    redacted = redacted.replace(/\b\d{10}\b/g, "[PHONE]");

    return redacted;
}

/**
 * Log security event for monitoring
 */
export async function logSecurityEvent(
    eventType: "prompt_injection_attempt" | "output_leak_prevented" | "pii_detected",
    details: string
): Promise<void> {
    // In production, this would log to a security monitoring system
    console.error(`[SECURITY EVENT] ${eventType}:`, {
        timestamp: new Date().toISOString(),
        type: eventType,
        details: details.substring(0, 200), // Limit log size
    });

    // TODO: Integrate with analytics/monitoring system
    // await prisma.securityLog.create({ data: { eventType, details } });
}
