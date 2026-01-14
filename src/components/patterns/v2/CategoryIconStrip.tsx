"use client";

import { categories } from "@/lib/products";
import { Droplet, Hexagon, LayoutGrid, Milk, Package, Utensils, Wheat } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
    LayoutGrid,
    Utensils,
    Droplet,
    Milk,
    Wheat,
    Hexagon,
    Package,
};

export function CategoryIconStrip() {
    return (
        <div className="w-full bg-white dark:bg-midnight-light border-b border-espresso/5 dark:border-white/5 py-8 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
            <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
                <div className="flex justify-between md:justify-center gap-8 md:gap-16 min-w-max">
                    {categories.map((cat) => {
                        const Icon = iconMap[cat.icon];
                        return (
                            <Link
                                key={cat.id}
                                href={
                                    cat.id === "all" ? "/products" : `/products?category=${cat.id}`
                                }
                                className="group flex flex-col items-center gap-3 min-w-[80px] cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full bg-creme-dark dark:bg-midnight-mid border border-espresso/10 dark:border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-terracotta group-hover:border-terracotta dark:group-hover:bg-gold dark:group-hover:text-midnight group-hover:scale-110 shadow-sm">
                                    {Icon && (
                                        <Icon
                                            strokeWidth={1.5}
                                            className="w-7 h-7 text-espresso dark:text-ivory group-hover:text-white dark:group-hover:text-midnight transition-colors"
                                        />
                                    )}
                                </div>
                                <span className="text-sm font-medium text-espresso/80 dark:text-ivory/80 group-hover:text-terracotta dark:group-hover:text-gold transition-colors">
                                    {cat.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
