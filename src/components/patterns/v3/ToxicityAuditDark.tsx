"use client";

import { Section } from "@/components/ui/section";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Baby, Beaker, Droplets, FlaskConical, Newspaper, ShieldAlert, ShieldX, Skull, Syringe, TestTube } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// ── Animated Counter ─────────────────────────────────────
function AnimatedNumber({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = value > 100 ? Math.floor(value / 60) : 1;
        const interval = setInterval(() => {
            start += step;
            if (start >= value) { start = value; clearInterval(interval); }
            setCount(start);
        }, 25);
        return () => clearInterval(interval);
    }, [inView, value, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Shocking Headlines Ticker ────────────────────────────
const headlines = [
    "38% of milk samples failed FSSAI standards in 2024-25",
    "Gujarat factory busted producing synthetic milk from chemicals — Feb 2026",
    "Mother Dairy samples found 8x above safe bacteria limit",
    "12,780 milk samples found non-conforming across India",
    "70% of milk in India contaminated with water and chemicals — CSE Report",
    "Oxytocin injections used to force milk production in commercial dairies",
];

function HeadlineTicker() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative overflow-hidden h-8 w-full">
            <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-center"
            >
                <span className="text-sm md:text-base font-medium text-red-600/90 dark:text-red-400/90">
                    {headlines[index]}
                </span>
            </motion.div>
        </div>
    );
}

// ── The Poisons Found In Regular Milk ────────────────────
const poisons = [
    {
        icon: Beaker,
        title: "Detergent & Urea",
        stat: "Found in 40%+ samples",
        desc: "Used to emulsify oil and inflate SNF readings. Causes irreversible liver damage, kidney failure, and chronic digestive issues over years of exposure.",
        severity: "extreme",
    },
    {
        icon: FlaskConical,
        title: "Formalin & Hydrogen Peroxide",
        stat: "Used in 30%+ dairies",
        desc: "Chemical preservatives added to milk that isn't refrigerated during transport. Formalin is a known carcinogen. Peroxide destroys enzymes your body needs.",
        severity: "extreme",
    },
    {
        icon: Syringe,
        title: "Oxytocin & Antibiotics",
        stat: "1.2% above safe limits",
        desc: "Oxytocin is injected to force painful milk extraction. Antibiotic residues in milk build drug resistance in your children — making medicines fail when they're needed most.",
        severity: "high",
    },
    {
        icon: Baby,
        title: "Impact on Children",
        stat: "Early puberty in girls",
        desc: "Hormones in commercial milk are linked to early puberty, obesity, and hormonal imbalances in children. The effects are invisible — until they're not.",
        severity: "critical",
    },
];

const severityColors: Record<string, string> = {
    extreme: "border-red-500/30 dark:border-red-500/40 bg-red-500/5 dark:bg-red-500/5",
    high: "border-orange-500/30 dark:border-orange-500/40 bg-orange-500/5 dark:bg-orange-500/5",
    critical: "border-rose-500/30 dark:border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/5",
};

const severityBadge: Record<string, string> = {
    extreme: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30",
    critical: "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30",
};

// ══════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════

export function ToxicityAuditDark() {
    return (
        <section className="relative overflow-hidden bg-creme-light dark:bg-[#0a0a0a] py-0 transition-colors duration-500">
            {/* Light mode: warm cream. Dark mode: cinematic black */}

            {/* ── Part 1: The Shocking Stat ────────────────── */}
            <div className="py-20 md:py-28 relative">
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/10 dark:bg-red-900/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 dark:bg-red-900/10 blur-[120px] rounded-full" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Warning Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/40 bg-red-500/10 backdrop-blur-md">
                            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 animate-pulse" />
                            <span className="text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-[0.25em]">
                                The Silent Crisis in Your Kitchen
                            </span>
                        </div>
                    </motion.div>

                    {/* The BIG Number */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-black text-espresso dark:text-white leading-none mb-4 tracking-tight">
                            <span className="text-red-600 dark:text-red-500">
                                <AnimatedNumber value={38} suffix="%" />
                            </span>
                        </h2>
                        <p className="text-xl md:text-3xl text-espresso/80 dark:text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
                            of milk samples in India{" "}
                            <span className="text-red-600 dark:text-red-400 font-bold">failed FSSAI safety standards</span>{" "}
                            in 2024-25
                        </p>
                        <p className="mt-3 text-sm text-espresso/40 dark:text-white/40 font-medium">
                            Source: Government of India, Parliamentary Data — 33,405 samples tested
                        </p>
                    </motion.div>

                    {/* Three Impact Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
                    >
                        <div className="text-center p-6 rounded-2xl border border-espresso/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
                            <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                                <AnimatedNumber value={12780} suffix="" />
                            </div>
                            <p className="text-espresso/60 dark:text-white/60 text-sm">Non-conforming samples found</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl border border-espresso/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
                            <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                                8×
                            </div>
                            <p className="text-espresso/60 dark:text-white/60 text-sm">Bacteria above safe limit in branded milk</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl border border-espresso/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
                            <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                                <AnimatedNumber value={12057} suffix="" />
                            </div>
                            <p className="text-espresso/60 dark:text-white/60 text-sm">Legal cases filed against defaulters</p>
                        </div>
                    </motion.div>

                    {/* Live Headlines Ticker */}
                    <div className="max-w-3xl mx-auto p-4 rounded-xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <Newspaper className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <span className="text-[10px] text-red-600/70 dark:text-red-400/70 font-bold uppercase tracking-[0.3em]">Real Headlines</span>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </div>
                        <HeadlineTicker />
                    </div>
                </div>
            </div>

            {/* ── Part 2: What's Actually In Your Milk ──────── */}
            <div className="py-20 md:py-24 border-t border-espresso/10 dark:border-white/5">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-espresso dark:text-white mb-4">
                            What&apos;s <span className="text-red-600 dark:text-red-400">Actually</span> in Your Milk?
                        </h3>
                        <p className="text-espresso/50 dark:text-white/50 text-lg max-w-2xl mx-auto">
                            The truth most dairy companies don&apos;t want you to know
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {poisons.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl border p-8 backdrop-blur-sm group hover:scale-[1.02] transition-all duration-300 ${severityColors[item.severity]}`}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                                        <item.icon className="text-red-600 dark:text-red-400 w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h4 className="text-lg font-bold text-espresso dark:text-white">{item.title}</h4>
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${severityBadge[item.severity]}`}>
                                                {item.stat}
                                            </span>
                                        </div>
                                        <p className="text-espresso/60 dark:text-white/60 text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Part 3: The Amrit Answer ──────────────────── */}
            <div className="py-20 md:py-24 border-t border-espresso/10 dark:border-white/5 relative">
                {/* Green glow shift */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-900/15 blur-[120px] rounded-full" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            The Amrit Difference
                        </div>

                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-espresso dark:text-white mb-6 leading-tight">
                            We Don&apos;t Just Sell Milk.{" "}
                            <br className="hidden md:block" />
                            <span className="text-emerald-600 dark:text-emerald-400">We Audit the Toxicity Out.</span>
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                            {[
                                { label: "Preservatives", value: "Zero" },
                                { label: "Urea / Detergent", value: "Zero" },
                                { label: "Oxytocin", value: "Zero" },
                                { label: "Antibiotics", value: "Zero" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
                                >
                                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{item.value}</div>
                                    <div className="text-xs text-espresso/50 dark:text-white/50 font-medium">{item.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="mt-10 text-espresso/70 dark:text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                            Raw A2 milk from our Gir cows, chilled to 4°C within minutes of milking,
                            sealed in glass — not plastic. Every batch is{" "}
                            <strong className="text-espresso dark:text-white">lab-tested and published publicly</strong>.{" "}
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                If it&apos;s not lab-tested, it&apos;s not Amrit.
                            </span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
