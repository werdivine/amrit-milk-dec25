"use client";

import { Section } from "@/components/ui/section";
import { Calendar, Award, Leaf, Heart } from "lucide-react";

const milestones = [
    {
        year: "2015",
        title: "The Beginning",
        description: "Started with a vision to bring pure A2 milk to families",
        icon: Heart
    },
    {
        year: "2017",
        title: "Sustainable Farming",
        description: "Implemented zero-waste practices and organic feed",
        icon: Leaf
    },
    {
        year: "2020",
        title: "Expansion",
        description: "Introduced wood-pressed oils and traditional grains",
        icon: Calendar
    },
    {
        year: "2026",
        title: "Today",
        description: "Serving thousands of families with 40+ pure products",
        icon: Award
    }
];

export function FarmTimeline() {
    return (
        <Section className="bg-gradient-to-b from-creme to-white dark:from-midnight to-midnight-light py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-terracotta/10 text-terracotta dark:bg-gold/10 dark:text-gold rounded-full text-xs font-bold uppercase tracking-widest border border-terracotta/20 dark:border-gold/20 mb-6">
                        Our Journey
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        From a Dream in 2015 to Your Table Today
                    </h2>
                    <p className="text-lg text-espresso/70 dark:text-ivory/70 max-w-2xl mx-auto">
                        Over a decade of commitment to purity, sustainability, and tradition.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-terracotta/20 via-terracotta/40 to-terracotta/20 dark:from-gold/20 dark:via-gold/40 dark:to-gold/20" />

                    <div className="space-y-16">
                        {milestones.map((milestone, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={milestone.year}
                                    className="relative"
                                >
                                    <div className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-col`}>
                                        {/* Content */}
                                        <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                                            <div className="inline-block bg-white dark:bg-midnight-mid p-8 rounded-2xl shadow-lg border border-espresso/5 dark:border-white/5 max-w-md hover:shadow-xl transition-shadow w-full md:w-auto">
                                                <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                                                    {isEven ? (
                                                        <>
                                                            <h3 className="text-3xl font-bold font-serif text-terracotta dark:text-gold">{milestone.year}</h3>
                                                            <milestone.icon className="w-6 h-6 text-terracotta dark:text-gold" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <milestone.icon className="w-6 h-6 text-terracotta dark:text-gold" />
                                                            <h3 className="text-3xl font-bold font-serif text-terracotta dark:text-gold">{milestone.year}</h3>
                                                        </>
                                                    )}
                                                </div>
                                                <h4 className="text-xl font-bold text-espresso dark:text-ivory mb-2">
                                                    {milestone.title}
                                                </h4>
                                                <p className="text-espresso/70 dark:text-ivory/70">
                                                    {milestone.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Center dot */}
                                        <div className="relative z-10 md:block hidden">
                                            <div className="w-4 h-4 rounded-full bg-terracotta dark:bg-gold shadow-lg" />
                                        </div>

                                        {/* Spacer for other side */}
                                        <div className="flex-1 hidden md:block" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
}
