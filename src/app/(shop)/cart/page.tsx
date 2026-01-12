"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useCart } from "@/lib/CartContext";
import {
    ArrowRight,
    CheckCircle2,
    Minus,
    Plus,
    ShieldCheck,
    ShoppingBag,
    Star,
    Trash2,
} from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center transition-colors duration-500">
                <Section>
                    <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in-up">
                        <div className="w-24 h-24 mx-auto bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-soft dark:shadow-none rounded-full flex items-center justify-center relative">
                            <ShoppingBag className="w-10 h-10 text-terracotta dark:text-gold" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center animate-bounce-slow">
                                <span className="text-espresso font-bold text-xs">0</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                                Your Cart is Empty
                            </h1>
                            <p className="text-xl text-espresso-muted dark:text-ivory/60 max-w-md mx-auto leading-relaxed">
                                Looks like you haven&apos;t added any pure goodness to your cart
                                yet.
                            </p>
                        </div>
                        <Button
                            href="/products"
                            size="lg"
                            icon
                            className="shadow-gold hover:shadow-gold-hover transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Start Shopping
                        </Button>
                    </div>
                </Section>
            </main>
        );
    }

    return (
        <main className="bg-creme/50 dark:bg-midnight min-h-screen transition-colors duration-500 pb-20">
            <Section>
                <div className="max-w-7xl mx-auto">
                    {/* Header with Progress Steps */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 animate-fade-in">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-2">
                                Your Cart
                            </h1>
                            <p className="text-espresso-muted dark:text-ivory/60 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                {cart.length} {cart.length === 1 ? "item" : "items"} reserved for
                                you
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-2 text-espresso dark:text-ivory">
                                <span className="w-6 h-6 rounded-full bg-gold text-espresso flex items-center justify-center font-bold text-xs">
                                    1
                                </span>
                                Cart
                            </div>
                            <div className="w-12 h-px bg-creme-dark dark:bg-white/10"></div>
                            <div className="flex items-center gap-2 text-espresso-muted dark:text-ivory/40">
                                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                                    2
                                </span>
                                Details
                            </div>
                            <div className="w-12 h-px bg-creme-dark dark:bg-white/10"></div>
                            <div className="flex items-center gap-2 text-espresso-muted dark:text-ivory/40">
                                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                                    3
                                </span>
                                Pay
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-8 space-y-6 animate-fade-in-up delay-100">
                            {/* Free Shipping Progress (Mockup for now, assuming free shipping is standard or > X) */}
                            <div className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-espresso dark:text-ivory text-sm">
                                        Free Delivery Unlocked!
                                    </p>
                                    <p className="text-xs text-espresso-muted dark:text-ivory/60">
                                        Your order qualifies for free farm-to-table delivery.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-sm hover:shadow-md dark:shadow-none rounded-2xl p-4 sm:p-6 flex gap-6 transition-all duration-300"
                                    >
                                        {/* Product Image */}
                                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-creme-light dark:bg-midnight-mid">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            {/* Purity Badge Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                                <span className="text-[10px] text-white font-medium flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-gold text-gold" />
                                                    Pure A2
                                                </span>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <Link
                                                        href={`/products/${item.slug}`}
                                                        className="text-lg sm:text-xl font-serif font-bold text-espresso dark:text-ivory hover:text-terracotta dark:hover:text-gold transition-colors mb-1"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <p className="text-lg font-bold text-espresso dark:text-ivory">
                                                        ₹
                                                        {(
                                                            parseFloat(
                                                                item.price.replace(/[₹,]/g, "")
                                                            ) * item.quantity
                                                        ).toFixed(0)}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-terracotta dark:text-gold font-medium mb-4">
                                                    {item.price}{" "}
                                                    <span className="text-espresso-muted dark:text-ivory/40 font-normal">
                                                        per unit
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-creme-light dark:bg-midnight-mid/50 border border-creme-dark dark:border-white/10 rounded-lg p-1">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        className="w-8 h-8 rounded-md hover:bg-white dark:hover:bg-midnight-light flex items-center justify-center text-espresso dark:text-ivory transition-all disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-espresso dark:text-ivory text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        className="w-8 h-8 rounded-md hover:bg-white dark:hover:bg-midnight-light flex items-center justify-center text-espresso dark:text-ivory transition-all"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-espresso-muted hover:text-red-500 dark:text-ivory/40 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Why Shop With Us - Trust Section (Replacing empty space) */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                <div className="bg-white/50 dark:bg-glass-bg border border-creme-dark/50 dark:border-glass-border p-4 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-espresso dark:text-ivory">
                                            Safe & Pure
                                        </p>
                                        <p className="text-xs text-espresso-muted dark:text-ivory/60">
                                            Zero adulteration
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white/50 dark:bg-glass-bg border border-creme-dark/50 dark:border-glass-border p-4 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-espresso dark:text-ivory">
                                            Premium Quality
                                        </p>
                                        <p className="text-xs text-espresso-muted dark:text-ivory/60">
                                            Direct from farm
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white/50 dark:bg-glass-bg border border-creme-dark/50 dark:border-glass-border p-4 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-espresso dark:text-ivory">
                                            Hygenic
                                        </p>
                                        <p className="text-xs text-espresso-muted dark:text-ivory/60">
                                            Touch-free packing
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary & Checkout */}
                        <div className="lg:col-span-4 animate-fade-in-up delay-200">
                            <div className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-lg dark:shadow-card-dark rounded-2xl p-6 sticky top-24">
                                <h3 className="text-xl font-serif font-bold mb-6 text-espresso dark:text-ivory flex items-center justify-between">
                                    Order Summary
                                    <button
                                        onClick={clearCart}
                                        className="text-xs font-sans font-normal text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/70">
                                        <span>Item Total</span>
                                        <span>₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/70">
                                        <span>Delivery Charges</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/70 items-center">
                                        <span>Taxes</span>
                                        <span className="text-xs bg-creme p-1 rounded text-espresso-muted">
                                            Calculated at Checkout
                                        </span>
                                    </div>

                                    <div className="h-px bg-creme-dark dark:bg-white/10 my-4"></div>

                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold text-espresso dark:text-ivory">
                                            Grand Total
                                        </span>
                                        <div className="text-right">
                                            <span className="text-2xl font-serif font-bold text-gold">
                                                ₹{cartTotal.toFixed(0)}
                                            </span>
                                            <p className="text-[10px] text-espresso-muted dark:text-ivory/50">
                                                Incl. of all taxes
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    href="/checkout"
                                    size="lg"
                                    icon
                                    className="w-full mb-4 shadow-gold hover:shadow-gold-hover transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Proceed to Checkout</span>
                                </Button>

                                <div className="text-center">
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center gap-2 text-sm text-espresso-muted hover:text-gold dark:text-ivory/60 dark:hover:text-gold transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                        Continue Shopping
                                    </Link>
                                </div>

                                {/* Secure Checkout Badge */}
                                <div className="mt-8 pt-6 border-t border-creme-dark dark:border-white/10 text-center">
                                    <p className="text-xs text-espresso-muted dark:text-ivory/50 flex items-center justify-center gap-2 mb-2">
                                        <ShieldCheck className="w-3 h-3" />
                                        Guaranteed Safe Checkout
                                    </p>
                                    <div className="flex justify-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                                        {/* Simple visualization of payment options */}
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
