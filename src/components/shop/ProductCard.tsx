"use client";

import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/ProductImage";
import { useCart } from "@/lib/CartContext";
import { ArrowRight, Check, Repeat, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
    id: string;
    title: string;
    price: string | number;
    regularPrice?: string | number;
    image: string;
    description: string;
    slug: string;
    badge?: string;
    subscription?: boolean;
    category: string;

    sku?: string;
    featured?: boolean;
}

export function ProductCard({
    id,
    title,
    price,
    regularPrice,
    image,
    description,
    slug,
    badge,
    subscription,
    category,
    sku,
    featured,
}: ProductCardProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const isOnSale = regularPrice && regularPrice !== price;

    const handleAddToCart = () => {
        addToCart({
            id,
            title,
            price: String(price),
            image,
            slug,
            category: category || "Uncategorized",
            description,
            sku: sku || "N/A",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="group relative bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border rounded-2xl overflow-hidden hover:border-terracotta/40 dark:hover:border-gold/40 transition-all duration-500 hover:shadow-lifted dark:hover:shadow-[0_20px_60px_rgba(212,175,55,0.2)] hover:-translate-y-2">
            {/* Badge */}
            {badge && (
                <span className="absolute top-4 left-4 z-50 bg-terracotta dark:bg-gold text-white dark:text-midnight text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-xl">
                    {badge}
                </span>
            )}

            {featured && !badge && (
                <span className="absolute top-4 left-4 z-50 bg-espresso dark:bg-ivory text-white dark:text-midnight text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Premium
                </span>
            )}

            {/* Sale Badge */}
            {isOnSale && (
                <span className="absolute top-4 right-4 z-50 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    SALE
                </span>
            )}

            {/* Image Container */}
            <Link href={`/products/${slug}`} className="block">
                <div className="relative h-80 overflow-hidden bg-creme-light dark:bg-midnight-mid/30 flex items-center justify-center p-8 cursor-pointer">
                    <ProductImage
                        src={image}
                        alt={title}
                        category={category}
                        id={id}
                        className="w-full h-full"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="p-6 md:p-8 relative z-20 bg-white/80 dark:bg-midnight/40 backdrop-blur-sm -mt-4 border-t border-creme-dark dark:border-glass-border">
                {/* Category Badge */}
                {category && (
                    <span className="inline-block text-xs text-terracotta/60 dark:text-gold/60 font-bold uppercase tracking-widest mb-2">
                        {category}
                    </span>
                )}

                <div className="flex justify-between items-start mb-4">
                    <Link href={`/products/${slug}`} className="flex-1 cursor-pointer">
                        <h3 className="text-xl font-serif font-bold mb-2 text-espresso dark:text-ivory group-hover:text-terracotta dark:group-hover:text-gold transition-colors line-clamp-2">
                            {title}
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-terracotta dark:text-gold">
                                {price}
                            </p>
                            {regularPrice && regularPrice !== price && (
                                <p className="text-sm text-espresso/40 dark:text-ivory/40 line-through">
                                    {regularPrice}
                                </p>
                            )}
                        </div>
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className={`rounded-full p-3 transition-all duration-300 ml-4 ${
                            added
                                ? "bg-green-600 text-white"
                                : "bg-terracotta dark:bg-gold text-white dark:text-midnight hover:bg-terracotta-dark dark:hover:bg-gold/90 hover:scale-110"
                        }`}
                        title={added ? "Added to cart!" : "Add to cart"}
                    >
                        {added ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <ShoppingBag className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <p className="text-sm text-espresso/60 dark:text-ivory/60 mb-6 line-clamp-2 md:line-clamp-3">
                    {description}
                </p>

                {/* Subscription Indicator */}
                {subscription && (
                    <div className="flex items-center gap-2 mb-4 text-xs text-terracotta/80 dark:text-gold/80">
                        <Repeat className="w-4 h-4" />
                        <span>Available as subscription</span>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        href={`/products/${slug}`}
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-terracotta/10 dark:group-hover:bg-gold/10 group-hover:border-terracotta dark:group-hover:border-gold"
                    >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
