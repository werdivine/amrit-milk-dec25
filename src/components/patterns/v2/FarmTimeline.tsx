"use client";

import { Section } from "@/components/ui/section";
import { Calendar, Award, Leaf, Heart, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const milestones = [
    {
        year: "2015",
        title: "A Father's Dream",
        description: "Started with just 5 Gir cows and a passion to fix the broken milk system for my own children.",
        icon: Heart,
        color: "bg-rose-500",
        side: "left"
    },
    {
        year: "2017",
        title: "Sustainability Pulse",
        description: "Implemented zero-waste systems. Lonapur village became our home and sanctuary for indigenous cows.",
        icon: Leaf,
        color: "bg-green-500",
        side: "right"
    },
    {
        year: "2021",
        title: "The Amrit Family Grows",
        description: "Reached 5,000+ families. Introduced authentic Bilona Ghee and cold-pressed oils.",
        icon: Users,
        color: "bg-blue-500",
        side: "left"
    },
    {
        year: "2026",
        title: "The Movement",
        description: "Now serving 20k+ families. Reclaiming our biological heritage through every bottle of pure Amrit.",
        icon: Award,
        color: "bg-gold",
        side: "right"
    }
];

export function FarmTimeline() {
    return (
        <Section className="bg-creme/50 dark:bg-midnight py-32 md:py-48 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-terracotta/10 text-terracotta dark:text-gold rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-terracotta/20 dark:border-gold/20 mb-8"
                    >
                        <Calendar className="w-3.5 h-3.5" />
                        A Decade of Purity
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-serif font-bold text-espresso dark:text-ivory mb-10 leading-[1.1]"
                    >
                        Our Journey <br /> <span className="text-terracotta dark:text-gold italic">Since 2015</span>
                    </motion.h2>
                    <div className="flex flex-col items-center gap-6">
                        <p className="text-xl md:text-2xl text-espresso/60 dark:text-ivory/60 max-w-2xl mx-auto font-medium">
                            It didn&apos;t start as a business. It started as a father&apos;s quest for truth in food.
                        </p>
                        <div className="flex items-center gap-2 text-terracotta/60 dark:text-gold/60 text-sm font-bold uppercase tracking-widest">
                            <MapPin className="w-4 h-4" />
                            Based in Lonapur, Lucknow
                        </div>
                    </div>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Center gradient line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-terracotta/20 to-transparent dark:via-gold/20 md:block hidden" />

                    <div className="space-y-24">
                        {milestones.map((milestone, index) => (
                            <div key={milestone.year} className="relative">
                                <div className={`flex flex-col md:flex-row items-center gap-12 ${milestone.side === "left" ? "md:text-right" : "md:flex-row-reverse md:text-left"
                                    }`}>
                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: milestone.side === "left" ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="flex-1 w-full"
                                    >
                                        <div className="bg-white dark:bg-midnight-mid p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-espresso/5 dark:border-white/5 relative group hover:border-terracotta/30 dark:hover:border-gold/30 transition-all duration-500">
                                            <div className={`flex items-center gap-4 mb-8 ${milestone.side === "left" ? "md:justify-end" : "md:justify-start"
                                                } justify-center`}>
                                                <div className={`w-14 h-14 rounded-2xl ${milestone.color} text-white flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500`}>
                                                    <milestone.icon className="w-7 h-7" />
                                                </div>
                                                <span className="text-5xl md:text-7xl font-serif font-black text-espresso/5 dark:text-white/5 absolute top-10 right-10 md:static">
                                                    {milestone.year}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-xl text-espresso/60 dark:text-ivory/60 leading-relaxed font-medium">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Mobile/Center Spacer */}
                                    <div className="relative z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            className={`w-6 h-6 rounded-full ${milestone.color} shadow-2xl border-4 border-white dark:border-midnight md:block hidden`}
                                        />
                                    </div>

                                    {/* Empty Side for balance on Desktop */}
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-40 text-center">
                    <p className="text-espresso/40 dark:text-ivory/40 text-xs font-bold uppercase tracking-[0.5em] mb-4">
                        Continues Forever
                    </p>
                    <div className="h-12 w-px bg-gradient-to-b from-terracotta/30 to-transparent dark:from-gold/30 mx-auto" />
                </div>
            </div>
        </Section>
    );
}
