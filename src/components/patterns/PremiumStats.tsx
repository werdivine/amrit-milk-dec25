"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Section } from "@/components/ui/section";

const stats = [
    { label: "Happy Families", value: 10000, suffix: "+" },
    { label: "Years of Heritage", value: 25, suffix: "+" },
    { label: "Days Fresh & Pure", value: 365, suffix: "" },
    { label: "Purity Guarantee", value: 100, suffix: "%" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export function PremiumStats() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-300">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-8 rounded-3xl bg-terracotta/5 dark:bg-gold/5 border border-terracotta/10 dark:border-gold/10 hover:border-terracotta/30 dark:hover:border-gold/30 transition-all duration-500 group shadow-soft dark:shadow-none"
                    >
                        <div className="text-4xl md:text-6xl font-serif font-black text-terracotta dark:text-gold mb-2 transition-colors duration-300">
                            <Counter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-sm md:text-base text-espresso/60 dark:text-ivory/60 uppercase tracking-[0.2em] font-medium transition-colors duration-300 group-hover:text-terracotta dark:group-hover:text-gold">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
