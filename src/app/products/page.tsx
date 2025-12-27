"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/products";

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "All Products", count: products.length },
        { id: "Dairy", name: "Dairy", count: products.filter(p => p.category === "Dairy").length },
        { id: "Oils", name: "Oils", count: products.filter(p => p.category === "Oils").length },
        { id: "Other", name: "Superfoods", count: products.filter(p => p.category === "Other").length },
    ];

    const filteredProducts = activeCategory === "all"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <main className="bg-midnight min-h-screen">
            {/* Catalog Hero */}
            <section className="pt-32 pb-16 text-center bg-midnight relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <span className="inline-block px-8 py-3 bg-midnight/80 backdrop-blur-md border border-gold rounded-full text-gold font-bold tracking-[0.25em] text-xs uppercase shadow-2xl mb-6">
                        The Collection
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl font-black mb-6 leading-tight">
                        Pure by <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-gold to-ivory">Nature</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-ivory/60 max-w-2xl mx-auto">
                        21 carefully curated products. From farm to your table in 4 hours.
                    </p>
                </div>
            </section>

            {/* Category Filters - Sticky */}
            <section className="sticky top-20 z-40 bg-midnight-mid/95 backdrop-blur-xl border-y border-glass-border py-6 shadow-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-4 justify-center flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${activeCategory === cat.id
                                        ? "bg-gold text-midnight shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                        : "bg-transparent text-gold border-2 border-gold hover:bg-gold/10"
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
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ProductCard {...p} />
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-ivory/60 text-xl">No products found in this category.</p>
                    </div>
                )}
            </Section>
        </main>
    );
}
