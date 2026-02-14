"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Check, Repeat } from "lucide-react";
import { useState } from "react";

interface SubscriptionPlanSelectorProps {
    productId: string;
    productName: string;
    variant?: string;
    price: number;
    onSubscribe: (frequency: string) => void;
}

const FREQUENCIES = [
    { id: "daily", label: "Daily delivery", description: "Fresh every morning", popular: true },
    { id: "every_2_days", label: "Every 2 days", description: "Perfect for couples" },
    { id: "weekly", label: "Weekly", description: "Once a week delivery" },
    { id: "bi_weekly", label: "Bi-weekly", description: "Every 2 weeks" },
    { id: "monthly", label: "Monthly", description: "Monthly subscription" },
];

export function SubscriptionPlanSelector({
    productId,
    productName,
    variant,
    price,
    onSubscribe,
}: SubscriptionPlanSelectorProps) {
    const [selectedFrequency, setSelectedFrequency] = useState<string>("daily");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubscribe = async () => {
        setIsProcessing(true);
        try {
            await onSubscribe(selectedFrequency);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-glass-border rounded-2xl p-6">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Repeat className="w-5 h-5 text-terracotta dark:text-gold" />
                    <h3 className="text-xl font-serif font-bold text-espresso dark:text-ivory">
                        Subscribe & Save
                    </h3>
                </div>
                <p className="text-sm text-espresso/70 dark:text-ivory/70">
                    Never run out. Cancel anytime.
                </p>
            </div>

            <div className="space-y-3 mb-6">
                {FREQUENCIES.map((freq) => (
                    <button
                        key={freq.id}
                        onClick={() => setSelectedFrequency(freq.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${selectedFrequency === freq.id
                                ? "border-terracotta dark:border-gold bg-terracotta/5 dark:bg-gold/5"
                                : "border-creme-dark dark:border-glass-border hover:border-terracotta/50 dark:hover:border-gold/50"
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold text-espresso dark:text-ivory">
                                        {freq.label}
                                    </p>
                                    {freq.popular && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-terracotta dark:bg-gold text-white dark:text-midnight px-2 py-0.5 rounded-full">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-espresso/60 dark:text-ivory/60">
                                    {freq.description}
                                </p>
                            </div>
                            {selectedFrequency === freq.id && (
                                <Check className="w-5 h-5 text-terracotta dark:text-gold flex-shrink-0" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="bg-terracotta/10 dark:bg-gold/10 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-terracotta dark:text-gold mb-1">
                    ₹{price} per delivery
                </p>
                <p className="text-xs text-espresso/70 dark:text-ivory/70">
                    Pause or cancel anytime from your account dashboard
                </p>
            </div>

            <Button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full bg-terracotta dark:bg-gold text-white dark:text-midnight hover:bg-terracotta-dark dark:hover:bg-gold/90"
            >
                <Calendar className="w-4 h-4 mr-2" />
                {isProcessing ? "Processing..." : "Subscribe Now"}
            </Button>

            <p className="text-xs text-center text-espresso/50 dark:text-ivory/50 mt-3">
                Secure payment via CCAvenue
            </p>
        </div>
    );
}
