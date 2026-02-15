"use client";

import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, Truck, Calendar } from "lucide-react";
import { useState } from "react";

interface MilkPlanSelectorProps {
    productId: string;
    productName: string;
    variant?: string;
    onSelectPlan: (planId: string, totalAmount: number) => void;
}

const MILK_PLANS = [
    {
        id: "one_time",
        label: "One-Time Buy",
        description: "Single delivery — try our milk",
        pricePerLitre: 149,
        deliveryCharge: 50,
        totalAmount: 199,
        duration: "1 delivery",
        icon: ShoppingBag,
        breakdown: "₹149 + ₹50 delivery",
    },
    {
        id: "trial_5day",
        label: "5-Day Trial",
        description: "Try for a week — prepaid",
        pricePerLitre: 100,
        deliveryCharge: 0,
        totalAmount: 500,
        duration: "5 days",
        icon: Truck,
        popular: true,
        breakdown: "₹100/L × 5 days",
    },
    {
        id: "monthly_30day",
        label: "30-Day Plan",
        description: "Full month — best value, prepaid",
        pricePerLitre: 100,
        deliveryCharge: 0,
        totalAmount: 3000,
        duration: "30 days",
        icon: Calendar,
        breakdown: "₹100/L × 30 days",
    },
];

export function SubscriptionPlanSelector({
    productId,
    productName,
    variant,
    onSelectPlan,
}: MilkPlanSelectorProps) {
    const [selectedPlan, setSelectedPlan] = useState<string>("trial_5day");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProceed = async () => {
        setIsProcessing(true);
        try {
            const plan = MILK_PLANS.find((p) => p.id === selectedPlan);
            if (plan) {
                await onSelectPlan(plan.id, plan.totalAmount);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-glass-border rounded-2xl p-6">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-terracotta dark:text-gold" />
                    <h3 className="text-xl font-serif font-bold text-espresso dark:text-ivory">
                        Choose Your Plan
                    </h3>
                </div>
                <p className="text-sm text-espresso/70 dark:text-ivory/70">
                    All plans are prepaid. Pay once, get daily delivery.
                </p>
            </div>

            <div className="space-y-3 mb-6">
                {MILK_PLANS.map((plan) => (
                    <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            selectedPlan === plan.id
                                ? "border-terracotta dark:border-gold bg-terracotta/5 dark:bg-gold/5"
                                : "border-creme-dark dark:border-glass-border hover:border-terracotta/50 dark:hover:border-gold/50"
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <plan.icon className="w-4 h-4 text-terracotta dark:text-gold" />
                                    <p className="font-semibold text-espresso dark:text-ivory">
                                        {plan.label}
                                    </p>
                                    {plan.popular && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-terracotta dark:bg-gold text-white dark:text-midnight px-2 py-0.5 rounded-full">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-espresso/60 dark:text-ivory/60">
                                    {plan.description}
                                </p>
                                <p className="text-xs text-espresso/50 dark:text-ivory/50 mt-1">
                                    {plan.breakdown}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <p className="text-lg font-bold text-terracotta dark:text-gold">
                                    ₹{plan.totalAmount}
                                </p>
                                <p className="text-xs text-espresso/50 dark:text-ivory/50">
                                    {plan.duration}
                                </p>
                            </div>
                        </div>
                        {selectedPlan === plan.id && (
                            <div className="mt-2 flex justify-end">
                                <Check className="w-5 h-5 text-terracotta dark:text-gold" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-terracotta/10 dark:bg-gold/10 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-terracotta dark:text-gold mb-1">
                    ₹{MILK_PLANS.find((p) => p.id === selectedPlan)?.totalAmount} — Prepaid
                </p>
                <p className="text-xs text-espresso/70 dark:text-ivory/70">
                    One-time payment via CCAvenue. No recurring charges.
                </p>
            </div>

            <Button
                onClick={handleProceed}
                disabled={isProcessing}
                className="w-full bg-terracotta dark:bg-gold text-white dark:text-midnight hover:bg-terracotta-dark dark:hover:bg-gold/90"
            >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {isProcessing
                    ? "Processing..."
                    : `Pay ₹${MILK_PLANS.find((p) => p.id === selectedPlan)?.totalAmount}`}
            </Button>

            <p className="text-xs text-center text-espresso/50 dark:text-ivory/50 mt-3">
                Secure payment via CCAvenue • No recurring charges
            </p>
        </div>
    );
}
