"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Leaf, Award, Heart, Truck } from "lucide-react";

const trustItems = [
    { icon: ShieldCheck, text: "NABL Accredited Lab" },
    { icon: Clock, text: "Delivered Within 4 Hours" },
    { icon: Leaf, text: "100% Organic Feed" },
    { icon: Award, text: "500+ Premium Families" },
    { icon: Heart, text: "Cruelty-Free Promise" },
    { icon: Truck, text: "Electric Fleet Delivery" },
];

export function TrustTicker() {
    return (
        <section className="w-full bg-creme-light dark:bg-midnight-mid border-y border-espresso/5 dark:border-glass-border py-6 overflow-hidden transition-colors duration-300">
            <div className="relative">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-creme-light dark:from-midnight-mid to-transparent z-10 transition-colors duration-300" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-creme-light dark:from-midnight-mid to-transparent z-10 transition-colors duration-300" />

                {/* Scrolling Container */}
                <motion.div
                    className="flex gap-12"
                    animate={{ x: [0, -1200] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicate items for seamless loop */}
                    {[...trustItems, ...trustItems, ...trustItems].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-3 text-espresso/60 dark:text-ivory/60 font-medium uppercase tracking-wider text-xs md:text-sm whitespace-nowrap"
                            >
                                <Icon className="w-5 h-5 text-terracotta dark:text-gold flex-shrink-0 transition-colors duration-300" />
                                <span>{item.text}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
