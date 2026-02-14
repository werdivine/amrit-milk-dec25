"use client";

import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

interface ProductCollectionProps {
    category?: string;
    items?: any[];
    title: string;
    subtitle: string;
    description?: string;
    backgroundTheme?: "light" | "dark" | "creme";
    viewAllLink?: string;
}

export function ProductCollection({ category, items, title, subtitle, description, backgroundTheme = "creme", viewAllLink = "/products" }: ProductCollectionProps) {
    // Use provided items or filter by category - SHOW ALL
    const filteredProducts = items
        ? items
        : products.filter(p => p.category?.toLowerCase() === category?.toLowerCase());

    return (
        <Section className={cn(
            "py-20 transition-colors duration-500",
            backgroundTheme === "creme" && "bg-creme dark:bg-midnight",
            backgroundTheme === "light" && "bg-white dark:bg-midnight-light",
            backgroundTheme === "dark" && "bg-espresso  dark:bg-black"
        )}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <SectionHeader
                        subtitle={subtitle}
                        title={title}
                        description={description}
                        align="left"
                        className="mb-0 max-w-2xl"
                        lightMode={backgroundTheme === "dark"}
                    />
                    <div className="mb-2">
                        <Button
                            href={viewAllLink}
                            variant="outline"
                            className={cn(
                                "group border-opacity-50",
                                backgroundTheme === "dark"
                                    ? "border-white text-white hover:bg-white hover:text-black"
                                    : "border-espresso dark:border-white text-espresso dark:text-white hover:bg-espresso hover:text-white dark:hover:bg-white dark:hover:text-midnight"
                            )}
                        >
                            View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            regularPrice={product.regularPrice}
                            image={product.image}
                            description={product.description || ""}
                            slug={product.slug}
                            category={product.category}
                            badge={product.badge}
                            subscription={product.subscription}
                            featured={product.featured}
                            variants={product.variants}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
