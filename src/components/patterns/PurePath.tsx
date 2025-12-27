"use client";

import { motion } from "framer-motion";

const timelineSteps = [
    {
        time: "3:30 AM",
        title: "The Milking",
        description: "Hand-milking begins in the serene pre-dawn hours. No machines. No stress. Just connection.",
        position: "left"
    },
    {
        time: "4:00 AM",
        title: "Cold-Chain Lock",
        description: "Milk is chilled to 4°C instantly using solar-powered chillers. This locks in sweetness and prevents bacterial growth naturally.",
        position: "right"
    },
    {
        time: "5:30 AM",
        title: "Glass Bottling",
        description: "Zero plastic. We pack in sterilized glass bottles that are sealed and ready for dispatch in electric vans.",
        position: "left"
    },
    {
        time: "7:00 AM",
        title: "Your Doorstep",
        description: "Experience the purity before your morning tea. From farm to home in under 4 hours.",
        position: "right"
    }
];

export function PurePath() {
    return (
        <section className="py-32 bg-midnight relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                        The Journey
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-ivory">
                        Pure <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-300">Path.</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-gold/50 via-gold to-gold/50" />

                    {/* Timeline Items */}
                    <div className="space-y-24">
                        {timelineSteps.map((step, index) => (
                            <motion.div
                                key={step.time}
                                className={`flex items-start ${step.position === 'left' ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                                initial={{ opacity: 0, x: step.position === 'left' ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${step.position === 'left' ? 'text-right pr-12' : 'text-left pl-12'}`}>
                                    <h3 className="text-2xl font-bold text-gold mb-2">
                                        {step.time} - {step.title}
                                    </h3>
                                    <p className="text-ivory/70 text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Center Dot */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-5 h-5 bg-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                                </div>

                                {/* Empty Space */}
                                <div className="flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-gold/80 text-lg font-medium">
                        4 hours. Zero middlemen. Pure transparency.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
