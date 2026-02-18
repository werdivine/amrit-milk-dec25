"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { Check, ShoppingCart, Info, Plus, Minus } from "lucide-react";
import Image from "next/image";

interface ComboOption {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number;
    description: string;
}

const GHEE_OPTIONS: ComboOption[] = [
    {
        id: "ghee-cow-500ml",
        category: "Ghee",
        title: "A2 Desi Cow Ghee (500ml)",
        image: "/assets/img/products/amrit_ghee_premium.png",
        price: 1350,
        description: "Golden A2 ghee from Gir cows.",
    },
    {
        id: "ghee-cow-1kg",
        category: "Ghee",
        title: "A2 Desi Cow Ghee (1L)",
        image: "/assets/img/products/amrit_ghee_premium.png",
        price: 2500,
        description: "Best value pack.",
    },
];

const OIL_OPTIONS: ComboOption[] = [
    {
        id: "oil-yellow-mustard-1l",
        category: "Oil",
        title: "Yellow Mustard Oil (1L)",
        image: "/assets/img/products/yellow_mustard_oil.png",
        price: 380,
        description: "Cold-pressed Kacchi Ghani.",
    },
    {
        id: "oil-black-mustard-1l",
        category: "Oil",
        title: "Black Mustard Oil (1L)",
        image: "/assets/img/products/black_mustard_oil.png",
        price: 350,
        description: "Strong & pungent.",
    },
    {
        id: "oil-sesame-1l",
        category: "Oil",
        title: "Sesame (Til) Oil (1L)",
        image: "/assets/img/products/sesame_oil.png",
        price: 800,
        description: "Perfect for massage & cooking.",
    },
    {
        id: "oil-coconut-1l",
        category: "Oil",
        title: "Coconut Oil (1L)",
        image: "/assets/img/products/coconut_oil.png",
        price: 1000,
        description: "Pure virgin coconut oil.",
    },
];

const HONEY_OPTIONS: ComboOption[] = [
    {
        id: "honey-multiflora-1kg",
        category: "Honey",
        title: "Multiflora Honey (1kg)",
        image: "/assets/img/products/amrit_honey_premium_v7.png",
        price: 1200,
        description: "Wild forest honey.",
    },
    {
        id: "honey-jamun-1kg",
        category: "Honey",
        title: "Jamun Honey (1kg)",
        image: "/assets/img/products/amrit_jamun_honey_v3.png",
        price: 1200,
        description: "Diabetic friendly.",
    },
    {
        id: "honey-multiflora-300gm",
        category: "Honey",
        title: "Multiflora Honey (300g)",
        image: "/assets/img/products/amrit_honey_premium_v7.png",
        price: 400,
        description: "Trial pack.",
    },
];

const GRAIN_OPTIONS: ComboOption[] = [
    {
        id: "atta-wheat-1kg",
        category: "Grains",
        title: "Whole Wheat Atta (1kg)",
        image: "/assets/img/products/amrit_atta_wheat_1kg.png",
        price: 60,
        description: "Stone-ground.",
    },
    {
        id: "rice-basmati-1kg",
        category: "Grains",
        title: "Premium Basmati Rice (1kg)",
        image: "/assets/img/products/amrit_rice_basmati_1kg.png",
        price: 160,
        description: "Aged long grain.",
    },
    {
        id: "dal-toor-1kg",
        category: "Grains",
        title: "Toor Dal (1kg)",
        image: "/assets/img/products/amrit_dal_toor.jpg",
        price: 180,
        description: "Unpolished farm fresh.",
    },
    {
        id: "dal-chana-1kg",
        category: "Grains",
        title: "Chana Dal (1kg)",
        image: "/assets/img/products/amrit_dal_chana.jpg",
        price: 120,
        description: "Rich in protein.",
    },
];

const JAGGERY_OPTIONS: ComboOption[] = [
    {
        id: "jaggery-powder-1kg",
        category: "Sweetener",
        title: "Organic Jaggery Powder (1kg)",
        image: "/assets/img/products/premium_jaggery_bites.png",
        price: 120,
        description: "Chemical-free sweetener.",
    },
    {
        id: "jaggery-block-1kg",
        category: "Sweetener",
        title: "Organic Jaggery Block (1kg)",
        image: "/assets/img/products/premium_jaggery_bites.png",
        price: 100,
        description: "Traditional gud.",
    },
];

const SIRKA_OPTIONS: ComboOption[] = [
    {
        id: "sirka-sugarcane-500ml",
        category: "Vinegar",
        title: "Sugarcane Vinegar (Sirka) (500ml)",
        image: "/assets/img/products/sirka.png", // Placeholder
        price: 150,
        description: "Natural digestive aid.",
    },
];

// Add dummy images for missing ones if needed in products.ts later
// For now we use placeholders or existing images

export function ComboBuilder({ product }: { product: any }) {
    const { addToCart } = useCart();

    // State now holds arrays of selected options
    const [selections, setSelections] = useState<{
        ghee: ComboOption[];
        oil: ComboOption[];
        honey: ComboOption[];
        grain: ComboOption[];
        jaggery: ComboOption[];
        sirka: ComboOption[];
    }>({
        ghee: [GHEE_OPTIONS[0]],
        oil: [OIL_OPTIONS[0]],
        honey: [HONEY_OPTIONS[0]],
        grain: [GRAIN_OPTIONS[0]],
        jaggery: [], // Optional
        sirka: [], // Optional
    });

    const [isAdded, setIsAdded] = useState(false);

    const toggleSelection = (category: keyof typeof selections, item: ComboOption) => {
        setSelections((prev) => {
            const currentSelections = prev[category];
            const isSelected = currentSelections.some((i) => i.id === item.id);

            let newSelections;
            if (isSelected) {
                // Remove item
                newSelections = currentSelections.filter((i) => i.id !== item.id);
            } else {
                // Add item
                newSelections = [...currentSelections, item];
            }

            // Enforce at least one selection for mandatory categories (unless we want to allow deselecting all?)
            // Requirement says "USER CAN SELECT MULTIPLE PRODUCTS", implying they can also just select 1.
            // But for mandatory categories, we usually want at least 1.
            // However, typical multi-select UX allows deselecting all.
            // For now, let's allow empty for flexibility, but `isFullBundle` check will handle the "complete" logic.

            // Actually, for better UX on mandatory fields, if they try to deselect the *last* item, maybe we should prevent it?
            // Or just let them empty it and the bundle validation handles it. Let's stick to consistent toggle logic.

            return {
                ...prev,
                [category]: newSelections,
            };
        });
    };

    // Calculate total price
    const totalPrice = Object.values(selections)
        .flat()
        .reduce((sum, item) => sum + item.price, 0);

    // Calculate discount (Bundle discount logic: 10% off if at least one item from EACH mandatory category is selected)
    const isFullBundle =
        selections.ghee.length > 0 &&
        selections.oil.length > 0 &&
        selections.honey.length > 0 &&
        selections.grain.length > 0;
    // jaggery and sirka are optional

    const discount = isFullBundle ? Math.round(totalPrice * 0.1) : 0;
    const finalPrice = totalPrice - discount;

    const handleAddToCart = () => {
        const selectedItems = Object.values(selections).flat();

        if (selectedItems.length === 0) return; // Don't add empty

        // Create a summary description
        const description = Object.entries(selections)
            .filter(([_, items]) => items.length > 0)
            .map(([key, items]) => {
                const categoryTitle = key.charAt(0).toUpperCase() + key.slice(1);
                const itemTitles = items.map((i) => i.title).join(", ");
                return `${categoryTitle}: ${itemTitles}`;
            })
            .join(" | ");

        addToCart({
            id: `panchamrit-combo-${Date.now()}`,
            title: "Panchamrit Custom Combo",
            price: String(finalPrice),
            image: product.image,
            category: "Combos",
            description: description,
            slug: product.slug,
            sku: "COMBO-PANCHAMRIT",
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const renderSection = (
        title: string,
        category: keyof typeof selections,
        options: ComboOption[],
        optional = false
    ) => {
        const selectedItems = selections[category];
        const selectedTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

        return (
            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-xl text-theme-primary flex items-center gap-2">
                        {title}
                        {optional && (
                            <span className="text-sm font-normal text-theme-muted bg-theme-elevated px-2 py-0.5 rounded-full">
                                Optional
                            </span>
                        )}
                        {!optional && selectedItems.length === 0 && (
                            <span className="text-xs text-red-500 font-normal">* Required</span>
                        )}
                    </h3>
                    {selectedTotal > 0 && (
                        <span className="text-terracotta dark:text-gold font-bold">
                            + ₹{selectedTotal}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {options.map((option) => {
                        const isSelected = selectedItems.some((i) => i.id === option.id);
                        return (
                            <div
                                key={option.id}
                                onClick={() => toggleSelection(category, option)}
                                className={`
                                    relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                                    flex items-start gap-4 overflow-hidden group
                                    ${
                                        isSelected
                                            ? "border-terracotta dark:border-gold bg-terracotta/5 dark:bg-gold/5 shadow-md"
                                            : "border-theme-light hover:border-terracotta/50 dark:hover:border-gold/50 bg-white dark:bg-white/5"
                                    }
                                `}
                            >
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                                    <Image
                                        src={option.image}
                                        alt={option.title}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4
                                        className={`font-bold text-sm mb-1 ${isSelected ? "text-terracotta dark:text-gold" : "text-theme-primary"}`}
                                    >
                                        {option.title}
                                    </h4>
                                    <p className="text-xs text-theme-secondary line-clamp-2">
                                        {option.description}
                                    </p>
                                    <p className="text-sm font-bold mt-2 text-theme-primary">
                                        ₹{option.price}
                                    </p>
                                </div>

                                {/* Selection Indicator */}
                                <div
                                    className={`
                                    absolute top-3 right-3 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                                    ${
                                        isSelected
                                            ? "bg-terracotta dark:bg-gold border-terracotta dark:border-gold text-white dark:text-midnight"
                                            : "border-theme-light text-transparent"
                                    }
                                `}
                                >
                                    <Check className="w-4 h-4" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-theme-secondary/5 rounded-2xl p-6 md:p-8 border border-theme-light">
            <div className="mb-8 p-4 bg-terracotta/10 dark:bg-gold/10 rounded-xl border border-terracotta/20 dark:border-gold/20">
                <h3 className="flex items-center gap-2 font-bold text-terracotta dark:text-gold mb-2">
                    <Info className="w-5 h-5" />
                    Customise Your Panchamrit
                </h3>
                <p className="text-sm text-theme-secondary">
                    Select your items to build your perfect wellness bundle.
                    <br />
                    <span className="text-xs mt-1 inline-block opacity-80">
                        Tip: You can select multiple items in each category!
                    </span>
                    {isFullBundle && (
                        <span className="font-bold text-green-600 block mt-1">
                            Full bundle discount (10%) applied!
                        </span>
                    )}
                </p>
            </div>

            {renderSection("1. Choose Your Ghee", "ghee", GHEE_OPTIONS)}
            {renderSection("2. Choose Your Cooking Oil", "oil", OIL_OPTIONS)}
            {renderSection("3. Choose Your Honey", "honey", HONEY_OPTIONS)}
            {renderSection("4. Choose Your Grain/Dal", "grain", GRAIN_OPTIONS)}

            <div className="my-8 h-px bg-theme-light w-full"></div>
            <h3 className="font-serif font-bold text-xl text-theme-primary mb-6">Add Extras</h3>

            {renderSection("Add Jaggery (Gud)", "jaggery", JAGGERY_OPTIONS, true)}
            {renderSection("Add Vinegar (Sirka)", "sirka", SIRKA_OPTIONS, true)}

            {/* Sticky/Fixed Bottom Summary for Mobile, or inline for Desktop */}
            <div className="mt-8 pt-6 border-t border-theme-light sticky bottom-0 bg-white dark:bg-midnight shadow-lg md:shadow-none p-4 -mx-4 md:mx-0 md:bg-transparent rounded-t-2xl md:rounded-none z-20">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <div className="flex-1">
                            <p className="text-sm text-theme-secondary mb-1">Total Bundle Price</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-theme-primary">
                                    ₹{finalPrice}
                                </span>
                                {discount > 0 && (
                                    <span className="text-sm line-through text-theme-muted">
                                        ₹{totalPrice}
                                    </span>
                                )}
                            </div>
                            {discount > 0 && (
                                <p className="text-xs text-green-600 font-bold mb-1">
                                    You save ₹{discount}
                                </p>
                            )}
                            {!isFullBundle && (
                                <p className="text-xs text-terracotta dark:text-gold">
                                    Select at least one option from first 4 categories for 10%
                                    discount
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        size="lg"
                        className={`w-full text-lg font-bold py-6 ${isAdded ? "bg-green-600 hover:bg-green-700" : ""}`}
                        disabled={totalPrice === 0}
                    >
                        {isAdded ? (
                            <>
                                <Check className="mr-2 h-5 w-5" /> Added to Cart
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add Bundle to Cart
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
