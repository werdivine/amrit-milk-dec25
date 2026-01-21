"use client";

import { Sparkles } from "lucide-react";

interface ProductHighlightsSectionProps {
    highlights: string[];
}

export function ProductHighlightsSection({ highlights }: ProductHighlightsSectionProps) {
    if (!highlights || highlights.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-terracotta dark:text-gold" />
                <h3 className="text-xl font-bold text-theme-primary">Product Highlights</h3>
            </div>
            <ul className="space-y-3 ml-9">
                {highlights.map((highlight, index) => (
                    <li
                        key={index}
                        className="text-theme-secondary leading-relaxed flex items-start gap-2"
                    >
                        <span className="text-terracotta dark:text-gold mt-1.5 flex-shrink-0">
                            •
                        </span>
                        <span>{highlight}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
