"use client";

import { Section } from "@/components/ui/section";
import { Trees, Mountain, Sun } from "lucide-react";

export function HoneySource() {
    return (
        <Section className="bg-creme-dark dark:bg-midnight-mid py-20 border-y border-espresso/5 dark:border-white/5">
            <div className="container mx-auto px-4 text-center">
                <span className="inline-block px-4 py-1 bg-white dark:bg-white/10 text-espresso dark:text-gold rounded-full text-xs font-bold uppercase tracking-widest border border-espresso/10 dark:border-white/20 mb-8">
                    From the Source
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                    A Gift from the Deep Forest
                </h2>
                <p className="text-lg text-espresso/70 dark:text-ivory/70 max-w-3xl mx-auto mb-16 leading-relaxed">
                    Our honey isn't farmed; it's hunted. Sourced by indigenous tribal communities from deep within the forests, ensuring the bees forage on wild medicinal flora, not sugar syrup.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Trees, title: "Wild Harvested", desc: "Collected from deep, pollution-free forests." },
                        { icon: Sun, title: "Raw & Unheated", desc: "Bottled directly without heating or pasteurization." },
                        { icon: Mountain, title: "Tribal Sourced", desc: "Empowering indigenous communities ethically." }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center bg-white dark:bg-midnight p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-16 h-16 rounded-full bg-creme dark:bg-midnight-light flex items-center justify-center mb-6 text-terracotta dark:text-gold">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-espresso dark:text-ivory mb-3">{item.title}</h3>
                            <p className="text-espresso/60 dark:text-ivory/60">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
