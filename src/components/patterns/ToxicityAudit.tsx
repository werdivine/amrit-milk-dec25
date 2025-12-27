"use client";

import { motion } from "framer-motion";
import { Syringe, Flame, Factory } from "lucide-react";

const toxicItems = [
    {
        icon: Syringe,
        title: "Oxytocin Rush",
        description: "Industrial farms use hormone injections to force milk production, leading to early puberty and health risks in children.",
        emoji: "💉"
    },
    {
        icon: Flame,
        title: "Dead Nutrients",
        description: "High-heat pasteurization kills every single living enzyme and probiotic. You are left with 'white water' and zero benefit.",
        emoji: "🔥"
    },
    {
        icon: Factory,
        title: "Plastic Leaching",
        description: "Soft plastic pouches sit in the sun for hours, leaching BPA and microplastics directly into your glass of milk.",
        emoji: "🏙️"
    }
];

export function ToxicityAudit() {
    return (
        <section className="py-32 bg-midnight-mid relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-red-400 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                        The Crisis
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-ivory">
                        The Invisible <span className="text-red-400">Toxicity.</span>
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {toxicItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            className="glass p-8 rounded-3xl border border-red-900/30 hover:border-red-500/50 transition-all duration-500 group"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <div className="text-5xl mb-6">{item.emoji}</div>
                            <h3 className="text-2xl font-bold text-red-400 mb-4 group-hover:text-red-300 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-ivory/70 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Message */}
                <motion.p
                    className="text-center text-ivory/50 mt-12 text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    This is not fear-mongering. This is the reality of 95% of dairy in India today.
                </motion.p>
            </div>
        </section>
    );
}
