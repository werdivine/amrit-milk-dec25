"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Check } from "lucide-react";

const facts = [
    {
        title: "A2 Beta-Casein",
        desc: "Native Gir cows produce milk with A2 protein, which is easily digestible and does not cause bloating or inflammation."
    },
    {
        title: "Golden Hydroxide",
        desc: "Suryaketu Nadi in Gir cows absorbs solar energy, creating gold salts in the milk—the reason for its medicinal properties."
    },
    {
        title: "Omega-3 Rich",
        desc: "Our grass-fed cows produce milk naturally rich in Omega-3 fatty acids, improving brain health and heart function."
    },
    {
        title: "Pro-Vitamin A",
        desc: "The characteristic golden yellow color comes from Beta-Carotene, which converts to Vitamin A in the human body."
    }
];

export function GirWisdom() {
    return (
        <Section className="bg-creme-light dark:bg-midnight-mid transition-colors duration-500 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">Vedantic Science</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory leading-tight">
                            The Wisdom of <br />
                            <span className="text-terracotta">Native DNA.</span>
                        </h2>
                        <p className="text-espresso/70 dark:text-ivory/70 text-lg md:text-xl leading-relaxed">
                            Generic milk comes from A1 breeds (HF/Jersey) which contain a mutation linked to chronic illnesses.
                            The Gir Cow holds the original DNA of vitality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                        {facts.map((fact, i) => (
                            <motion.div
                                key={fact.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-3"
                            >
                                <div className="flex items-center gap-2 text-terracotta dark:text-gold">
                                    <Check className="w-4 h-4" />
                                    <h3 className="font-bold uppercase tracking-widest text-[11px]">{fact.title}</h3>
                                </div>
                                <p className="text-sm text-espresso/60 dark:text-ivory/60 leading-relaxed">
                                    {fact.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    {/* Cow Illustration Placeholder / Background */}
                    <div className="relative z-10 aspect-square rounded-[4rem] overflow-hidden shadow-lifted dark:shadow-none border border-espresso/5 dark:border-white/5">
                        <img
                            src="/assets/img/farm-soul.png"
                            alt="The Soul of the Farm"
                            className="w-full h-full object-cover grayscale opacity-50 dark:grayscale-0 dark:opacity-100 transition-all duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent hidden dark:block"></div>
                        <div className="absolute bottom-10 left-10 hidden dark:block">
                            <h4 className="text-ivory font-serif text-3xl">Desi Gir</h4>
                            <p className="text-gold uppercase tracking-widest text-xs">Bos Indicus DNA</p>
                        </div>
                    </div>

                    {/* Decorative Blobs */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-500/10 dark:bg-gold/10 blur-[100px] rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-terracotta/10 dark:bg-terracotta/5 blur-[100px] rounded-full"></div>
                </div>
            </div>
        </Section>
    );
}
