"use client";

import { Section } from "@/components/ui/section";

export function FounderNote() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-500">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">Our Commitment</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                    From My Kitchen <br />
                    <span className="text-terracotta italic">To Yours.</span>
                </h2>
                <div className="space-y-6 text-espresso/80 dark:text-ivory/80 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                    <p>
                        Starting Amrit Milk Organic wasn't a business decision; it was a father's necessity. I couldn't find milk in Lucknow that wasn't contaminated with urea or hormones.
                    </p>
                    <p>
                        I went back to our roots, to the native Gir cows, and built a farm that operates on the principles of Ahimsa and Vedic hygiene.
                    </p>
                    <p className="font-serif italic text-2xl text-espresso dark:text-ivory pt-4 border-t border-espresso/10 dark:border-white/10">
                        "I drink this milk every morning. My children drink it. Only then, does it reach your doorstep."
                    </p>
                </div>
            </div>
        </Section>
    );
}
