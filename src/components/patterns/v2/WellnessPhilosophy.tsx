"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function WellnessPhilosophy() {
    return (
        <Section className="bg-terracotta dark:bg-gold py-24 text-center text-white dark:text-midnight relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-[2.0]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">
                    Healing, Not Just Living.
                </h2>
                <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-12 font-medium">
                    Our wellness collection brings ancient Ayurvedic wisdom to your daily routine. Natural pain relief and skin care, free from synthetic chemicals.
                </p>
                <Button
                    href="/products?category=wellness"
                    size="lg"
                    className="bg-white text-terracotta hover:bg-espresso hover:text-white dark:bg-midnight dark:text-gold dark:hover:bg-white dark:hover:text-midnight border-none h-14 px-10 text-lg"
                >
                    Explore Wellness
                </Button>
            </div>
        </Section>
    );
}
