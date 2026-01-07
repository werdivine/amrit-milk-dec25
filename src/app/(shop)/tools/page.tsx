"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calculator, TrendingUp, Heart, DollarSign } from "lucide-react";

export default function ToolsPage() {
    return (
        <main className="bg-creme dark:bg-midnight min-h-screen transition-colors duration-500">
            {/* Hero */}
            <section className="pt-32 pb-20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="inline-block px-8 py-3 bg-midnight/80 backdrop-blur-md border border-gold rounded-full text-gold font-bold tracking-[0.25em] text-xs uppercase shadow-2xl mb-6">
                        Interactive Tools
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                        Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-espresso via-gold to-espresso dark:from-ivory dark:via-gold dark:to-ivory">Calculators</span>
                    </h1>
                    <p className="text-xl text-espresso-light dark:text-ivory/80">
                        Discover the real value of choosing pure, A2 milk for your family.
                    </p>
                </div>
            </section>

            {/* Health ROI Calculator */}
            <Section>
                <HealthROICalculator />
            </Section>

            {/* Subscription Savings Calculator */}
            <Section className="bg-creme-light dark:bg-midnight-mid">
                <SubscriptionCalculator />
            </Section>
        </main>
    );
}

function HealthROICalculator() {
    const [familySize, setFamilySize] = useState(4);
    const [currentSpend, setCurrentSpend] = useState(500);

    // Calculations
    const monthlyA2Cost = familySize * 90 * 8; // 2L per person per week at ₹90/L
    const monthlySavings = 0; // Health savings (doctor visits avoided, etc.)
    const healthBenefit = familySize * 2000; // Estimated health benefit value
    const proteinDiff = familySize * 12; // grams more protein per day
    const omega3Boost = familySize * 150; // % more Omega-3

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="w-16 h-16 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-serif font-bold mb-4 text-espresso dark:text-ivory">Health ROI Calculator</h2>
                <p className="text-xl text-espresso-muted dark:text-ivory/60">Calculate the real value of switching to A2 milk</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 shadow-soft dark:shadow-card-dark rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6 text-espresso dark:text-ivory">Your Details</h3>

                        <div className="space-y-6">
                            {/* Family Size */}
                            <div>
                                <label className="block text-sm font-medium mb-3 text-espresso-light dark:text-ivory/80">
                                    Family Size: <span className="text-gold text-xl ml-2">{familySize}</span> people
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={familySize}
                                    onChange={(e) => setFamilySize(parseInt(e.target.value))}
                                    className="w-full h-2 bg-creme-light dark:bg-midnight-mid rounded-lg appearance-none cursor-pointer accent-gold"
                                />
                            </div>

                            {/* Current Monthly Spend */}
                            <div>
                                <label className="block text-sm font-medium mb-3 text-espresso-light dark:text-ivory/80">
                                    Current Monthly Milk Spend: <span className="text-gold text-xl ml-2">₹{currentSpend}</span>
                                </label>
                                <input
                                    type="range"
                                    min="200"
                                    max="2000"
                                    step="100"
                                    value={currentSpend}
                                    onChange={(e) => setCurrentSpend(parseInt(e.target.value))}
                                    className="w-full h-2 bg-midnight-mid rounded-lg appearance-none cursor-pointer accent-gold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-2xl p-8 bg-white dark:bg-midnight-mid shadow-soft dark:shadow-card-dark">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-espresso dark:text-ivory">
                            <TrendingUp className="text-gold" />
                            Your Health ROI
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-espresso-muted dark:text-ivory/60 mb-1">Monthly A2 Milk Investment</p>
                                <p className="text-3xl font-bold text-gold">₹{monthlyA2Cost.toLocaleString()}</p>
                            </div>

                            <div className="h-px bg-creme-dark dark:bg-white/10"></div>

                            <div>
                                <p className="text-sm text-espresso-muted dark:text-ivory/60 mb-1">Estimated Health Value</p>
                                <p className="text-2xl font-bold text-green-500">₹{healthBenefit.toLocaleString()}/month</p>
                                <p className="text-xs text-espresso-muted dark:text-ivory/60 mt-1">
                                    *Based on reduced inflammation, better digestion, stronger immunity
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-creme-light dark:bg-midnight-mid rounded-xl p-4">
                                    <p className="text-2xl font-bold text-gold">+{proteinDiff}g</p>
                                    <p className="text-xs text-espresso-muted dark:text-ivory/60">More Protein Daily</p>
                                </div>
                                <div className="bg-creme-light dark:bg-midnight-mid rounded-xl p-4">
                                    <p className="text-2xl font-bold text-gold">+{omega3Boost}%</p>
                                    <p className="text-xs text-espresso-muted dark:text-ivory/60">More Omega-3</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 shadow-soft dark:shadow-card-dark rounded-xl p-6 flex items-start gap-4">
                        <Heart className="w-6 h-6 text-gold flex-shrink-0" />
                        <p className="text-sm text-espresso-light dark:text-ivory/80 leading-relaxed">
                            <strong>Health Note:</strong> A2 milk is easier to digest, reduces inflammation, and supports gut health. Many families report fewer digestive issues and improved energy within weeks.
                        </p>
                    </div>

                    <Button href="/products" size="lg" icon className="w-full">
                        Start Your A2 Journey
                    </Button>
                </div>
            </div>
        </div>
    );
}

function SubscriptionCalculator() {
    const [weeklyBottles, setWeeklyBottles] = useState(7);

    const regularPrice = 50;
    const a2CurrentPrice = 45;
    const subscriptionPrice = 40;

    const weeklyRegular = weeklyBottles * regularPrice;
    const weeklyA2 = weeklyBottles * a2CurrentPrice;
    const weeklySubscription = weeklyBottles * subscriptionPrice;

    const monthlySavings = (weeklyA2 - weeklySubscription) * 4;
    const yearlySavings = monthlySavings * 12;

    return (<div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-4xl font-serif font-bold mb-4 text-espresso dark:text-ivory">Subscription Savings Calculator</h2>
            <p className="text-xl text-espresso-muted dark:text-ivory/60">See how much you save with recurring delivery</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input */}
            <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 shadow-soft dark:shadow-card-dark rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-espresso dark:text-ivory">Weekly Consumption</h3>

                <div>
                    <label className="block text-sm font-medium mb-3 text-espresso-light dark:text-ivory/80">
                        Bottles per Week (500ml): <span className="text-gold text-2xl ml-2">{weeklyBottles}</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="28"
                        value={weeklyBottles}
                        onChange={(e) => setWeeklyBottles(parseInt(e.target.value))}
                        className="w-full h-2 bg-creme-light dark:bg-midnight-mid rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                    <p className="text-xs text-espresso-muted dark:text-ivory/60 mt-2">
                        That's {(weeklyBottles * 0.5).toFixed(1)}L per week, or {(weeklyBottles * 0.5 * 4).toFixed(0)}L per month
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-creme-dark dark:border-white/10 text-espresso-light dark:text-ivory/80">
                        <span>Regular Milk (₹{regularPrice}/bottle)</span>
                        <span className="text-espresso-muted dark:text-ivory/60">₹{weeklyRegular}/week</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-creme-dark dark:border-white/10 text-espresso-light dark:text-ivory/80">
                        <span>A2 Milk One-Time (₹{a2CurrentPrice}/bottle)</span>
                        <span className="text-espresso-muted dark:text-ivory/60">₹{weeklyA2}/week</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gold/30">
                        <span className="font-bold text-espresso dark:text-ivory">A2 Subscription (₹{subscriptionPrice}/bottle)</span>
                        <span className="text-gold font-bold">₹{weeklySubscription}/week</span>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-2xl p-8 bg-white dark:bg-transparent shadow-soft dark:shadow-none">
                    <h3 className="text-2xl font-bold mb-6 text-espresso dark:text-ivory">Your Savings</h3>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-espresso-muted dark:text-ivory/60 mb-1">Monthly Savings</p>
                            <p className="text-4xl font-bold text-green-500">₹{monthlySavings}</p>
                        </div>

                        <div className="h-px bg-creme-dark dark:bg-white/10"></div>

                        <div>
                            <p className="text-sm text-espresso-muted dark:text-ivory/60 mb-1">Yearly Savings</p>
                            <p className="text-3xl font-bold text-green-500">₹{yearlySavings.toLocaleString()}</p>
                        </div>

                        <div className="bg-creme-light dark:bg-midnight-mid rounded-xl p-6">
                            <p className="text-sm text-espresso-muted dark:text-ivory/60 mb-2">Subscription Benefits:</p>
                            <ul className="space-y-2 text-sm text-espresso-light dark:text-ivory/80">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                    <span>Never run out - auto delivery</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                    <span>Priority delivery slots</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                    <span>Cancel or pause anytime</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                    <span>Exclusive subscriber perks</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Button href="/subscription-hub" size="lg" icon className="w-full">
                    Start Subscription
                </Button>
            </div>
        </div>
    </div>
    );
}
