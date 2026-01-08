"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Calculator, Heart, Leaf, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

export default function CalculatorPage() {
    const [familySize, setFamilySize] = useState(4);
    const [currentMilkType, setCurrentMilkType] = useState<"packet" | "loose" | "tetra">("packet");
    const [dailyConsumption, setDailyConsumption] = useState(1);

    const pricing = {
        amrit: 120, // per liter
        packet: 60,
        loose: 50,
        tetra: 80,
    };

    const calculations = useMemo(() => {
        const currentCost = pricing[currentMilkType] * dailyConsumption * 30;
        const amritCost = pricing.amrit * dailyConsumption * 30;
        const difference = amritCost - currentCost;
        const yearlyDifference = difference * 12;

        // Health savings estimation (reduced doctor visits, better immunity)
        const estimatedHealthSavings = familySize * 500; // ₹500 per person per month avg

        const netMonthlyCost = amritCost - estimatedHealthSavings;
        const isNetPositive = netMonthlyCost <= currentCost;

        return {
            currentCost,
            amritCost,
            difference,
            yearlyDifference,
            estimatedHealthSavings,
            netMonthlyCost,
            isNetPositive,
            dailyCostDiff: difference / 30,
        };
    }, [familySize, currentMilkType, dailyConsumption]);

    return (
        <main className="bg-creme dark:bg-midnight transition-colors duration-500 min-h-screen">
            {/* Hero */}
            <section className="relative py-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] mb-4 block">
                        ROI Calculator
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        True Cost of Purity
                    </h1>
                    <p className="text-xl text-espresso/70 dark:text-ivory/70 max-w-2xl mx-auto">
                        Calculate the real value of switching to pure A2 Gir Cow Milk. Factor in
                        health benefits, not just price tags.
                    </p>
                </div>
            </section>

            <Section>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Input Panel */}
                        <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-espresso/10 dark:border-white/10 shadow-soft">
                            <h2 className="text-2xl font-bold text-espresso dark:text-ivory mb-8 flex items-center gap-3">
                                <Calculator className="w-6 h-6 text-terracotta dark:text-gold" />
                                Your Details
                            </h2>

                            {/* Family Size */}
                            <div className="mb-8">
                                <label className="block text-espresso/70 dark:text-ivory/70 mb-3">
                                    Family Size
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={familySize}
                                        onChange={(e) => setFamilySize(parseInt(e.target.value))}
                                        className="flex-1 h-3 bg-espresso/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-terracotta dark:accent-gold z-20"
                                    />
                                    <span className="text-2xl font-bold text-terracotta dark:text-gold w-12 text-center">
                                        {familySize}
                                    </span>
                                </div>
                            </div>

                            {/* Daily Consumption */}
                            <div className="mb-8">
                                <label className="block text-espresso/70 dark:text-ivory/70 mb-3">
                                    Daily Milk Consumption (Liters)
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="5"
                                        step="0.5"
                                        value={dailyConsumption}
                                        onChange={(e) =>
                                            setDailyConsumption(parseFloat(e.target.value))
                                        }
                                        className="flex-1 h-3 bg-espresso/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-terracotta dark:accent-gold z-20"
                                    />
                                    <span className="text-2xl font-bold text-terracotta dark:text-gold w-12 text-center">
                                        {dailyConsumption}L
                                    </span>
                                </div>
                            </div>

                            {/* Current Milk Type */}
                            <div className="mb-8">
                                <label className="block text-espresso/70 dark:text-ivory/70 mb-3">
                                    Current Milk Type
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: "packet", label: "Packet Milk", price: "₹60/L" },
                                        { value: "loose", label: "Loose Milk", price: "₹50/L" },
                                        { value: "tetra", label: "Tetra Pack", price: "₹80/L" },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setCurrentMilkType(option.value as any)}
                                            className={`p-4 rounded-xl border text-center transition-all ${
                                                currentMilkType === option.value
                                                    ? "border-terracotta dark:border-gold bg-terracotta/10 dark:bg-gold/10 text-terracotta dark:text-gold"
                                                    : "border-espresso/10 dark:border-white/10 text-espresso/70 dark:text-ivory/70 hover:border-terracotta/50 dark:hover:border-ivory/30"
                                            }`}
                                        >
                                            <p className="font-medium">{option.label}</p>
                                            <p className="text-sm opacity-70">{option.price}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Amrit Price Note */}
                            <div className="p-4 bg-gold/10 border border-gold/30 rounded-xl">
                                <p className="text-gold font-medium text-center">
                                    Amrit A2 Gir Cow Milk: ₹120/L
                                </p>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="space-y-6">
                            {/* Monthly Comparison */}
                            <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-espresso/10 dark:border-white/10 shadow-soft">
                                <h3 className="text-lg font-bold text-espresso/70 dark:text-ivory/70 mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-terracotta dark:text-gold" />
                                    Monthly Comparison
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-espresso/40 dark:text-ivory/50 text-sm mb-1">
                                            Current Spending
                                        </p>
                                        <p className="text-3xl font-bold text-espresso dark:text-ivory">
                                            ₹{calculations.currentCost.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-espresso/40 dark:text-ivory/50 text-sm mb-1">
                                            With Amrit
                                        </p>
                                        <p className="text-3xl font-bold text-terracotta dark:text-gold">
                                            ₹{calculations.amritCost.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-espresso/10 dark:border-white/10">
                                    <p className="text-espresso/40 dark:text-ivory/50 text-sm mb-1">
                                        Additional Investment
                                    </p>
                                    <p
                                        className={`text-2xl font-bold ${calculations.difference > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-green-400"}`}
                                    >
                                        {calculations.difference > 0 ? "+" : ""}₹
                                        {calculations.difference.toLocaleString()}/month
                                    </p>
                                    <p className="text-espresso/40 dark:text-ivory/50 text-sm mt-1">
                                        That&apos;s just ₹{Math.round(calculations.dailyCostDiff)}
                                        /day more
                                    </p>
                                </div>
                            </div>

                            {/* Health ROI */}
                            <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-emerald-500/30">
                                <h3 className="text-lg font-bold text-emerald-600 dark:text-green-400 mb-4 flex items-center gap-2">
                                    <Heart className="w-5 h-5" />
                                    Estimated Health Savings
                                </h3>
                                <p className="text-3xl font-bold text-emerald-600 dark:text-green-400 mb-2">
                                    ₹{calculations.estimatedHealthSavings.toLocaleString()}/month
                                </p>
                                <p className="text-espresso/60 dark:text-ivory/60 text-sm">
                                    Based on reduced digestive issues, better immunity, and fewer
                                    doctor visits for a family of {familySize}.
                                </p>
                            </div>

                            {/* Net ROI */}
                            <div
                                className={`p-8 rounded-3xl border ${calculations.isNetPositive ? "border-emerald-500/30 bg-emerald-500/5" : "border-terracotta/20 bg-terracotta/5 dark:border-gold/30 dark:bg-gold/5"}`}
                            >
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-4 flex items-center gap-2">
                                    <Leaf className="w-5 h-5 text-terracotta dark:text-gold" />
                                    Net Monthly Impact
                                </h3>
                                <p
                                    className={`text-4xl font-bold ${calculations.isNetPositive ? "text-emerald-600 dark:text-green-400" : "text-terracotta dark:text-gold"}`}
                                >
                                    {calculations.netMonthlyCost <= calculations.currentCost
                                        ? "SAVE "
                                        : "+"}
                                    ₹
                                    {Math.abs(
                                        calculations.netMonthlyCost - calculations.currentCost
                                    ).toLocaleString()}
                                </p>
                                <p className="text-espresso/60 dark:text-ivory/60 mt-2">
                                    {calculations.isNetPositive
                                        ? "You're actually saving money when you factor in health benefits!"
                                        : "A small investment for pure, healthy milk for your family."}
                                </p>
                            </div>

                            {/* CTA */}
                            <Button
                                href="/subscription-hub"
                                size="lg"
                                className="w-full bg-espresso text-white dark:bg-gold dark:text-midnight hover:scale-105 transition-transform"
                            >
                                Start Your Subscription
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Disclaimer */}
            <Section className="bg-creme-dark/50 dark:bg-midnight-mid">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-espresso/40 dark:text-ivory/50 text-sm">
                        * Health savings are estimates based on typical improvements reported by
                        families switching to pure A2 milk. Actual results may vary. This calculator
                        is for informational purposes only and should not be considered medical
                        advice.
                    </p>
                </div>
            </Section>
        </main>
    );
}
