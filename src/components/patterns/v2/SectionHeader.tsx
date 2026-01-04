"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    subtitle: string;
    title: string;
    description?: string;
    align?: "left" | "center" | "right";
    className?: string;
    lightMode?: boolean; // if true, force light theme colors (for dark backgrounds)
}

export function SectionHeader({ subtitle, title, description, align = "center", className, lightMode = false }: SectionHeaderProps) {
    return (
        <div className={cn("space-y-4 mb-12", {
            "text-center": align === "center",
            "text-left": align === "left",
            "text-right": align === "right"
        }, className)}>
            <span className={cn(
                "inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors",
                lightMode
                    ? "bg-white/10 text-gold border-white/20"
                    : "bg-terracotta/10 text-terracotta border-terracotta/20 dark:bg-gold/10 dark:text-gold dark:border-gold/20"
            )}>
                {subtitle}
            </span>
            <h2 className={cn(
                "text-4xl md:text-5xl font-serif font-bold leading-tight transition-colors",
                lightMode ? "text-ivory" : "text-espresso dark:text-ivory"
            )}>
                {title}
            </h2>
            {description && (
                <p className={cn(
                    "text-lg max-w-2xl mx-auto leading-relaxed transition-colors",
                    lightMode ? "text-ivory/70" : "text-espresso/70 dark:text-ivory/70",
                    // Reset mx-auto if not centered
                    align !== "center" && "mx-0"
                )}>
                    {description}
                </p>
            )}
        </div>
    );
}
