"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center transition-colors duration-500">
                <Section>
                    <div className="text-center max-w-2xl mx-auto space-y-8">
                        <div className="w-24 h-24 mx-auto bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-soft dark:shadow-none rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-terracotta/50 dark:text-gold/50" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">Your Cart is Empty</h1>
                        <p className="text-xl text-espresso-muted dark:text-ivory/60">
                            Start filling it with pure, sovereign milk and dairy products!
                        </p>
                        <Button href="/products" size="lg" icon>
                            Browse Products
                        </Button>
                    </div>
                </Section>
            </main>
        );
    }

    return (
        <main className="bg-creme dark:bg-midnight min-h-screen transition-colors duration-500">
            <Section>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-espresso dark:text-ivory">Your Cart</h1>
                        <p className="text-espresso-muted dark:text-ivory/60">
                            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-soft dark:shadow-none rounded-2xl p-6 flex gap-6 hover:border-terracotta/30 dark:hover:border-gold/30 transition-all"
                                >
                                    {/* Product Image */}
                                    <div
                                        className="w-32 h-32 flex-shrink-0 rounded-xl bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <Link
                                            href={`/products/${item.slug}`}
                                            className="text-xl font-serif font-bold text-espresso dark:text-ivory hover:text-terracotta dark:hover:text-gold transition-colors mb-2 block"
                                        >
                                            {item.title}
                                        </Link>
                                        <p className="text-2xl font-bold text-terracotta dark:text-gold mb-4">{item.price}</p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-3 bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-glass-border rounded-full p-1 text-espresso dark:text-ivory">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full hover:bg-white dark:hover:bg-gold/10 flex items-center justify-center transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full hover:bg-white dark:hover:bg-gold/10 flex items-center justify-center transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-2 text-sm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right">
                                        <p className="text-sm text-espresso-muted dark:text-ivory/60 mb-1">Subtotal</p>
                                        <p className="text-xl font-bold text-terracotta dark:text-gold">
                                            ₹{(parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity).toFixed(0)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-red-500 hover:text-red-400 transition-colors text-sm flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear entire cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-soft dark:shadow-none rounded-2xl p-8 sticky top-24">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-espresso dark:text-ivory">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/70">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/70">
                                        <span>Delivery</span>
                                        <span className="text-green-500">FREE</span>
                                    </div>
                                    <div className="h-px bg-creme-dark dark:bg-glass-border"></div>
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-espresso dark:text-ivory">Total</span>
                                        <span className="text-terracotta dark:text-gold">₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                </div>

                                <Button href="/checkout" size="lg" icon className="w-full mb-4">
                                    Proceed to Checkout
                                </Button>

                                <Link
                                    href="/products"
                                    className="text-terracotta dark:text-gold hover:text-terracotta-dark dark:hover:text-gold/80 transition-colors text-sm flex items-center justify-center gap-2"
                                >
                                    Continue Shopping
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                {/* Trust Badges */}
                                <div className="mt-8 pt-8 border-t border-creme-dark dark:border-glass-border space-y-3 text-sm text-espresso-light dark:text-ivory/60">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <span>Delivered within 4 hours</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-terracotta/20 dark:bg-gold/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-terracotta dark:bg-gold rounded-full"></div>
                                        </div>
                                        <span>Glass bottles - zero plastic</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-terracotta/20 dark:bg-gold/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-terracotta dark:bg-gold rounded-full"></div>
                                        </div>
                                        <span>Lab tested & certified</span>
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
