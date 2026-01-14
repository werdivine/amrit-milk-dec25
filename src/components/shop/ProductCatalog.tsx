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
            id: "vedic-essentials",
            name: "Vedic Essentials",
            count: initialProducts.filter((p) => ["Ghee", "Oils", "Honey"].includes(p.category))
                .length,
        },
        {
            id: "Oils",
            name: "Wood Pressed Oils",
            count: initialProducts.filter((p) => p.category === "Oils").length,
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
            name: "Stone Ground Atta",
            count: initialProducts.filter((p) => p.category === "Atta").length,
        },
        {
            id: "Rice",
            name: "Heritage Rice",
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

    const filteredProducts =
        activeCategory === "all"
            ? initialProducts
            : activeCategory === "vedic-essentials"
              ? initialProducts.filter((p) => ["Ghee", "Oils", "Honey"].includes(p.category))
              : initialProducts.filter((p) => p.category === activeCategory);

    return (
        <>
            {/* Category Filters - Sticky */}
            <section className="sticky top-24 z-40 bg-theme-secondary/95 backdrop-blur-xl border-y border-theme-light py-6 shadow-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 md:justify-center flex-nowrap md:flex-wrap no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth snap-x">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex-shrink-0 snap-center px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                                    activeCategory === cat.id
                                        ? "bg-terracotta dark:bg-gold text-white dark:text-midnight shadow-[0_0_20px_rgba(199,91,57,0.4)] dark:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                        : "bg-transparent text-terracotta dark:text-gold border-2 border-terracotta dark:border-gold hover:bg-terracotta/10 dark:hover:bg-gold/10"
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
