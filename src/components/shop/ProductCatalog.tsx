"use client";

import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/ui/section";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface ProductCatalogProps {
    initialProducts: any[];
}

function ProductCatalogContent({ initialProducts }: ProductCatalogProps) {
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "All Products", count: initialProducts.length },
        {
            id: "Combos",
            name: "Combo Packs",
            count: initialProducts.filter((p) => p.category === "Combos").length,
        },
        {
            id: "vedic-essentials",
            name: "Ghee & Vedic Essentials",
            count: initialProducts.filter((p) => ["Ghee", "Honey"].includes(p.category)).length,
        },
        {
            id: "Cold-Pressed Oils",
            name: "Cold-Pressed Oils",
            count: initialProducts.filter((p) => p.category === "Cold-Pressed Oils").length,
        },
        {
            id: "Essential Oils",
            name: "Essential Oils",
            count: initialProducts.filter((p) => p.category === "Essential Oils").length,
        },
        {
            id: "Honey",
            name: "Raw Honey",
            count: initialProducts.filter((p) => p.category === "Honey").length,
        },
        {
            id: "Dairy",
            name: "A2 Dairy",
            count: initialProducts.filter((p) => p.category === "Dairy").length,
        },
        {
            id: "Atta",
            name: "Wheats & Flours",
            count: initialProducts.filter((p) => p.category === "Atta").length,
        },
        {
            id: "Rice",
            name: "Rice & Grains",
            count: initialProducts.filter((p) => p.category === "Rice").length,
        },
        {
            id: "Sweets",
            name: "Sweets & Jaggery",
            count: initialProducts.filter((p) => p.category === "Sweets").length,
        },
        {
            id: "Wellness",
            name: "Wellness",
            count: initialProducts.filter((p) => p.category === "Wellness").length,
        },
        {
            id: "Gau Seva",
            name: "Gau Seva",
            count: initialProducts.filter((p) => p.category === "Gau Seva").length,
        },
        {
            id: "Other",
            name: "Other",
            count: initialProducts.filter((p) => p.category === "Other").length,
        },
    ];

    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) {
            // Find matched category ignoring case
            const matched = categories.find((c) => c.id.toLowerCase() === cat.toLowerCase());
            if (matched) {
                setActiveCategory(matched.id);
            }
        }
    }, [searchParams]);

    // Sort products: Combos first, then rest
    const sortedProducts = [...initialProducts].sort((a, b) => {
        if (a.category === "Combos" && b.category !== "Combos") return -1;
        if (a.category !== "Combos" && b.category === "Combos") return 1;
        return 0;
    });

    const filteredProducts =
        activeCategory === "all"
            ? sortedProducts
            : activeCategory === "vedic-essentials"
              ? sortedProducts.filter((p) => ["Ghee", "Honey"].includes(p.category))
              : sortedProducts.filter((p) => p.category === activeCategory);

    return (
        <>
            {/* Category Filters - Sticky - Optimized for Compact Single Line */}
            <section className="sticky top-24 z-40 bg-theme-secondary/95 backdrop-blur-xl border-y border-theme-light py-4 shadow-sm md:py-4">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex gap-3 overflow-x-auto pb-2 md:pb-2 md:justify-start flex-nowrap no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x items-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex-shrink-0 snap-center px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border ${
                                    activeCategory === cat.id
                                        ? "bg-terracotta dark:bg-gold text-white dark:text-midnight border-terracotta dark:border-gold shadow-md"
                                        : "bg-transparent text-terracotta dark:text-gold border-terracotta/30 dark:border-gold/30 hover:bg-terracotta/5 dark:hover:bg-gold/5"
                                }`}
                            >
                                {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((p, index) => (
                        <div
                            key={p.slug}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <ProductCard {...p} />
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-theme-muted text-xl">
                            No products found in this category.
                        </p>
                    </div>
                )}
            </Section>
        </>
    );
}

export function ProductCatalog(props: ProductCatalogProps) {
    return (
        <Suspense fallback={<div className="py-20 text-center">Loading catalog...</div>}>
            <ProductCatalogContent {...props} />
        </Suspense>
    );
}
