"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const subTabs = ["Desi Cow", "Buffalo"] as const;

export function ProductFocusSection() {
    const [activeSubTab, setActiveSubTab] = useState<typeof subTabs[number]>("Desi Cow");

    // Filter Ghee products specifically
    const gheeProducts = products.filter(p => p.category === "Ghee");

    // Further filter based on focus sub-tab
    const displayedProducts = activeSubTab === "Desi Cow"
        ? gheeProducts.filter(p => p.title.includes("Desi Cow"))
        : gheeProducts.filter(p => p.title.includes("Buffalo"));

    return (
        <Section className="py-20 bg-creme-light dark:bg-midnight-mid border-y border-espresso/5 dark:border-white/5 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-terracotta rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <span className="text-terracotta dark:text-gold font-bold tracking-[0.2em] text-sm uppercase mb-2 block">
                        Product in Focus
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        Explore Our Cold-Pressed Ghee
                    </h2>

                    {/* Sub Tabs */}
                    <div className="flex justify-center gap-8 mb-8">
                        {subTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSubTab(tab)}
                                className={cn(
                                    "flex flex-col items-center gap-2 group",
                                    activeSubTab === tab ? "opacity-100" : "opacity-50 hover:opacity-100"
                                )}
                            >
                                <div className={cn( // Placeholder for simplistic icon visual
                                    "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                    activeSubTab === tab
                                        ? "border-terracotta bg-terracotta text-white dark:border-gold dark:bg-gold dark:text-midnight"
                                        : "border-espresso/20 dark:border-white/20"
                                )}>
                                    {/* Simple Icon placeholder */}
                                    {tab === "Desi Cow" ? "🐄" : "🐃"}
                                </div>
                                <span className={cn(
                                    "text-sm font-bold uppercase tracking-wider transition-colors",
                                    activeSubTab === tab ? "text-espresso dark:text-gold" : "text-espresso/60 dark:text-ivory/60"
                                )}>
                                    {tab}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
                    {displayedProducts.length > 0 ? displayedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            regularPrice={product.regularPrice}
                            image={product.image}
                            description={product.description}
                            slug={product.slug}
                            category={product.category}
                            badge={product.badge}
                            subscription={product.subscription}
                            featured={product.featured}
                        />
                    )) : (
                        <div className="col-span-full text-center py-10 opacity-60">
                            More {activeSubTab} products coming soon.
                        </div>
                    )}
                </div>

                <div className="text-center mt-12">
                    <Button href="/products" variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white dark:border-gold dark:text-gold dark:hover:bg-gold dark:hover:text-midnight">
                        View All Ghee <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Section>
    );
}
