"use client";

import { Section } from "@/components/ui/section";
import { Droplet, Award, Filter, Flame } from "lucide-react";
import Image from "next/image";

export function OilsProcess() {
    return (
        <Section className="bg-espresso dark:bg-black py-20 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="inline-block px-4 py-1 bg-terracotta text-white rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                            Traditional Wisdom
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                            The Art of Wood Pressing
                        </h2>
                        <p className="text-lg text-white/80 leading-relaxed font-light">
                            Unlike refined heat-treated oils, our Kacchi Ghani oils are extracted at <span className="text-terracotta font-bold">room temperature</span> using traditional wooden mortars.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: Flame, title: "Zero Heat", desc: "Nutrients retained intact" },
                                { icon: Filter, title: "Unfiltered", desc: "No chemical processing" },
                                { icon: Award, title: "Single Origin", desc: "Sourced from one farm" },
                                { icon: Droplet, title: "Natural Aroma", desc: "Smells like real seeds" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-terracotta" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{item.title}</h4>
                                        <p className="text-sm text-white/60">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-terracotta/20 blur-[100px] rounded-full"></div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            {/* Placeholder for process image */}
                            <div className="aspect-video bg-white/10 flex items-center justify-center">
                                <span className="text-white/40 font-serif italic text-lg">[Image: Wooden Ghani Process]</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
