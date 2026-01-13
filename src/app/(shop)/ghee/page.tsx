"use client";

import { Section } from "@/components/ui/section";
import { products } from "@/lib/products";
import { ArrowRight, Flame, Heart, Leaf, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GheePage() {
    const gheeProduct = products.find((p) => p.id === "ghee-cow-1kg");

    return (
        <div className="bg-creme dark:bg-midnight">
            {/* HERO SECTION */}
            <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Video/Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/img/generated/amrit_ghee_cinematic_hero.png" // Using the generated hero
                        alt="Amrit A2 Ghee Cinematic"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-creme via-transparent to-black/30 dark:from-midnight dark:via-transparent dark:to-black/50" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <span className="inline-block px-4 py-1.5 bg-gold/20 backdrop-blur-md text-gold-light border border-gold/30 rounded-full text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in-up">
                        Vedic Liquid Gold
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-lg animate-fade-in-up delay-100">
                        Pure A2 Gir Cow Ghee
                    </h1>
                    <p className="text-xl md:text-2xl text-creme-light max-w-2xl mx-auto mb-10 drop-shadow-md animate-fade-in-up delay-200">
                        Hand-churned using the traditional Bilona method. Not just food, but
                        medicine for the soul.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
                        <Link
                            href={`/product/${gheeProduct?.slug}`}
                            className="px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            Buy Now - {gheeProduct?.price}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="#vedic-process"
                            className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg transition-all"
                        >
                            Learn the Process
                        </a>
                    </div>
                </div>
            </div>

            {/* WHY A2 BILONA? */}
            <Section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                                <Image
                                    src="/assets/img/products/a2desicowgheeglassjarbilonamethod.png"
                                    alt="Bilona Method"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-midnight-light p-6 rounded-2xl shadow-xl border border-espresso/5 max-w-xs">
                                <div className="flex items-center gap-2 text-terracotta mb-2">
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                                <p className="text-espresso/80 dark:text-ivory/80 italic text-sm">
                                    &quot;This ghee reminds me of my grandmother&apos;s home. The
                                    aroma is purely nostalgic.&quot;
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                                Why Our Ghee is Different?
                            </h2>
                            <p className="text-lg text-espresso/70 dark:text-ivory/70 mb-8 leading-relaxed">
                                Most &apos;ghee&apos; in the market is machine-processed cream oil.
                                Ours is <strong>Sacred Bilona Ghee</strong>. We start with pure A2
                                milk from free-grazing Gir cows, turn it into curd, churn the curd
                                by hand to extract butter (makkhan), and slowly heat it over a wood
                                fire to create liquid gold.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Leaf,
                                        title: "100% Natural & Organic",
                                        desc: "No chemicals, preservatives, or hormones. Just pure nature.",
                                    },
                                    {
                                        icon: Heart,
                                        title: "A2 Beta-Casein Protein",
                                        desc: "Easier to digest and healthier for the heart than regular A1 milk ghee.",
                                    },
                                    {
                                        icon: Flame,
                                        title: "Wood-Fired Bilona Method",
                                        desc: "Made from Curd (not cream) using the ancient Ayurvedic process.",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-6 h-6 text-terracotta" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-espresso dark:text-white mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-espresso/60 dark:text-ivory/60">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* THE VEDIC PROCESS */}
            <Section className="bg-white dark:bg-midnight-light py-24 border-y border-espresso/5">
                <div className="container mx-auto px-4" id="vedic-process">
                    <div className="text-center mb-16">
                        <span className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 block">
                            Transparency
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                            From Farm to Jar
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Free Grazing",
                                desc: "Our Gir cows graze freely on organic pastures.",
                            },
                            {
                                step: "02",
                                title: "Curd Formation",
                                desc: "Milk is boiled and set into curd in clay pots.",
                            },
                            {
                                step: "03",
                                title: "Bilona Churning",
                                desc: "Curd is hand-churned to extract white makkhan.",
                            },
                            {
                                step: "04",
                                title: "Slow Heating",
                                desc: "Makkhan is heated over wood fire to make Ghee.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="relative p-8 rounded-2xl bg-creme/50 dark:bg-midnight border border-espresso/5 hover:border-terracotta/30 transition-all hover:-translate-y-2"
                            >
                                <span className="absolute -top-6 left-8 text-6xl font-black text-terracotta/10">
                                    {item.step}
                                </span>
                                <h3 className="text-xl font-bold text-espresso dark:text-white mb-3 mt-4 relative z-10">
                                    {item.title}
                                </h3>
                                <p className="text-espresso/60 dark:text-ivory/60 text-sm relative z-10">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* PRODUCT CTA */}
            <Section className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-terracotta to-red-700 rounded-3xl p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/img/noise.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                                Bring Home the Purity
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
                                Experience the taste of true wellness. Limited batch production.
                            </p>
                            <Link
                                href={`/product/${gheeProduct?.slug}`}
                                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-terracotta rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:bg-creme transition-all transform hover:scale-105"
                            >
                                Order Now <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
