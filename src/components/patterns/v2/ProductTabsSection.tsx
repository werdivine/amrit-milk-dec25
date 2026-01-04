"use client";

import { useState } from "react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function ProductTabsSection() {
    const [activeTab, setActiveTab] = useState("all");

    // Filter logic
    const filteredProducts = activeTab === "all"
        ? products
        : products.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

    const getCategoryLabel = (id: string) => categories.find(c => c.id === id)?.label || "Products";

    return (
        <Section className="py-20 bg-creme dark:bg-midnight transition-colors duration-500">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 space-y-4">
                    <span className="inline-block px-4 py-1 bg-terracotta/10 dark:bg-gold/10 text-terracotta dark:text-gold rounded-full text-xs font-bold uppercase tracking-widest">
                        Handcrafted Purity
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                        Our Collections
                    </h2>
                    <p className="text-lg text-espresso/60 dark:text-ivory/60 max-w-2xl mx-auto">
                        Explore our range of A2 dairy, wood-pressed oils, and natural superfoods.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={cn(
                                "px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 border",
                                activeTab === cat.id
                                    ? "bg-espresso text-white border-espresso dark:bg-gold dark:text-midnight dark:border-gold shadow-lg scale-105"
                                    : "bg-white dark:bg-midnight-light text-espresso/80 dark:text-ivory/80 border-espresso/10 dark:border-white/10 hover:border-terracotta dark:hover:border-gold hover:text-terracotta dark:hover:text-gold"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={`₹${product.price}`}
                            regularPrice={product.originalPrice ? `₹${product.originalPrice}` : undefined}
                            image={product.image}
                            description={product.subtitle} // Using subtitle as short desc
                            slug={product.id} // Simple slug
                            category={product.category}
                            badge={product.tags?.[0]} // Show first tag as badge
                            featured={product.rating ? product.rating > 4.8 : false}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
