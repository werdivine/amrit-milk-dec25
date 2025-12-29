"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, Truck, PackageCheck, ThermometerSnowflake } from "lucide-react";
import { Section } from "@/components/ui/section";

const steps = [
    {
        time: "4:00 AM",
        title: "Brahma Milking",
        desc: "Milking begins during the most auspicious hours of early morning for maximum purity.",
        icon: Clock,
        color: "text-amber-500"
    },
    {
        time: "4:15 AM",
        title: "Flash Cooling",
        desc: "Milk is instantly chilled to 4°C in a specialized bulk milk cooler to lock in freshness.",
        icon: ThermometerSnowflake,
        color: "text-blue-500"
    },
    {
        time: "5:30 AM",
        title: "Sterile Bottling",
        desc: "Transferred to steam-sterilized glass bottles. Zero human contact. Hermetically sealed.",
        icon: PackageCheck,
        color: "text-emerald-500"
    },
    {
        time: "6:00 AM",
        title: "Cold Chain Logistics",
        desc: "Loaded into temperature-controlled vans. Tracked live for speed and safety.",
        icon: Truck,
        color: "text-indigo-500"
    },
    {
        time: "8:00 AM",
        title: "Doorstep Delivery",
        desc: "The nectar reaches your home within 4 hours of milking. Freshness guaranteed.",
        icon: CheckCircle2,
        color: "text-terracotta"
    }
];

export function PurePath() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-500">
            <div className="space-y-16">
                <div className="text-center space-y-4">
                    <span className="text-terracotta dark:text-gold text-xs font-bold uppercase tracking-[0.3em]">Temporal Purity</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">The Pure <span className="italic">Path.</span></h2>
                    <p className="text-espresso/60 dark:text-ivory/60 max-w-2xl mx-auto text-lg">
                        From udder to glass in less than 4 hours. No detours. No processing. Just the path of nature.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto pt-10">
                    {/* Progress Line */}
                    <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-0.5 bg-gradient-to-b from-amber-500/20 via-terracotta/20 to-terracotta dark:from-gold/20 dark:to-gold"></div>

                    <div className="space-y-20">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`relative flex items-center gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Time marker */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-creme dark:bg-midnight border-4 border-terracotta dark:border-gold z-10 shadow-[0_0_15px_rgba(199,91,57,0.5)]"></div>

                                {/* Content */}
                                <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className={`inline-flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className={`w-10 h-10 rounded-xl bg-white dark:bg-white/5 shadow-soft dark:shadow-none flex items-center justify-center border border-espresso/5 dark:border-white/10 ${step.color}`}>
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-2xl font-black text-espresso dark:text-ivory tracking-tighter opacity-80">{step.time}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-espresso dark:text-ivory mb-3">{step.title}</h3>
                                    <p className="text-espresso/60 dark:text-ivory/70 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                                        {step.desc}
                                    </p>
                                </div>

                                <div className="hidden md:block flex-1"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
