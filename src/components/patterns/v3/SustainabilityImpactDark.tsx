"use client";

import { Section } from "@/components/ui/section";
import { motion, useInView } from "framer-motion";
import { Leaf, Recycle, Heart, Droplets, TrendingUp, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const impacts = [
    {
        icon: Recycle,
        value: 145000,
        label: "Plastic Pouches Saved",
        suffix: "+",
        desc: "By using glass bottles, we eliminate single-use plastic waste from your home.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
        icon: Heart,
        value: 100,
        label: "Ethical Treatment",
        suffix: "%",
        desc: "No hormones. No cruelty. Just happy cows living their best life in open pastures.",
        color: "text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/20"
    },
    {
        icon: Droplets,
        value: 0,
        label: "Water Wasted",
        suffix: "",
        desc: "Our closed-loop recycling system ensures every drop is reused for farming.",
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20"
    }
];

function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = value;
            const totalDuration = duration * 1000;
            const incrementTime = totalDuration / end;

            // For large numbers, jump in bigger steps
            const step = end > 1000 ? Math.floor(end / 100) : 1;
            const timerSpeed = end > 1000 ? 20 : incrementTime;

            const timer = setInterval(() => {
                start += step;
                if (start > end) start = end;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, timerSpeed);

            return () => clearInterval(timer);
        }
    }, [inView, value, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function SustainabilityImpactDark() {
    return (
        <Section className="bg-creme-light dark:bg-midnight py-24 relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-espresso/20 dark:via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/5 dark:from-emerald-900/10 via-transparent dark:via-midnight to-transparent dark:to-midnight pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <Leaf className="w-3 h-3" />
                        Planet First
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory leading-tight"
                    >
                        Purity requires <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-200">
                            Responsibility.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-espresso/70 dark:text-ivory/60 leading-relaxed"
                    >
                        We don&apos;t just sell milk; we steward the land. Every bottle of Amrit supports a cycle of life that heals the soil, respects the animal, and protects your family using zero plastic.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {impacts.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className={`p-8 rounded-[2rem] border backdrop-blur-md relative group overflow-hidden bg-white/80 dark:bg-transparent ${item.bg}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.color} bg-white/20 dark:bg-white/5`}>
                                <item.icon className="w-6 h-6" />
                            </div>

                            <div className={`text-4xl md:text-5xl font-bold mb-2 ${item.color}`}>
                                <Counter value={item.value} />{item.suffix}
                            </div>

                            <h3 className="text-xl font-bold text-espresso dark:text-ivory mb-4">{item.label}</h3>

                            <p className="text-espresso/60 dark:text-ivory/60 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block relative">
                        <Sparkles className="w-6 h-6 text-terracotta dark:text-gold absolute -top-4 -left-6 animate-pulse" />
                        <p className="text-xl md:text-2xl font-serif text-espresso/80 dark:text-ivory/80 italic">
                            &ldquo;The earth is not a resource to be exploited,<br className="hidden md:block" />
                            but a legacy to be preserved.&rdquo;
                        </p>
                        <Sparkles className="w-6 h-6 text-terracotta dark:text-gold absolute -bottom-4 -right-6 animate-pulse delay-700" />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
