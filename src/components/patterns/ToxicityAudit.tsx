"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Droplets, FlaskConical, ShieldAlert, Skull } from "lucide-react";

const poisons = [
    {
        icon: Droplets,
        title: "Detergent & Urea",
        desc: "Used to emulsify oil and increase SNF values. Destroys liver and kidney function over time.",
        level: "High Toxicity",
    },
    {
        icon: FlaskConical,
        title: "Formalin / Peroxide",
        desc: "Preservatives to prevent spoilage in non-refrigerated transport. Highly carcinogenic.",
        level: "Extreme Risk",
    },
    {
        icon: ShieldAlert,
        title: "Antibiotics / Hormones",
        desc: "Oxytocin used for forceful milking and antibiotics to hide udder infections. Causes early puberty.",
        level: "Biological Hazard",
    },
    {
        icon: Skull,
        title: "Starch & Sugar",
        desc: "Added to thicken water-diluted milk. Spikes glycemic index and affects diabetic health.",
        level: "Structural Adultery",
    },
];

export function ToxicityAudit() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-500 overflow-hidden">
            <div className="relative z-10 space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="px-4 py-1 border border-terracotta text-terracotta rounded-full text-xs font-bold uppercase tracking-widest inline-block"
                    >
                        The Silent Crisis
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory leading-tight">
                        Is Your Milk <br />
                        <span className="text-terracotta">Truly Pure?</span>
                    </h2>
                    <p className="text-espresso-muted dark:text-ivory/60 text-lg md:text-xl font-light">
                        Over 68% of milk sold in India fails FSSAI standards.{" "}
                        <br className="hidden md:block" />
                        We don&apos;t just sell milk; we audit the toxicity out of your kitchen.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {poisons.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-white/5 border border-creme-dark dark:border-white/10 p-8 rounded-3xl hover:bg-creme-light dark:hover:bg-white/10 transition-all group backdrop-blur-md shadow-soft dark:shadow-none"
                        >
                            <div className="w-12 h-12 bg-terracotta/20 rounded-2xl flex items-center justify-center mb-6 border border-terracotta/30 group-hover:scale-110 transition-transform">
                                <item.icon className="text-terracotta w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-espresso dark:text-ivory mb-2">
                                {item.title}
                            </h3>
                            <p className="text-espresso-light dark:text-ivory/50 text-sm leading-relaxed mb-6">
                                {item.desc}
                            </p>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-black text-terracotta/80 py-1 px-3 border border-terracotta/30 inline-block rounded-full">
                                {item.level}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-white dark:bg-creme/5 border border-terracotta/20 p-8 md:p-12 rounded-[3rem] text-center max-w-5xl mx-auto space-y-6 shadow-md dark:shadow-none">
                    <h4 className="text-2xl font-serif text-espresso dark:text-ivory">
                        Amrit Sovereign: <span className="italic">The Antidote</span>
                    </h4>
                    <p className="text-espresso-light dark:text-ivory/70 max-w-2xl mx-auto">
                        We use zero preservatives. No urea. No oxytocin. Just raw A2 milk chilled to
                        4°C within minutes of milking and sealed in glass.
                        <strong> If it&apos;s not lab-tested, it&apos;s not Amrit.</strong>
                    </p>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-espresso/30 blur-[120px] rounded-full -ml-48 -mb-48"></div>
        </Section>
    );
}
