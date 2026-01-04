"use client";

import { Clock, Thermometer, Sparkles, Truck, Sun, Moon } from "lucide-react";

/**
 * FreshDelivery - Highlights the 2x daily fresh delivery USP
 * 
 * Key messages:
 * - 🕐 4h Farm to Home (within 4 hours of milking)
 * - ❄️ 4°C Cold Chain
 * - ⏰ 2x Daily (Morning & Evening) - choose your slot
 * - ✨ 100% Pure, No UHT
 */
export function FreshDelivery() {
    const stats = [
        {
            icon: Clock,
            value: "4h",
            label: "Farm to Home",
            description: "Delivered within 4 hours of milking"
        },
        {
            icon: Thermometer,
            value: "4°C",
            label: "Cold Chain",
            description: "Temperature maintained throughout"
        },
        {
            icon: Sparkles,
            value: "100%",
            label: "Pure & Fresh",
            description: "No UHT, no preservatives"
        }
    ];

    const deliverySlots = [
        { icon: Sun, time: "5 AM - 8 AM", label: "Morning Delivery" },
        { icon: Moon, time: "5 PM - 8 PM", label: "Evening Delivery" }
    ];

    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-creme via-creme-light to-creme dark:from-midnight dark:via-midnight-mid dark:to-midnight transition-colors duration-500" />

            {/* Subtle Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-terracotta/10 dark:bg-gold/10 text-terracotta dark:text-gold font-bold text-xs uppercase tracking-[0.2em] mb-4">
                        ● Farm to Home
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                        Freshest Milk Delivered{" "}
                        <span className="text-terracotta dark:text-gold">Before Sunrise</span>
                    </h2>
                    <p className="text-lg text-espresso/70 dark:text-ivory/70 max-w-2xl mx-auto leading-relaxed">
                        Our cows are milked 2x daily – morning and evening. Your milk reaches your doorstep
                        within 4 hours of milking. Choose morning, evening, or both delivery slots.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-midnight-deep rounded-3xl p-8 border border-espresso/10 dark:border-glass-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Gradient accent */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-terracotta/5 to-transparent dark:from-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-terracotta/10 dark:bg-gold/10 mb-4">
                                    <stat.icon className="w-8 h-8 text-terracotta dark:text-gold" />
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-terracotta dark:text-gold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-lg font-semibold text-espresso dark:text-ivory mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-espresso/60 dark:text-ivory/60">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2x Daily Delivery Banner */}
                <div className="relative bg-gradient-to-r from-terracotta to-terracotta/80 dark:from-gold dark:to-gold/80 rounded-3xl p-8 md:p-12 overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10" />

                    <div className="relative">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Truck className="w-8 h-8 text-white" />
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                                Fresh Within 4 Hours
                            </h3>
                        </div>
                        <p className="text-center text-white/90 mb-6 max-w-lg mx-auto">
                            Cows milked 2x daily = 2 delivery options. Choose what works for you.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            {deliverySlots.map((slot, index) => (
                                <div
                                    key={index}
                                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center"
                                >
                                    <slot.icon className="w-10 h-10 text-white mx-auto mb-3" />
                                    <div className="text-xl font-bold text-white mb-1">{slot.time}</div>
                                    <div className="text-white/80 text-sm">{slot.label}</div>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-white/90 mt-8 max-w-xl mx-auto">
                            Our dedicated delivery fleet ensures you always get fresh milk within hours of milking —
                            never sitting in warehouses, always straight from our farm to your kitchen.
                        </p>
                    </div>
                </div>

                {/* USP Points */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {[
                        { emoji: "⏰", text: "Same-day delivery" },
                        { emoji: "❄️", text: "Cold chain at 4°C" },
                        { emoji: "🔄", text: "Flexible subscriptions" },
                        { emoji: "🚫", text: "No preservatives" }
                    ].map((usp, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-white/50 dark:bg-midnight/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-espresso/10 dark:border-glass-border"
                        >
                            <span className="text-2xl">{usp.emoji}</span>
                            <span className="text-sm font-medium text-espresso dark:text-ivory">{usp.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
