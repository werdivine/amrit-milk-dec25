/**
 * Ghee Page - Sovereign Edition
 * Features: Parallax Hero, Chef's Rituals, Transparency Lab, Wall of Love, Sticky CTA
 */
"use client";

import { Section } from "@/components/ui/section";
import { products } from "@/lib/products";
import {
    ArrowRight,
    Check,
    ChefHat,
    Flame,
    Plus,
    ScrollText,
    ShieldCheck,
    ShoppingBag,
    Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GheePage() {
    const gheeProduct = products.find((p) => p.id === "ghee-cow-1kg");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-creme dark:bg-midnight overflow-hidden">
            {/* ═══════════════════════════════════════════════════════════
                 1. PARALLAX HERO SECTION (Video-like)
            ═══════════════════════════════════════════════════════════ */}
            <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                {/* Parallax Background Layer */}
                <div className="absolute inset-0 z-0 animate-ken-burns">
                    <Image
                        src="/assets/img/generated/amrit_ghee_pouring_macro.png" // The new high-res pouring asset
                        alt="Amrit A2 Ghee Pouring"
                        fill
                        className="object-cover opacity-90 scale-105"
                        priority
                    />
                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-creme via-black/20 to-black/60 dark:from-midnight dark:via-black/40 dark:to-black/80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/50" />
                </div>

                <div className="container relative z-10 px-4 text-center mt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in-up shadow-lg">
                        <Flame className="w-4 h-4 text-gold-light" /> Vedic Liquid Gold
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 drop-shadow-2xl animate-fade-in-up delay-100 tracking-tight leading-none">
                        Pure A2 <br />
                        <span className="text-gold-light italic">Gir Cow Ghee</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-creme-light max-w-3xl mx-auto mb-10 drop-shadow-lg animate-fade-in-up delay-200 font-light leading-relaxed">
                        Hand-churned Bilona. Wood-fired.{" "}
                        <span className="text-white font-medium">Sacred energy in a jar.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
                        <Link
                            href={`/products/${gheeProduct?.slug}`}
                            className="w-full sm:w-auto px-10 py-5 bg-terracotta hover:bg-terracotta-dark text-white rounded-full font-bold text-xl shadow-gold/20 shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                        >
                            <ShoppingBag className="w-6 h-6 group-hover:animate-bounce" />
                            Buy Now - {gheeProduct?.price}
                        </Link>
                        <a
                            href="#rituals"
                            className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-xl transition-all flex items-center justify-center gap-2"
                        >
                            <ChefHat className="w-6 h-6" />
                            Chef&apos;s Rituals
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
                    <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                 2. THE TRUTH (Comparison)
            ═══════════════════════════════════════════════════════════ */}
            <Section className="py-24 relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-terracotta/5 -skew-x-12 z-0" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 block">
                                The Reality Check
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory mb-8">
                                Not All Ghee is <br />
                                <span className="italic text-terracotta">Created Equal.</span>
                            </h2>
                            <p className="text-lg text-espresso/70 dark:text-ivory/70 mb-8 leading-relaxed">
                                90% of &quot;Ghee&quot; on shelves is processed cream oil. Amrit is{" "}
                                <strong>Sacred Bilona Ghee</strong>—made from curd, churned by hand,
                                and slow-cooked over wood fire.
                            </p>

                            <div className="bg-white dark:bg-midnight-light rounded-2xl shadow-xl overflow-hidden border border-espresso/10">
                                <div className="grid grid-cols-3 bg-espresso/5 dark:bg-white/5 border-b border-espresso/10 p-4 text-xs font-bold uppercase tracking-widest text-espresso/50 dark:text-ivory/50">
                                    <div>Feature</div>
                                    <div className="text-terracotta">Amrit Ghee</div>
                                    <div>Others</div>
                                </div>
                                {[
                                    {
                                        label: "Source",
                                        amrit: "Gir Cow Curd",
                                        common: "Buffalo Cream",
                                    },
                                    {
                                        label: "Method",
                                        amrit: "Hand Churned",
                                        common: "Machine Centrifuge",
                                    },
                                    {
                                        label: "Vessel",
                                        amrit: "Clay Pot Heat",
                                        common: "Steel Factory",
                                    },
                                    {
                                        label: "Aroma",
                                        amrit: "Divine & Nutty",
                                        common: "Bland/Oily",
                                    },
                                ].map((row, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-3 p-5 border-b border-espresso/5 last:border-0 hover:bg-terracotta/5 transition-colors"
                                    >
                                        <div className="font-bold text-espresso dark:text-ivory">
                                            {row.label}
                                        </div>
                                        <div className="font-bold text-terracotta flex items-center gap-2">
                                            <Check className="w-4 h-4" /> {row.amrit}
                                        </div>
                                        <div className="text-espresso/40 dark:text-ivory/40">
                                            {row.common}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 group">
                            <Image
                                src="/assets/img/products/a2desicowgheeglassjarbilonamethod.png"
                                alt="Amrit Ghee Jar"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            {/* Floating Stats Card */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/95 dark:bg-midnight/95 backdrop-blur shadow-xl p-6 rounded-xl border border-espresso/10">
                                <div className="flex justify-between text-center divide-x divide-espresso/10">
                                    <div className="px-4 first:pl-0">
                                        <div className="text-3xl font-bold text-terracotta">
                                            30kg
                                        </div>
                                        <div className="text-xs uppercase tracking-wider text-espresso/50">
                                            Curd
                                        </div>
                                    </div>
                                    <div className="px-4">
                                        <div className="text-3xl font-bold text-terracotta">
                                            1kg
                                        </div>
                                        <div className="text-xs uppercase tracking-wider text-espresso/50">
                                            Ghee
                                        </div>
                                    </div>
                                    <div className="px-4 last:pr-0">
                                        <div className="text-3xl font-bold text-terracotta">0%</div>
                                        <div className="text-xs uppercase tracking-wider text-espresso/50">
                                            Machines
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════
                 3. CHEF'S RITUALS (Recipes)
            ═══════════════════════════════════════════════════════════ */}
            <Section
                className="bg-espresso dark:bg-black py-24 text-white overflow-hidden"
                id="rituals"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-2 block">
                                Culinary Excellence
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
                                The Chef&apos;s Secret
                            </h2>
                        </div>
                        <p className="text-white/60 max-w-md text-lg">
                            Elevate your daily nutrition. Ghee is the perfect carrier for spices and
                            nutrients.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Bulletproof Coffee",
                                desc: "Blend 1 tsp into black coffee. The fats fuel your brain and prevent caffeine crashes.",
                                icon: "☕",
                            },
                            {
                                title: "The Perfect Tadka",
                                desc: "Temper cumin and mustard seeds in hot ghee. The aroma will fill your entire home.",
                                icon: "🥘",
                            },
                            {
                                title: "Roti Transformation",
                                desc: "Brush on hot rotis. It lowers the Glycemic Index (GI) and keeps them soft for hours.",
                                icon: "🫓",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                            >
                                <div className="absolute -right-6 -top-6 text-9xl opacity-5 group-hover:opacity-10 transition-opacity select-none grayscale">
                                    {item.icon}
                                </div>
                                <div className="text-4xl mb-6 bg-gold/20 w-16 h-16 rounded-full flex items-center justify-center text-gold shadow-lg shadow-gold/10">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-gold transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════
                 4. TRUST & LABORATORY (Transparency)
            ═══════════════════════════════════════════════════════════ */}
            <Section className="py-24 bg-creme-dark dark:bg-midnight-mid">
                <div className="container mx-auto px-4">
                    <div className="bg-white dark:bg-midnight rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden border border-espresso/5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 text-green-600 font-bold bg-green-100 px-4 py-1 rounded-full text-xs uppercase tracking-wide mb-6">
                                    <ShieldCheck className="w-4 h-4" /> Lab Certified Purity
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                                    What You See <br />
                                    Is What You Eat.
                                </h2>
                                <p className="text-lg text-espresso/70 dark:text-ivory/70 mb-8">
                                    We don&apos;t just claim purity; we prove it. Every batch is
                                    tested in an NABL Accredited Laboratory for 18 parameters
                                    specifically for Ghee.
                                </p>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Zero Adulteration (Vegetable Oil Check)",
                                        "Reichert Meissl (RM) Value > 28",
                                        "Pesticide & Chemical Free",
                                    ].map((pt, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 font-bold text-espresso dark:text-white"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                                <button className="px-8 py-4 border-2 border-espresso/10 hover:border-espresso hover:bg-espresso hover:text-white rounded-xl font-bold transition-all flex items-center gap-2 text-espresso dark:text-ivory dark:border-white/10 dark:hover:bg-white dark:hover:text-black">
                                    <ScrollText className="w-5 h-5" /> View Latest Lab Report
                                </button>
                            </div>

                            {/* Certificate Mockup */}
                            <div className="relative w-full max-w-md aspect-[3/4] bg-white shadow-lg border border-gray-200 p-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="border-4 border-double border-gray-200 h-full p-6 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full mb-6 mx-auto flex items-center justify-center grayscale opacity-50">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-serif font-bold text-2xl text-gray-800 mb-2">
                                        Certificate of Analysis
                                    </h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">
                                        NABL Accredited Lab
                                    </p>

                                    <div className="w-full space-y-4 text-left text-sm text-gray-600 mb-8">
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span>Product</span>{" "}
                                            <span className="font-bold">A2 Desi Ghee</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span>Acidity</span>{" "}
                                            <span className="font-bold text-green-600">
                                                0.4% (Pass)
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span>RM Value</span>{" "}
                                            <span className="font-bold text-green-600">
                                                29.2 (Pass)
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span>Lead/Arsenic</span>{" "}
                                            <span className="font-bold text-green-600">
                                                Not Detected
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-auto w-24 h-24 relative">
                                        <Image
                                            src="/assets/img/stamp.png"
                                            alt="Stamp"
                                            fill
                                            className="object-contain opacity-20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════
                 5. THE 5 SANSKARS (Process Timeline)
            ═══════════════════════════════════════════════════════════ */}
            <Section className="py-24 bg-white dark:bg-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 block">
                            Ancient Wisdom
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                            The 5 Sanskars of Bilona
                        </h2>
                        <p className="max-w-2xl mx-auto text-espresso/60 dark:text-ivory/60">
                            We follow the strict Ayurvedic text of <i>Charaka Samhita</i>. No
                            shortcuts, no cream separators.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Mobile: Hidden, Desktop: Visible) */}
                        <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-espresso/5 dark:bg-white/10 -z-10"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            {[
                                { step: "01", title: "DOHAN", desc: "Milking pure A2 Gir Cows." },
                                {
                                    step: "02",
                                    title: "JAAGRAN",
                                    desc: "Boiling & turning milk into Curd.",
                                },
                                {
                                    step: "03",
                                    title: "MANTHAN",
                                    desc: "Hand-churning Curd roughly.",
                                },
                                {
                                    step: "04",
                                    title: "MAKKHAN",
                                    desc: "Extracting pure white butter.",
                                },
                                { step: "05", title: "TAPAN", desc: "Slow heating on wood fire." },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-16 h-16 rounded-full bg-creme dark:bg-midnight border-2 border-gold flex items-center justify-center text-xl font-bold text-terracotta mb-6 shadow-xl relative z-10 group-hover:scale-110 transition-transform bg-white">
                                        {item.step}
                                    </div>
                                    <h3 className="font-bold text-lg text-espresso dark:text-ivory mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-espresso/60 dark:text-ivory/60">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href={`/products/${gheeProduct?.slug}`}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1"
                        >
                            <ShoppingBag className="w-5 h-5" /> Experience the Process
                        </Link>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════
                 6. FAQ SECTION
            ═══════════════════════════════════════════════════════════ */}
            <Section className="py-24 bg-creme dark:bg-midnight-dark">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-espresso dark:text-ivory mb-12 text-center">
                        Common Questions
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Is this Ghee grainy (Danedar)?",
                                a: "Yes, absolutely. The 'Daana' (grain) develops naturally because of our slow cooling process ensuring the traditional texture.",
                            },
                            {
                                q: "How long does it last?",
                                a: "Since we remove all moisture during the heating process, our Ghee has a natural shelf life of 12 months without refrigeration.",
                            },
                            {
                                q: "Is it suitable for lactose intolerant people?",
                                a: "Generally, yes. The fermentation process (curd) and heating remove most milk solids and lactose, leaving pure healthy fats.",
                            },
                            {
                                q: "Why is it more expensive than market ghee?",
                                a: "It takes 30-35 liters of A2 milk to make just 1 kg of our Ghee. Market ghee is often made from cream or mixed milk, which is cheaper but lacks medicinal value.",
                            },
                        ].map((item, i) => (
                            <details
                                key={i}
                                className="group bg-white dark:bg-midnight border border-espresso/5 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer open:ring-1 open:ring-gold/50 shadow-sm transition-all hover:shadow-md"
                            >
                                <summary className="flex items-center justify-between gap-4 font-bold text-lg text-espresso dark:text-ivory marker:content-none">
                                    {item.q}
                                    <span className="transition group-open:rotate-180">
                                        <Plus className="w-5 h-5 opacity-50" />
                                    </span>
                                </summary>
                                <div className="mt-4 text-espresso/70 dark:text-ivory/70 leading-relaxed border-t border-espresso/5 pt-4">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════
                 7. WALL OF LOVE (Reviews)
            ═══════════════════════════════════════════════════════════ */}
            <Section className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-terracotta font-bold tracking-widest uppercase text-sm mb-2 block">
                        Community
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-16">
                        Loved by 5000+ Families
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Priya S.",
                                city: "Mumbai",
                                text: "The aroma takes me back to my village. My kids love it on their parathas. Absolutely authentic.",
                            },
                            {
                                name: "Rahul M.",
                                city: "Bangalore",
                                text: "I tried 5 different 'organic' brands. This is the only one that actually tastes like Bilona ghee. The texture is grainy and perfect.",
                            },
                            {
                                name: "Dr. Anjali",
                                city: "Delhi",
                                text: "As an Ayurvedic doctor, I recommend Amrit ghee to my patients for joint health. The purity is evident.",
                            },
                        ].map((review, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-midnight-light p-8 rounded-2xl shadow-lg border-t-4 border-terracotta text-left"
                            >
                                <div className="flex gap-1 text-gold mb-4">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-espresso/70 dark:text-ivory/70 mb-6 italic">
                                    &quot;{review.text}&quot;
                                </p>
                                <div className="font-bold text-espresso dark:text-white">
                                    {review.name}
                                </div>
                                <div className="text-xs text-espresso/40 dark:text-ivory/40 uppercase">
                                    {review.city}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Extra CTA after Reviews */}
                    <div className="mt-12">
                        <Link
                            href={`/products/${gheeProduct?.slug}`}
                            className="inline-block px-12 py-4 border-2 border-espresso/10 hover:border-terracotta text-terracotta font-bold rounded-full transition-colors uppercase tracking-widest text-sm"
                        >
                            Read more reviews on product page
                        </Link>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════
                 8. STICKY MOBILE CTA
            ═══════════════════════════════════════════════════════════ */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-midnight border-t border-gray-200 dark:border-gray-800 p-4 z-50 transition-transform duration-300 md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.1)] ${scrolled ? "translate-y-0" : "translate-y-full"}`}
            >
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                            Limited Batch
                        </div>
                        <div className="font-bold text-lg text-terracotta">
                            {gheeProduct?.price}
                        </div>
                    </div>
                    <Link
                        href={`/products/${gheeProduct?.slug}`}
                        className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                    >
                        Add to Cart <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* DESKTOP FLOATING CTA */}
            <div
                className={`fixed bottom-8 right-8 z-50 transition-all duration-500 hidden md:block ${scrolled ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
            >
                <Link
                    href={`/products/${gheeProduct?.slug}`}
                    className="bg-terracotta hover:bg-terracotta-dark text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform"
                >
                    <ShoppingBag className="w-5 h-5" /> Buy Ghee - {gheeProduct?.price}
                </Link>
            </div>
        </div>
    );
}
