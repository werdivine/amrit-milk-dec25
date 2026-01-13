"use client";

import { Section } from "@/components/ui/section";
import { products } from "@/lib/products";
import { ArrowRight, Star } from "lucide-react";
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
                            href="#ayurveda"
                            className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg transition-all"
                        >
                            Read the Truth
                        </a>
                    </div>
                </div>
            </div>

            {/* SECTION 1: THE AYURVEDIC PERSPECTIVE (Deep Dive) */}
            <Section className="py-24" id="ayurveda">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-terracotta text-sm font-bold tracking-widest uppercase mb-2 block">
                            Ancient Wisdom
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                            The Science of Ojas
                        </h2>
                        <p className="text-lg text-espresso/70 dark:text-ivory/70 leading-relaxed">
                            In Ayurveda, Ghee is considered the essence of milk and a vital builder
                            of <strong>Ojas</strong>—the subtle energy that governs immunity,
                            strength, and happiness. Unlike ordinary oils which clog the system,
                            Desi Ghee lubricates the tissues (Dhatus), clears the mind, and kindles
                            the digestive fire (Agni).
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Lubrication",
                                desc: "Nourishes joints and connective tissues, keeping the body flexible and youthful.",
                            },
                            {
                                title: "Brain Health",
                                desc: "Rich in Omega-3 (DHA) which supports cognitive function, memory, and focus.",
                            },
                            {
                                title: "Gut Healing",
                                desc: "Contains Butyric Acid, which heals the gut lining and cures constipation.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-midnight-mid p-8 rounded-2xl border border-espresso/5 shadow-md text-center hover:border-terracotta/20 transition-all"
                            >
                                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 text-terracotta">
                                    <Star className="w-8 h-8 fill-current" />
                                </div>
                                <h3 className="text-xl font-bold text-espresso dark:text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-espresso/60 dark:text-ivory/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* SECTION 2: THE COMPARISON TABLE (Truth) */}
            <Section className="bg-white dark:bg-midnight-light py-24 border-y border-espresso/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                            Know What You Eat
                        </h2>
                        <p className="text-espresso/60 dark:text-ivory/60">
                            The difference between &quot;Product&quot; and &quot;Prana&quot;.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full max-w-5xl mx-auto text-left border-collapse">
                            <thead>
                                <tr className="border-b border-espresso/10 dark:border-white/10">
                                    <th className="p-6 text-espresso/40 dark:text-ivory/40 uppercase text-xs tracking-widest font-bold">
                                        Feature
                                    </th>
                                    <th className="p-6 bg-terracotta/5 text-terracotta font-bold text-lg w-1/3 rounded-t-2xl">
                                        Amrit A2 Bilona Ghee
                                    </th>
                                    <th className="p-6 text-espresso/60 dark:text-ivory/60 font-bold text-lg w-1/3">
                                        Industrial Ghee
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-espresso dark:text-ivory">
                                <tr className="border-b border-espresso/5 dark:border-white/5">
                                    <td className="p-6 font-bold">Source</td>
                                    <td className="p-6 bg-terracotta/5 font-semibold">
                                        Free-grazing Gir Cows
                                    </td>
                                    <td className="p-6 text-espresso/60">
                                        Caged Buffalo/Mixed Breed
                                    </td>
                                </tr>
                                <tr className="border-b border-espresso/5 dark:border-white/5">
                                    <td className="p-6 font-bold">Process</td>
                                    <td className="p-6 bg-terracotta/5 font-semibold">
                                        Curd Churned (Bilona)
                                    </td>
                                    <td className="p-6 text-espresso/60">
                                        Cream Centrifuged (Machine)
                                    </td>
                                </tr>
                                <tr className="border-b border-espresso/5 dark:border-white/5">
                                    <td className="p-6 font-bold">Nutrients</td>
                                    <td className="p-6 bg-terracotta/5 font-semibold">
                                        A2 Protein, intact Vitamins
                                    </td>
                                    <td className="p-6 text-espresso/60">
                                        A1 Protein (Inflammatory)
                                    </td>
                                </tr>
                                <tr className="border-b border-espresso/5 dark:border-white/5">
                                    <td className="p-6 font-bold">Aroma</td>
                                    <td className="p-6 bg-terracotta/5 font-semibold">
                                        Divine, nutty, rich
                                    </td>
                                    <td className="p-6 text-espresso/60">
                                        Bland or Artificial Essence
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold">Packaging</td>
                                    <td className="p-6 bg-terracotta/5 rounded-b-2xl font-semibold">
                                        Glass Jar (Non-toxic)
                                    </td>
                                    <td className="p-6 text-espresso/60">
                                        Plastic (Leaches Chemicals)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            {/* SECTION 3: GOLDEN RITUALS (Usage) */}
            <Section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                                Golden Rituals
                            </h2>
                            <p className="text-lg text-espresso/70 dark:text-ivory/70 mb-8 leading-relaxed">
                                Most &apos;ghee&apos; in the market is machine-processed cream oil.
                                Ours is <strong>Sacred Bilona Ghee</strong>. We start with pure A2
                                milk from free-grazing Gir cows, turn it into curd, churn the curd
                                by hand to extract butter (makkhan), and slowly heat it over a wood
                                fire to create liquid gold.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "The Morning Teaspoon",
                                        desc: "1 tsp on empty stomach lubricates joints and improves vision.",
                                    },
                                    {
                                        title: "Cooking Medium",
                                        desc: "High smoke point (250°C). Doesn't turn toxic like vegetable oils.",
                                    },
                                    {
                                        title: "Nasya (Nasal Drops)",
                                        desc: "2 warm drops in nose enhances memory and treats headaches.",
                                    },
                                    {
                                        title: "Skin Glow",
                                        desc: "Massage on face for radiantly glowing, hydrated skin.",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-6 bg-creme-dark dark:bg-midnight-mid rounded-xl border-l-4 border-terracotta"
                                    >
                                        <h3 className="font-bold text-espresso dark:text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-espresso/70 dark:text-ivory/70">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/assets/img/products/a2desicowgheeglassjarbilonamethod.png"
                                alt="Golden Ghee Rituals"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* PRODUCT CTA */}
            <Section className="py-24 bg-white dark:bg-midnight-light border-t border-espresso/5">
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
