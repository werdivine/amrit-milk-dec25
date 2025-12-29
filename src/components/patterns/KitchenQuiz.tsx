"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

const questions = [
    {
        q: "How many hours after milking does your current milk arrive?",
        options: ["Less than 6h", "6-12h", "More than 12h", "I don't know"],
        weights: [100, 50, 0, 0]
    },
    {
        q: "Does your milk leave a thick white coat on the glass when finished?",
        options: ["Yes, always", "Sometimes", "Never", "Haven't noticed"],
        weights: [100, 60, 0, 20]
    },
    {
        q: "What is the packaging used for your milk?",
        options: ["Sterilized Glass", "Plastic Pouch", "Tetra Pak", "Plastic Bottle"],
        weights: [100, 0, 20, 10]
    }
];

export function KitchenQuiz() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleAnswer = (idx: number) => {
        const weight = questions[step].weights[idx];
        setScore(prev => prev + weight);

        if (step < questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    return (
        <Section className="bg-espresso dark:bg-midnight transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {!completed ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 space-y-10 backdrop-blur-md"
                        >
                            <div className="space-y-2">
                                <span className="text-terracotta font-black uppercase tracking-[0.3em] text-xs">Purity Audit</span>
                                <div className="flex justify-between items-end">
                                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-creme dark:text-ivory">The Kitchen <span className="italic">Quiz.</span></h2>
                                    <span className="text-creme/40 font-mono text-sm">0{step + 1} / 0{questions.length}</span>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <p className="text-xl md:text-3xl text-creme/90 dark:text-ivory/90 font-light leading-tight">
                                    {questions[step].q}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {questions[step].options.map((opt, i) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleAnswer(i)}
                                            className="text-left p-6 rounded-2xl border border-white/10 text-creme/70 hover:bg-white/10 hover:border-terracotta/50 transition-all flex justify-between items-center group"
                                        >
                                            <span>{opt}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-creme dark:bg-white/5 rounded-[3rem] p-12 md:p-20 text-center space-y-8 shadow-2xl transition-colors"
                        >
                            <div className="flex justify-center">
                                {score > 200 ? (
                                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-12 h-12 text-terracotta" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                                    Your Purity Score: <span className="text-terracotta">{Math.round(score / questions.length)}%</span>
                                </h3>
                                <p className="text-espresso/60 dark:text-ivory/60 text-lg max-w-xl mx-auto leading-relaxed">
                                    {score > 200
                                        ? "Impressive! You are already making high-quality choices for your family. Amrit Sovereign can take you to 100%."
                                        : "Caution advised. Your current milk source may be exposing your family to processing toxins. It's time for a Sovereign upgrade."
                                    }
                                </p>
                            </div>
                            <div className="pt-6">
                                <Button href="/subscription-hub" size="lg" className="bg-espresso text-white hover:bg-terracotta dark:bg-gold dark:text-midnight dark:hover:bg-white">
                                    {score > 200 ? "Maintain Your Standards" : "Audit Your Kitchen Now"}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Section>
    );
}
