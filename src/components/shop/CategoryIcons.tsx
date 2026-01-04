"use client";

import { Milk, Droplets, Sprout, Heart, Sparkles, Zap, Candy, Boxes, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
    { id: "Dairy", name: "Dairy", icon: Milk, color: "text-blue-500" },
    { id: "Oils", name: "Oils", icon: Droplets, color: "text-amber-600" },
    { id: "Honey", name: "Honey", icon: Zap, color: "text-yellow-500" },
    { id: "Atta", name: "Atta", icon: Sprout, color: "text-emerald-600" },
    { id: "Rice", name: "Rice", icon: Boxes, color: "text-orange-500" },
    { id: "Sweets", name: "Sweets", icon: Candy, color: "text-pink-500" },
    { id: "Wellness", name: "Wellness", icon: Sparkles, color: "text-purple-500" },
    { id: "Gau Seva", name: "Gau Seva", icon: Heart, color: "text-red-500" },
];

export function CategoryIcons() {
    return (
        <div className="w-full py-12 bg-white dark:bg-midnight overflow-hidden border-b border-creme-dark dark:border-glass-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">Shop by Category</h3>
                    <a href="/products" className="flex items-center text-terracotta dark:text-gold font-bold text-sm uppercase tracking-widest hover:gap-2 transition-all">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:px-0 md:mx-0 md:grid md:grid-cols-8 md:overflow-visible">
                    {categories.map((cat, i) => (
                        <motion.a
                            key={cat.id}
                            href={`/products?category=${cat.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-glass-border flex items-center justify-center group-hover:scale-110 group-hover:border-terracotta/40 dark:group-hover:border-gold/40 group-hover:shadow-lifted transition-all duration-300">
                                <cat.icon className={`w-8 h-8 md:w-10 md:h-10 ${cat.color} group-hover:drop-shadow-glow transition-all`} />
                            </div>
                            <span className="text-sm font-bold text-espresso/80 dark:text-ivory/80 group-hover:text-terracotta dark:group-hover:text-gold transition-colors">
                                {cat.name}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}
