"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";

export function KitchenQuiz() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "When you boil your current milk, does it leave a thick, oily yellow layer on cooling?",
            options: [
                { text: "No, it's thin and white", value: 0 },
                { text: "Yes, thick and yellow", value: 10 },
            ]
        },
        {
            q: "Does your milk packet have an expiration date longer than 3 days?",
            options: [
                { text: "Yes (UHT/Tetra Pack)", value: -10 },
                { text: "No (Fresh Pouch)", value: 0 },
            ]
        }
    ];

    const handleAnswer = (val: number) => {
        setScore(score + val);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(questions.length); // Results
        }
    }

    return (
        <Section className="bg-gradient-to-br from-midnight to-midnight-mid border-t border-glass-border">
            <div className="max-w-4xl mx-auto text-center">
                <span className="block text-gold/60 text-sm font-bold uppercase tracking-[0.3em] mb-4">The Truth Test</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">Is your kitchen <span className="text-gold">safe?</span></h2>

                <div className="bg-glass-bg border border-glass-border rounded-2xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden transition-all">
                    {step < questions.length ? (
                        <div className="space-y-8 animate-fade-in">
                            <h3 className="text-2xl font-medium">{questions[step].q}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {questions[step].options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="p-6 border border-glass-border rounded-xl hover:bg-gold hover:text-midnight transition-all text-lg font-medium text-left flex items-center justify-between group"
                                    >
                                        {opt.text}
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                            <div className="text-sm text-ivory/30">Question {step + 1} of {questions.length}</div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6 animate-fade-in-up">
                            {score < 0 ? (
                                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
                            ) : (
                                <CheckCircle className="w-16 h-16 text-gold mx-auto" />
                            )}

                            <h3 className="text-3xl font-serif font-bold">
                                {score < 0 ? "Potential Health Risk Detected" : "You deserve better purity."}
                            </h3>
                            <p className="text-ivory/70 max-w-xl mx-auto">
                                {score < 0
                                    ? "Your current milk shows signs of industrial processing (UHT) or lack of fat-soluble vitamins. Real A2 milk should spoil in 2 days if not boiled."
                                    : "Even 'fresh' pouch milk is often reconstituted with skimmed milk powder. Experience the difference of raw, living milk."
                                }
                            </p>
                            <Button href="/subscription-hub">Start 7-Day Detox</Button>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}
