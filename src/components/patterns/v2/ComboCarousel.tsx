"use client";

import { useRef } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ComboCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const comboProducts = products.filter(p => p.category === "Combos");

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <Section className="py-20 bg-white dark:bg-midnight border-t border-espresso/5 dark:border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-terracotta dark:text-gold font-bold tracking-[0.2em] text-sm uppercase mb-2 block">
                            Wellness Bundles
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                            Healthy Combo Packs
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 rounded-full border border-espresso/10 hover:bg-espresso hover:text-white dark:border-white/10 dark:hover:bg-ivory dark:hover:text-midnight transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 rounded-full border border-espresso/10 hover:bg-espresso hover:text-white dark:border-white/10 dark:hover:bg-ivory dark:hover:text-midnight transition-all"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Area */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto no-scrollbar pb-10 -mx-4 px-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {comboProducts.map((product) => (
                        <div key={product.id} className="min-w-[300px] md:min-w-[350px] snap-center">
                            <ProductCard
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
                        </div>
                    ))}

                    {/* View All Card */}
                    <div className="min-w-[250px] flex items-center justify-center snap-center">
                        <Button href="/combos" variant="outline" className="h-full w-full border-dashed border-2 flex flex-col gap-4 border-espresso/20 dark:border-white/20 text-espresso dark:text-ivory hover:bg-espresso/5">
                            <span className="font-serif text-2xl">View All</span>
                            <ArrowRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
