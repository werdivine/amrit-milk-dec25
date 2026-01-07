"use client";

import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
interface FeaturedCollectionProps {
    title: string;
    subtitle?: string;
    category?: string;
    featuredOnly?: boolean;
    limit?: number;
    description?: string;
    lightBg?: boolean;
    products: any[];
}

export function FeaturedCollection({ title, subtitle, category, featuredOnly, limit = 4, description, lightBg, products }: FeaturedCollectionProps) {
    let filteredProducts = products;

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (featuredOnly) {
        filteredProducts = filteredProducts.filter(p => p.featured);
    }

    const displayProducts = filteredProducts.slice(0, limit);

    return (
        <Section className={`${lightBg ? 'bg-creme-light dark:bg-midnight-mid' : 'bg-white dark:bg-midnight'} border-t border-creme-dark dark:border-glass-border`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                    {subtitle && (
                        <span className="text-terracotta dark:text-gold font-bold uppercase tracking-widest text-xs mb-3 block">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-espresso/60 dark:text-ivory/60 text-lg">
                            {description}
                        </p>
                    )}
                </div>
                <Button href={`/products?category=${category || 'all'}`} variant="outline" className="group">
                    Explore Collection <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayProducts.map((p, i) => (
                    <motion.div
                        key={p.slug}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <ProductCard {...p} />
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
