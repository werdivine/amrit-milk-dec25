/**
 * Amrit AI - Analytics Logging
 * Tracks conversation metrics for optimization
 */

import { ChatAnalyticsEvent, IntentCategory } from "@/types/chat";

// In-memory buffer for batch logging (flushes periodically or on threshold)
const analyticsBuffer: ChatAnalyticsEvent[] = [];
const BUFFER_THRESHOLD = 10;

/**
 * Log a chat analytics event
 */
export async function logChatEvent(event: Partial<ChatAnalyticsEvent>): Promise<void> {
    const fullEvent: ChatAnalyticsEvent = {
        sessionId: event.sessionId || "unknown",
        messageType: event.messageType || "user",
        intentClassified: event.intentClassified || IntentCategory.PUBLIC_FAQ,
        languageDetected: event.languageDetected || "hi",
        retrievalTimeMs: event.retrievalTimeMs || 0,
        generationTimeMs: event.generationTimeMs || 0,
        totalTimeMs: event.totalTimeMs || 0,
        contextChunksUsed: event.contextChunksUsed || 0,
        confidenceScore: event.confidenceScore || 0,
        escalated: event.escalated || false,
        inputFiltered: event.inputFiltered || false,
        outputFiltered: event.outputFiltered || false,
        topicCategory: event.topicCategory || "general",
        wordCount: event.wordCount || 0,
    };

    analyticsBuffer.push(fullEvent);

    // Console log for development
    console.log(
        "[Analytics]",
        JSON.stringify({
            intent: fullEvent.intentClassified,
            language: fullEvent.languageDetected,
            escalated: fullEvent.escalated,
            totalTimeMs: fullEvent.totalTimeMs,
        })
    );

    // Flush if buffer threshold reached
    if (analyticsBuffer.length >= BUFFER_THRESHOLD) {
        await flushAnalytics();
    }
}

/**
 * Flush analytics buffer to persistent storage
 * TODO: Integrate with PostgreSQL/Prisma when database is ready
 */
export async function flushAnalytics(): Promise<void> {
    if (analyticsBuffer.length === 0) return;

    const events = [...analyticsBuffer];
    analyticsBuffer.length = 0; // Clear buffer

    // For now, log to console. In production, save to DB.
    console.log(`[Analytics] Flushing ${events.length} events`);

    // TODO: Prisma integration
    // await prisma.chatAnalytics.createMany({ data: events });
}

/**
 * Get analytics summary (for dashboard)
 */
export function getAnalyticsSummary(): {
    totalSessions: number;
    totalMessages: number;
    escalationRate: number;
    avgResponseTime: number;
    topIntents: Record<string, number>;
} {
    const intents: Record<string, number> = {};
    let totalTime = 0;
    let escalations = 0;

    analyticsBuffer.forEach((e) => {
        intents[e.intentClassified] = (intents[e.intentClassified] || 0) + 1;
        totalTime += e.totalTimeMs;
        if (e.escalated) escalations++;
    });

    return {
        totalSessions: new Set(analyticsBuffer.map((e) => e.sessionId)).size,
        totalMessages: analyticsBuffer.length,
        escalationRate: analyticsBuffer.length > 0 ? escalations / analyticsBuffer.length : 0,
        avgResponseTime: analyticsBuffer.length > 0 ? totalTime / analyticsBuffer.length : 0,
        topIntents: intents,
    };
}

/**
 * Track timing helper
 */
export function createTimer(): { elapsed: () => number } {
    const start = Date.now();
    return {
        elapsed: () => Date.now() - start,
    };
}
