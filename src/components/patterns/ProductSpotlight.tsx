"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ProductSpotlightProps {
    title: string;
    description: string;
    imageSrc: string;
    benefits: string[];
    ctaText: string;
    ctaLink: string;
    reversed?: boolean;
    accentColor?: "gold" | "emerald" | "terracotta";
}

export function ProductSpotlight({
    title,
    description,
    imageSrc,
    benefits,
    ctaText,
    ctaLink,
    reversed = false,
    accentColor = "gold"
}: ProductSpotlightProps) {
    const accentClass = {
        gold: "text-gold bg-gold/10 border-gold/20",
        emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        terracotta: "text-terracotta bg-terracotta/10 border-terracotta/20"
    }[accentColor];

    const gradientClass = {
        gold: "from-gold/20",
        emerald: "from-emerald-500/20",
        terracotta: "from-terracotta/20"
    }[accentColor];

    return (
        <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${reversed ? "md:flex-row-reverse" : ""}`}>
            {/* Image Side */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2"
            >
                <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-contain p-8 hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8"
            >
                <div>
                    <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${accentClass}`}>
                        Sovereign Choice
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                        {title}
                    </h2>
                </div>

                <p className="text-xl text-espresso/70 dark:text-ivory/70 leading-relaxed">
                    {description}
                </p>

                <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className="flex items-center gap-3"
                        >
                            <CheckCircle className={`w-6 h-6 ${accentClass.split(' ')[0]}`} />
                            <span className="text-lg text-espresso/80 dark:text-ivory/80">{benefit}</span>
                        </motion.li>
                    ))}
                </ul>

                <div className="pt-4">
                    <Button href={ctaLink} size="lg" className="min-w-[200px]" icon>
                        {ctaText}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
