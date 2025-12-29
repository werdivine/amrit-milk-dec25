"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function VitalityMatrix() {
    const [liters, setLiters] = useState(2);

    const monthlyCost = liters * 95 * 30;
    const commercialCost = liters * 65 * 30;
    const healthInvestment = monthlyCost - commercialCost;

    return (
        <Section className="bg-creme-light dark:bg-white/5 transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">Vitality Matrix</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory leading-tight">
                        Calculate Your <br />
                        <span className="text-terracotta">Health ROI.</span>
                    </h2>
                    <p className="text-espresso/70 dark:text-ivory/70 text-lg">
                        Switching to Amrit Sovereign isn't an expense; it's a reallocation of your pharmacy budget. Pure A2 milk prevents long-term inflammation costs.
                    </p>

                    <div className="space-y-6 bg-white dark:bg-midnight p-8 rounded-[2rem] shadow-soft dark:shadow-none border border-espresso/5 dark:border-white/5 transition-colors">
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-espresso/60 dark:text-ivory/60">
                                <span>Daily Consumption</span>
                                <span className="text-terracotta dark:text-gold">{liters} Liters</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={liters}
                                onChange={(e) => setLiters(parseInt(e.target.value))}
                                className="w-full h-1 bg-espresso/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-terracotta dark:accent-gold"
                            />
                        </div>

                        <div className="pt-6 border-t border-espresso/5 dark:border-white/5 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-espresso/40 dark:text-ivory/40">Monthly Sovereign</p>
                                <p className="text-2xl font-black text-espresso dark:text-ivory">₹{monthlyCost.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-espresso/40 dark:text-ivory/40">Pharmacy Hedge</p>
                                <p className="text-2xl font-black text-terracotta dark:text-gold">₹{healthInvestment.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-espresso dark:bg-midnight p-8 md:p-16 rounded-[4rem] text-center space-y-10 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-creme dark:text-ivory font-serif text-3xl">Quality Dividend</h3>
                        <p className="text-creme/60 dark:text-ivory/60 text-sm">
                            For less than the price of a fancy coffee per day, you secure the insulin sensitivity, bone density, and gut health of your entire family.
                        </p>
                        <div className="py-8">
                            <div className="text-5xl md:text-7xl font-serif font-bold text-terracotta">Worth It.</div>
                        </div>
                        <Button href="/subscription-hub" size="lg" className="bg-creme text-espresso hover:bg-white transition-all w-full md:w-auto">Start Your Subscription</Button>
                    </div>

                    {/* Abstract math symbols background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none select-none font-black text-9xl flex flex-wrap gap-10 items-center justify-center text-creme">
                        <span>+</span><span>%</span><span>=</span><span>√</span><span>∑</span>
                    </div>
                </div>
            </div>
        </Section>
    );
}
