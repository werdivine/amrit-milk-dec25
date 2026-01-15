/**
 * Amrit AI - Local RAG (Foundation)
 * Simple keyword-based retrieval from local knowledge base
 * Will be upgraded to full Vector DB (pgvector) in Phase 8
 */

import { Language, RetrievalResult } from "@/types/chat";
import { KNOWLEDGE_BASE } from "./knowledge-base";

/**
 * Retrieve relevant context from local knowledge base
 */
export async function retrieveContext(query: string, language: Language = "hi"): Promise<string> {
    const results = searchKnowledgeBase(query, language);

    if (results.length === 0) {
        return "";
    }

    // Format context for LLM
    let context = `\n\n## Relevant Knowledge Base Articles:\n`;

    results.forEach((result, index) => {
        context += `\n[${index + 1}] Category: ${result.category}\n`;
        context += `Content: ${result.content}\n`;
    });

    return context;
}

/**
 * Simple keyword search implementation
 */
export function searchKnowledgeBase(
    query: string,
    language: Language = "hi",
    limit: number = 3
): RetrievalResult[] {
    const lowerQuery = query.toLowerCase();
    const queryTokens = lowerQuery.split(/\s+/).filter((t) => t.length > 2);

    const scoredResults = KNOWLEDGE_BASE.map((params) => {
        let score = 0;

        // Exact keyword matches
        params.keywords.forEach((keyword) => {
            if (lowerQuery.includes(keyword.toLowerCase())) score += 5;
        });

        // Token overlap in question (Hindi)
        if (language === "hi" || language === "hinglish") {
            const qTokens = params.question_hi.toLowerCase().split(/\s+/);
            const overlap = qTokens.filter((t) => lowerQuery.includes(t)).length;
            score += overlap * 2;
        }

        // Token overlap in question (English)
        const qTokensEn = params.question_en.toLowerCase().split(/\s+/);
        const overlapEn = qTokensEn.filter((t) => lowerQuery.includes(t)).length;
        score += overlapEn * 2;

        return { entry: params, score };
    });

    // Filter and sort by score
    const topResults = scoredResults
        .filter((r) => r.score > 2) // Minimum threshold
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    // Map to RetrievalResult
    return topResults.map((r) => ({
        content:
            language === "hi" || language === "hinglish"
                ? `Q: ${r.entry.question_hi}\nA: ${r.entry.answer_hi}`
                : `Q: ${r.entry.question_en}\nA: ${r.entry.answer_en}`,
        source: "local_faq",
        category: r.entry.category,
        confidence: r.score / 10, // Normalized rough score
        language: language,
    }));
}
