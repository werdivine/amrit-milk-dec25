"use client";

import { Section } from "@/components/ui/section";
import Image from "next/image";

export function Storyteller() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-500 overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern
                        id="pattern-circles"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#pattern-circles)" />
                </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <div className="order-2 lg:order-1 space-y-10">
                    <div className="space-y-4">
                        <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">
                            The Origin
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory leading-tight">
                            A Tale of Two <br />
                            <span className="text-terracotta italic">Milks.</span>
                        </h2>
                    </div>

                    <div className="space-y-8 text-espresso/80 dark:text-ivory/80 text-lg leading-relaxed">
                        <p>
                            In 2022, we faced a dilemma. The milk on our tables was no longer
                            &apos;milk&apos;. It was a cocktail of hormones, urea, and preservatives
                            hidden behind shiny plastic packets.
                        </p>
                        <p>
                            We decided to restart. We didn&apos;t just build a supply chain; we
                            restored a legacy. By bringing back the desi Gir Cow, we brought back
                            the health our ancestors took for granted.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {[
                                "Zero Antibiotics. Guaranteed.",
                                "Ahimsa Milking (Calf is fed first)",
                                "No Synthetic Feed. 100% Grass-fed.",
                                "Sterilized Glass. Always.",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-4 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta dark:bg-gold group-hover:scale-150 transition-transform"></div>
                                    <span className="font-medium text-base md:text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-terracotta/10 dark:bg-gold/10 rounded-[4rem] blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-espresso/5 dark:border-white/5 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2000&auto=format&fit=crop"
                                alt="Founding Vision"
                                width={800}
                                height={800}
                                className="w-full h-full object-cover grayscale opacity-50 dark:opacity-100 hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-10 left-10 space-y-2">
                                <p className="text-creme uppercase tracking-widest text-xs font-bold">
                                    Lucknow, Uttar Pradesh
                                </p>
                                <p className="text-ivory font-serif text-2xl">EST. 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
