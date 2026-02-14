"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// Using standard input type="range" instead of Slider to ensure compatibility.

export function PurityCalculator() {
    const [liters, setLiters] = useState(2);

    // Assumptions
    const processMilkCost = 60; // Rs per liter
    const amritMilkCost = 120; // Rs per liter
    const healthCostFactor = 50; // Estimated hidden health cost per liter of processed milk (doctor visits, long term issues)

    const monthlyProcessedCost = liters * processMilkCost * 30;
    const monthlyAmritCost = liters * amritMilkCost * 30;
    const monthlyHiddenCost = liters * healthCostFactor * 30;

    const trueCostProcessed = monthlyProcessedCost + monthlyHiddenCost;
    const investmentGap = monthlyAmritCost - monthlyProcessedCost;

    return (
        <div className="bg-white dark:bg-white/5 rounded-[3rem] p-8 md:p-12 border border-espresso/10 dark:border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                        The True Cost of Milk
                    </h3>
                    <p className="text-espresso/60 dark:text-ivory/60 max-w-lg mx-auto">
                        Is your &quot;cheap&quot; milk actually costing you more in health? Calculate your family&apos;s exposure.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-wider text-espresso/50 dark:text-ivory/50">
                                Daily Consumption (Liters)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0.5"
                                    max="5"
                                    step="0.5"
                                    value={liters}
                                    onChange={(e) => setLiters(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-espresso/10 rounded-lg appearance-none cursor-pointer accent-terracotta"
                                />
                                <span className="text-2xl font-bold font-serif text-terracotta w-16 text-right">
                                    {liters}L
                                </span>
                            </div>
                        </div>

                        <div className="p-6 bg-espresso/5 dark:bg-white/5 rounded-2xl space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-espresso/70 dark:text-ivory/70">Monthly Grocery Bill (Regular)</span>
                                <span className="font-bold">₹{monthlyProcessedCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-terracotta">
                                <span>+ Hidden Health Costs (Est.)</span>
                                <span className="font-bold">+₹{monthlyHiddenCost.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-espresso/10 dark:bg-white/10 my-2" />
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Real Monthly Cost</span>
                                <span>₹{trueCostProcessed.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center space-y-2">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs">
                                The Sovereign Investment
                            </span>
                            <div className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                                ₹{monthlyAmritCost.toLocaleString()}
                            </div>
                            <span className="text-sm text-espresso/60 dark:text-ivory/60">
                                per month for pure inputs
                            </span>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-espresso/70 dark:text-ivory/70 mb-2">
                                For just <span className="font-bold text-emerald-500">₹{(investmentGap / 30).toFixed(0)}</span> more per day
                            </p>
                            <p className="text-lg font-medium text-espresso dark:text-ivory">
                                You eliminate toxins and invest in vitality.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
