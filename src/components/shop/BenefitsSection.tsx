"use client";

import { Flame } from "lucide-react";

interface BenefitsSectionProps {
    benefits: string[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
    if (!benefits || benefits.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h3 className="text-xl font-bold text-theme-primary">Benefits</h3>
            </div>
            <ul className="space-y-3 ml-9">
                {benefits.map((benefit, index) => (
                    <li
                        key={index}
                        className="text-theme-secondary leading-relaxed flex items-start gap-2"
                    >
                        <span className="text-orange-600 dark:text-orange-400 mt-1.5 flex-shrink-0">
                            •
                        </span>
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
