"use client";

import { Check, ChevronDown, ChevronUp, Copy, Tag } from "lucide-react";
import { useState } from "react";

interface Offer {
    code: string;
    discount: string;
    condition?: string;
    autoApply?: boolean;
}

const AVAILABLE_OFFERS: Offer[] = [
    {
        code: "AMRIT10",
        discount: "Get Flat 10% OFF",
        autoApply: true,
    },
    {
        code: "AMRIT15",
        discount: "Get Flat 15% off",
        condition: "on Orders Above Rs.2499",
    },
    {
        code: "AMRIT20",
        discount: "Get Flat 20% off",
        condition: "on Orders Above Rs.4999",
    },
];

interface AvailableOffersProps {
    onApplyCoupon?: (code: string) => void;
}

export function AvailableOffers({ onApplyCoupon }: AvailableOffersProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);

            // If onApplyCoupon is provided, apply it automatically
            if (onApplyCoupon) {
                onApplyCoupon(code);
            }

            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="bg-white dark:bg-espresso border border-stone-200 dark:border-white/10 rounded-xl overflow-hidden">
            {/* Header - Accordion Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-gold" />
                    <span className="font-bold text-espresso dark:text-ivory">
                        Available Offers
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-stone-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400" />
                )}
            </button>

            {/* Offers List */}
            {isOpen && (
                <div className="border-t border-stone-100 dark:border-white/10">
                    {AVAILABLE_OFFERS.map((offer, index) => (
                        <div
                            key={offer.code}
                            className={`p-4 flex items-center justify-between gap-4 ${
                                index !== AVAILABLE_OFFERS.length - 1
                                    ? "border-b border-stone-100 dark:border-white/10"
                                    : ""
                            }`}
                        >
                            {/* Offer Details */}
                            <div className="flex-1">
                                <p className="font-bold text-sm text-espresso dark:text-ivory">
                                    {offer.discount}
                                </p>
                                {offer.condition ? (
                                    <p className="text-xs text-stone-500 dark:text-ivory/60 mt-0.5">
                                        {offer.condition}
                                    </p>
                                ) : offer.autoApply ? (
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                                        Auto-applies on checkout
                                    </p>
                                ) : null}
                            </div>

                            {/* Copy Code Button */}
                            <button
                                onClick={() => handleCopyCode(offer.code)}
                                className="flex items-center gap-2 px-3 py-1.5 border-2 border-dashed border-terracotta/50 dark:border-gold/50 rounded-lg text-terracotta dark:text-gold hover:bg-terracotta/5 dark:hover:bg-gold/5 transition-colors"
                            >
                                <span className="font-bold text-sm tracking-wide">
                                    {offer.code}
                                </span>
                                {copiedCode === offer.code ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
