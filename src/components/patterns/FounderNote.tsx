"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export function FounderNote() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-500">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 relative">
                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-creme-light dark:border-white/5 shadow-soft dark:shadow-none">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop"
                            alt="The Founder"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                        />
                    </div>
                    {/* Decorative signature */}
                    <div className="absolute -bottom-10 -right-10 w-48 z-20">
                        <img src="/assets/img/founder-sig.png" alt="Signature" className="w-full invert-0 dark:invert transition-all" />
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">Our Commitment</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                        From My Kitchen <br />
                        <span className="text-terracotta italic">To Yours.</span>
                    </h2>
                    <div className="space-y-6 text-espresso/80 dark:text-ivory/80 text-lg md:text-xl font-light leading-relaxed">
                        <p>
                            Starting Amrit Sovereign wasn't a business decision; it was a father's necessity. I couldn't find milk in Lucknow that wasn't contaminated with urea or hormones.
                        </p>
                        <p>
                            I went back to our roots, to the native Gir cows, and built a farm that operates on the principles of Ahimsa and Vedic hygiene.
                        </p>
                        <p className="font-serif italic text-2xl text-espresso dark:text-ivory pt-4 border-t border-espresso/10 dark:border-white/10">
                            "I drink this milk every morning. My children drink it. Only then, does it reach your doorstep."
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-espresso dark:text-ivory">Anand Chaudhary</h4>
                        <p className="text-xs uppercase tracking-widest text-terracotta dark:text-gold font-bold">Founder, Amrit Sovereign</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
