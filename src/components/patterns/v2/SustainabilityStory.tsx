"use client";

import { Section } from "@/components/ui/section";
import { Droplets, Heart, Leaf, Recycle, Sun, TreePine } from "lucide-react";

const practices = [
    {
        icon: Recycle,
        title: "Zero Waste",
        description: "Every byproduct is reused - cow dung for biogas, waste for compost",
    },
    {
        icon: TreePine,
        title: "Native Breeds",
        description: "Preserving indigenous Gir and Sahiwal cows from extinction",
    },
    {
        icon: Sun,
        title: "Renewable Energy",
        description: "Solar-powered operations and biogas from farm waste",
    },
    {
        icon: Droplets,
        title: "Water Conservation",
        description: "Rainwater harvesting and drip irrigation systems",
    },
    {
        icon: Leaf,
        title: "Organic Feed",
        description: "100% chemical-free fodder grown on our own fields",
    },
    {
        icon: Heart,
        title: "Cow Welfare",
        description: "Free-range grazing, natural breeding, no hormones",
    },
];

export function SustainabilityStory() {
    return (
        <Section className="bg-espresso dark:bg-black py-24 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-white/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 mb-6">
                        Sustainability First
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        How We Farm Matters
                    </h2>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Since 2015, we&apos;ve built a{" "}
                        <span className="text-gold font-bold">completely sustainable farm</span>{" "}
                        where every decision honors the earth, the animals, and our heritage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {practices.map((practice, index) => (
                        <div
                            key={index}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-gold/30 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                                <practice.icon className="w-8 h-8 text-gold" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{practice.title}</h3>
                            <p className="text-white/70">{practice.description}</p>
                        </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="text-center mt-16">
                    <p className="text-white/90 text-lg italic">
                        &quot;We don&apos;t just sell products. We practice a way of life that has
                        sustained our civilization for millennia.&quot;
                    </p>
                </div>
            </div>
        </Section>
    );
}
