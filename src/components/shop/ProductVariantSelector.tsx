"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface ProductVariant {
    id: string;
    size: string;
    weight: string;
    price: number;
    originalPrice?: number;
    inStock: boolean;
    inventory?: number;
}

interface ProductVariantSelectorProps {
    variants: ProductVariant[];
    selectedVariant?: ProductVariant;
    onVariantChange?: (variant: ProductVariant) => void;
    displayStyle?: "dots" | "dropdown" | "cards";
}

export function ProductVariantSelector({
    variants,
    selectedVariant,
    onVariantChange,
    displayStyle = "cards",
}: ProductVariantSelectorProps) {
    const [selected, setSelected] = useState<ProductVariant>(
        selectedVariant || variants[0]
    );

    const handleSelect = (variant: ProductVariant) => {
        if (!variant.inStock) return;
        setSelected(variant);
        onVariantChange?.(variant);
    };

    if (displayStyle === "dropdown") {
        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-espresso dark:text-ivory mb-2">
                    Select Size
                </label>
                <select
                    value={selected.id}
                    onChange={(e) => {
                        const variant = variants.find((v) => v.id === e.target.value);
                        if (variant) handleSelect(variant);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-espresso/20 dark:border-white/20 bg-white dark:bg-midnight-mid text-espresso dark:text-ivory focus:outline-none focus:ring-2 focus:ring-terracotta dark:focus:ring-gold transition-all"
                >
                    {variants.map((variant) => (
                        <option
                            key={variant.id}
                            value={variant.id}
                            disabled={!variant.inStock}
                        >
                            {variant.size} - ₹{variant.price}
                            {!variant.inStock && " (Out of Stock)"}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (displayStyle === "dots") {
        return (
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-espresso/70 dark:text-ivory/70">
                    Size:
                </span>
                <div className="flex gap-2">
                    {variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => handleSelect(variant)}
                            disabled={!variant.inStock}
                            className={`w-3 h-3 rounded-full transition-all ${selected.id === variant.id
                                    ? "bg-terracotta dark:bg-gold scale-125 ring-2 ring-terracotta/30 dark:ring-gold/30"
                                    : variant.inStock
                                        ? "bg-espresso/20 dark:bg-white/20 hover:bg-espresso/40 dark:hover:bg-white/40"
                                        : "bg-espresso/10 dark:bg-white/10 cursor-not-allowed"
                                }`}
                            aria-label={`Select ${variant.size}`}
                        />
                    ))}
                </div>
                <span className="text-sm font-bold text-espresso dark:text-ivory">
                    {selected.size}
                </span>
            </div>
        );
    }

    // Default: Cards display
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-espresso dark:text-ivory">
                Select Size
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {variants.map((variant) => (
                    <motion.button
                        key={variant.id}
                        whileHover={variant.inStock ? { scale: 1.02 } : {}}
                        whileTap={variant.inStock ? { scale: 0.98 } : {}}
                        onClick={() => handleSelect(variant)}
                        disabled={!variant.inStock}
                        className={`relative p-4 rounded-2xl border-2 transition-all ${selected.id === variant.id
                                ? "border-terracotta dark:border-gold bg-terracotta/5 dark:bg-gold/5"
                                : variant.inStock
                                    ? "border-espresso/10 dark:border-white/10 bg-white dark:bg-midnight-mid hover:border-terracotta/30 dark:hover:border-gold/30"
                                    : "border-espresso/5 dark:border-white/5 bg-espresso/5 dark:bg-white/5 cursor-not-allowed opacity-50"
                            }`}
                    >
                        {selected.id === variant.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-terracotta dark:bg-gold rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                        )}
                        <div className="text-left space-y-1">
                            <div className="text-sm font-bold text-espresso dark:text-ivory">
                                {variant.size}
                            </div>
                            <div className="text-xs text-espresso/60 dark:text-ivory/60">
                                {variant.weight}
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-black text-terracotta dark:text-gold">
                                    ₹{variant.price}
                                </span>
                                {variant.originalPrice && (
                                    <span className="text-xs text-espresso/40 dark:text-ivory/40 line-through">
                                        ₹{variant.originalPrice}
                                    </span>
                                )}
                            </div>
                            {!variant.inStock && (
                                <div className="text-xs text-red-500 dark:text-red-400 font-semibold">
                                    Out of Stock
                                </div>
                            )}
                            {variant.inStock && variant.inventory && variant.inventory < 10 && (
                                <div className="text-xs text-orange-500 dark:text-orange-400">
                                    Only {variant.inventory} left
                                </div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
