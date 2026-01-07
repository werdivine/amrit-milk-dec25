"use client";

import { Section } from "@/components/ui/section";
import { Award, CheckCircle, Clock, ShieldCheck } from "lucide-react";

const trustItems = [
    {
        icon: Award,
        title: "Indian Desi Cows (A2)",
        desc: "Strictly Desi Gir Cow & Buffalo Milk"
    },
    {
        icon: ShieldCheck,
        title: "Own Farm, Not Aggregated",
        desc: "We raise our own cows, we don't buy milk."
    },
    {
        icon: CheckCircle,
        title: "Trusted by 700+ Families",
        desc: "Serving healthy families & children for 12+ years"
    },
    {
        icon: Clock,
        title: "Delivered Fresh",
        desc: "Milked at 4AM, delivered by 8AM daily"
    }
];

export function TrustStrip() {
    return (
        <Section className="py-12 bg-espresso dark:bg-glass-bg border-y border-white/10 relative overflow-hidden">
            {/* Gloss FX */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {trustItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <item.icon className="w-8 h-8 text-gold dark:text-terracotta" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-white/60 text-sm max-w-[200px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
