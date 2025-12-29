"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Repeat, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";


interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    regularPrice?: string;
    image: string;
    description: string;
    slug: string;
    badge?: string;
    subscription?: boolean;
    category?: string;
}

export function ProductCard({ id, title, price, regularPrice, image, description, slug, badge, subscription, category }: ProductCardProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const isOnSale = regularPrice && regularPrice !== price;

    const handleAddToCart = () => {
        addToCart({ id, title, price, image, slug });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="group relative bg-glass-bg border border-glass-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(212,175,55,0.2)] hover:-translate-y-2">
            {/* Badge */}
            {badge && (
                <span className="absolute top-4 left-4 z-10 bg-gold text-midnight text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {badge}
                </span>
            )}

            {/* Sale Badge */}
            {isOnSale && (
                <span className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    SALE
                </span>
            )}

            {/* Image Container */}
            <div className="relative h-80 overflow-hidden bg-midnight-mid/30 flex items-center justify-center p-8">
                <ProductImage src={image} alt={title} category={category} id={id} className="w-full h-full" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 relative z-20 bg-midnight/40 backdrop-blur-sm -mt-4 border-t border-glass-border">
                {/* Category Badge */}
                {category && (
                    <span className="inline-block text-xs text-gold/60 font-bold uppercase tracking-widest mb-2">
                        {category}
                    </span>
                )}

                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-serif font-bold mb-2 text-ivory group-hover:text-gold transition-colors line-clamp-2">{title}</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-gold">{price}</p>
                            {regularPrice && regularPrice !== price && (
                                <p className="text-sm text-ivory/40 line-through">{regularPrice}</p>
                            )}
                        </div>
                    </div>
                    <button className="text-ivory/50 hover:text-gold transition-colors ml-4">
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-sm text-ivory/60 mb-6 line-clamp-2 md:line-clamp-3">{description}</p>

                {/* Subscription Indicator */}
                {subscription && (
                    <div className="flex items-center gap-2 mb-4 text-xs text-gold/80">
                        <Repeat className="w-4 h-4" />
                        <span>Available as subscription</span>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button href={`/products/${slug}`} variant="outline" size="sm" className="flex-1 group-hover:bg-gold/10 group-hover:border-gold">
                        View
                    </Button>
                    <button
                        onClick={handleAddToCart}
                        className={`flex-1 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${added
                            ? 'bg-green-600 text-white'
                            : 'bg-gold text-midnight hover:bg-gold/90'
                            }`}
                    >
                        {added ? (
                            <>
                                <Check className="w-4 h-4" />
                                Added!
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
