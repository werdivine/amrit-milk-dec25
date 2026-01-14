"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { calculateCartTotals, getCrossSellRecommendations, type CartItem } from "@/lib/cart-utils";
import { useCart } from "@/lib/CartContext";
import { products } from "@/lib/products";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Clock,
    Minus,
    Plus,
    ShieldCheck,
    Trash2,
    TrendingUp,
    Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
    const {
        cart,
        updateQuantity,
        removeFromCart,
        addToCart,
        applyCoupon,
        removeCoupon,
        couponCode,
        discountAmount,
    } = useCart();
    const [couponInput, setCouponInput] = useState("");
    const [couponMessage, setCouponMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    // Enrich cart with full product details (category, etc.) for logic
    const enrichedCart = cart.map((item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? { ...product, ...item } : item;
    }) as CartItem[];

    // Derived State
    const totals = calculateCartTotals(enrichedCart, discountAmount);
    const recommendations = getCrossSellRecommendations(enrichedCart);

    const handleApplyCoupon = () => {
        if (!couponInput) return;
        const result = applyCoupon(couponInput);
        if (result.success) {
            setCouponMessage({ type: "success", text: result.message });
            setCouponInput("");
        } else {
            setCouponMessage({ type: "error", text: result.message });
        }
    };

    // Hydration fix
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    // ----------------------------------------------------------------------
    // EMPTY STATE
    // ----------------------------------------------------------------------
    if (cart.length === 0) {
        return (
            <main className="min-h-screen pt-24 pb-20 bg-creme dark:bg-espresso-dark">
                <Section className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center space-y-8 py-20">
                        <div className="relative w-48 h-48 mx-auto opacity-80">
                            <Image
                                src="/assets/img/amrit-logo-new.png"
                                alt="Empty Cart"
                                fill
                                className="object-contain grayscale"
                            />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                                Your Cart is Empty
                            </h1>
                            <p className="text-xl text-espresso-muted dark:text-ivory/60 max-w-md mx-auto leading-relaxed">
                                Explore our farm-fresh A2 dairy and organic essentials.
                            </p>
                        </div>
                        <Button
                            href="/products"
                            size="lg"
                            icon
                            className="shadow-lg hover:translate-y-[-2px] transition-transform"
                        >
                            Start Shopping
                        </Button>
                    </div>
                </Section>
            </main>
        );
    }

    // ----------------------------------------------------------------------
    // MAIN CART UI
    // ----------------------------------------------------------------------
    return (
        <main className="min-h-screen pt-24 pb-20 bg-creme dark:bg-espresso-dark">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* 1. Header & Trust */}
                <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-espresso dark:text-ivory">
                            Your Basket
                        </h1>
                        <p className="text-espresso-muted dark:text-ivory/60 mt-1">
                            {cart.length} items of pure goodness
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-espresso/80 dark:text-ivory/80">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-gold" /> 100% Genuine
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-gold" /> Farm to Home
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                    {/* LEFT COLUMN: Cart Items & Cross-Sell */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* 2. Gamified Free Delivery Progress */}
                        <div className="bg-white dark:bg-espresso border border-stone-200 dark:border-white/10 p-5 rounded-xl shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between mb-3 text-sm font-medium">
                                <span className="text-espresso dark:text-ivory">
                                    {totals.isFreeDelivery
                                        ? "🎉 You've unlocked FREE Delivery!"
                                        : `Add ₹${totals.missingForFreeDelivery} for FREE Delivery`}
                                </span>
                                <span className="text-gold">
                                    {Math.round(totals.progressPercent)}%
                                </span>
                            </div>
                            {/* Progress Bar Track */}
                            <div className="h-2 w-full bg-stone-100 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${totals.progressPercent}%` }}
                                    className="h-full bg-gradient-to-r from-gold to-orange-400"
                                />
                            </div>
                            {totals.isFreeDelivery && (
                                <div className="absolute top-0 right-0 p-2">
                                    <div className="bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded">
                                        FREESHIP APPLIED
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. Cart Items List */}
                        <div className="space-y-4">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="group bg-white dark:bg-espresso border border-stone-200 dark:border-white/10 rounded-xl p-4 md:p-5 flex gap-4 md:gap-6 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        {/* Product Image */}
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-stone-50 dark:bg-white/5 rounded-lg overflow-hidden border border-stone-100 dark:border-white/5">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Badge */}
                                            <div className="absolute top-0 left-0 bg-gold/90 text-espresso text-[10px] font-bold px-2 py-0.5 rounded-br">
                                                PURE A2
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-serif font-bold text-lg text-espresso dark:text-ivory leading-tight">
                                                        {item.title}
                                                    </h3>
                                                    <div className="text-right">
                                                        <span className="block font-bold text-lg text-espresso dark:text-ivory">
                                                            {item.price}
                                                        </span>
                                                        {item.regularPrice && (
                                                            <span className="block text-sm text-stone-400 line-through">
                                                                {item.regularPrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-espresso-muted dark:text-ivory/60 line-clamp-1 mt-1">
                                                    {item.category} • Fresh Stock
                                                </p>
                                            </div>

                                            {/* Action Row */}
                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Control */}
                                                <div className="flex items-center gap-3 bg-stone-50 dark:bg-white/5 rounded-lg border border-stone-200 dark:border-white/10 p-1">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                Math.max(0, item.quantity - 1)
                                                            )
                                                        }
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-transparent shadow-sm hover:bg-stone-100 dark:hover:bg-white/10 text-espresso dark:text-ivory transition-colors"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-6 text-center font-bold text-espresso dark:text-ivory text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gold text-espresso shadow-sm hover:brightness-110 transition-colors"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Subscribe Toggle (Visual Only for now) */}
                                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/30 cursor-pointer hover:bg-blue-100 transition-colors group/sub">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 group-hover/sub:text-blue-800">
                                                        Subscribe & Save
                                                    </span>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-stone-400 hover:text-red-500 transition-colors p-2"
                                                    title="Remove Item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* 4. Smart Cross-Sell Recommendations */}
                        {recommendations.length > 0 && (
                            <div className="mt-12 bg-white dark:bg-espresso p-6 rounded-2xl border border-stone-200 dark:border-white/10">
                                <h3 className="text-xl font-serif font-bold text-espresso dark:text-ivory mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-gold" /> You might also need
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {recommendations.map((product) => (
                                        <div
                                            key={product.id}
                                            className="group bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 rounded-xl p-3 shadow-sm hover:border-gold/50 transition-all flex flex-col items-center text-center"
                                        >
                                            <div className="relative w-20 h-20 bg-white rounded-lg mb-3 overflow-hidden">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="space-y-1 w-full">
                                                <h4 className="font-bold text-sm text-espresso dark:text-ivory line-clamp-1">
                                                    {product.title}
                                                </h4>
                                                <p className="text-xs text-stone-500 line-clamp-1">
                                                    {product.category}
                                                </p>
                                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200 dark:border-white/10">
                                                    <span className="text-sm font-bold text-gold">
                                                        {product.price}
                                                    </span>
                                                    <button
                                                        onClick={() => addToCart(product)}
                                                        className="bg-espresso text-ivory p-1.5 rounded-full hover:bg-gold hover:text-espresso transition-colors shadow-sm"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Summary & Checkout */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-white dark:bg-espresso border border-stone-200 dark:border-white/10 rounded-xl p-6 shadow-sm lg:sticky lg:top-24 space-y-6">
                            <h2 className="text-xl font-serif font-bold text-espresso dark:text-ivory">
                                Order Summary
                            </h2>

                            {/* Summary Rows */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-espresso-muted dark:text-ivory/70">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{totals.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-espresso-muted dark:text-ivory/70">
                                    <span>Delivery</span>
                                    {totals.isFreeDelivery ? (
                                        <span className="font-bold text-green-600">FREE</span>
                                    ) : (
                                        <span>₹{totals.deliveryFee}</span>
                                    )}
                                </div>
                                {couponCode && (
                                    <div className="flex justify-between text-green-600 dark:text-green-400">
                                        <span className="flex items-center gap-1">
                                            Discount ({couponCode})
                                            <button
                                                onClick={removeCoupon}
                                                className="text-xs text-red-500 hover:underline ml-1"
                                            >
                                                (Remove)
                                            </button>
                                        </span>
                                        <span className="font-bold">-₹{discountAmount}</span>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-stone-100 dark:border-white/10 flex justify-between items-end">
                                    <span className="font-bold text-lg text-espresso dark:text-ivory">
                                        Total
                                    </span>
                                    <span className="font-bold text-2xl text-espresso dark:text-ivory">
                                        ₹{totals.total}
                                    </span>
                                </div>
                            </div>

                            {/* Coupon Input */}
                            {!couponCode && (
                                <div className="pt-4 border-t border-stone-100 dark:border-white/10">
                                    <div className="flex gap-2">
                                        <input
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            placeholder="Coupon Code"
                                            className="flex-1 bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
                                        />
                                        <button
                                            onClick={handleApplyCoupon}
                                            disabled={!couponInput}
                                            className="bg-espresso dark:bg-ivory text-ivory dark:text-espresso px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponMessage && (
                                        <p
                                            className={`text-xs mt-2 ${couponMessage.type === "success" ? "text-green-600" : "text-red-500"}`}
                                        >
                                            {couponMessage.text}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Trust Badge */}
                            <div className="bg-stone-50 dark:bg-white/5 rounded-lg p-3 flex items-start gap-3 border border-stone-100 dark:border-white/5">
                                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-xs font-bold text-espresso dark:text-ivory uppercase mb-0.5">
                                        Secure Checkout
                                    </h4>
                                    <p className="text-[10px] text-espresso-muted dark:text-ivory/60 leading-snug">
                                        Guaranteed safe checkout. All orders are packed with care in
                                        sanitized conditions.
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-2">
                                <Button
                                    href="/checkout"
                                    size="lg"
                                    className="w-full text-base py-6 shadow-xl shadow-gold/20 hover:shadow-gold/30"
                                >
                                    Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Link
                                    href="/products"
                                    className="block text-center text-sm font-medium text-espresso-muted hover:text-espresso dark:text-ivory/50 dark:hover:text-ivory transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-espresso-muted dark:text-ivory/50">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                                {cart.some((i) => i.category === "Dairy")
                                    ? "Order by 10 PM for next morning delivery"
                                    : "Standard Delivery (3-5 Business Days)"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
