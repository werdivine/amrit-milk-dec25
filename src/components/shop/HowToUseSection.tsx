"use client";

import { Circle } from "lucide-react";

interface HowToUseSectionProps {
    steps: string[];
}

export function HowToUseSection({ steps }: HowToUseSectionProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Circle className="w-6 h-6 text-terracotta dark:text-gold fill-current" />
                <h3 className="text-xl font-bold text-theme-primary">How to Use</h3>
            </div>
            <ul className="space-y-3 ml-9">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className="text-theme-secondary leading-relaxed flex items-start gap-2"
                    >
                        <span className="text-terracotta dark:text-gold mt-1.5 flex-shrink-0">
                            •
                        </span>
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
