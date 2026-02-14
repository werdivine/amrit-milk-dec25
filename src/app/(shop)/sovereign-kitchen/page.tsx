"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { ProductSpotlight } from "@/components/patterns/ProductSpotlight";
import { motion } from "framer-motion";
import { Sparkles, Droplets, Sun, Sprout } from "lucide-react";

// Dynamically import interactive components to avoid hydration mismatches
const KitchenQuiz = dynamic(() => import("@/components/patterns/KitchenQuiz").then(mod => mod.KitchenQuiz), { ssr: false });
const PurityCalculator = dynamic(() => import("@/components/patterns/PurityCalculator").then(mod => mod.PurityCalculator), { ssr: false });
const ComparisonTable = dynamic(() => import("@/components/patterns/ComparisonTable").then(mod => mod.ComparisonTable), { ssr: false });
const LabTrust = dynamic(() => import("@/components/patterns/LabTrust").then(mod => mod.LabTrust), { ssr: false });
const TestimonialCarousel = dynamic(() => import("@/components/patterns/TestimonialCarousel").then(mod => mod.TestimonialCarousel), { ssr: false });
const SustainabilityStory = dynamic(() => import("@/components/patterns/v2/SustainabilityStory").then(mod => mod.SustainabilityStory), { ssr: false });

export default function SovereignKitchenPage() {
    return (
        <main className="bg-creme dark:bg-midnight transition-colors duration-500 overflow-x-hidden">
            {/* 1. Hero Section - ENHANCED VISUALS */}
            <Section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/img/hero-luxe-bg.png')] opacity-10 bg-cover bg-center pointer-events-none mix-blend-multiply dark:mix-blend-overlay animate-pulse-slow" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-creme/50 to-creme dark:via-midnight/50 dark:to-midnight pointer-events-none" />

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-terracotta/5 rounded-full blur-3xl animate-float-delayed" />

                <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-8 py-3 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-bold uppercase tracking-[0.25em] mb-8 backdrop-blur-sm shadow-glow">
                            The Sovereign Standard
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-espresso dark:text-ivory leading-[1.1] mb-8 tracking-tight">
                            Is Your Kitchen <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-gold to-terracotta italic bg-[length:200%_auto] animate-shimmer">Truly Sovereign?</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-espresso/70 dark:text-ivory/70 max-w-3xl mx-auto leading-relaxed font-light">
                            Most modern kitchens are unknowingly compromised by hidden toxins.
                            <br className="hidden md:block" />
                            Discover the purity of your inputs and reclaim your family&apos;s vitality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="pt-8 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            href="#audit"
                            size="lg"
                            className="bg-espresso text-white hover:bg-terracotta dark:bg-gold dark:text-midnight dark:hover:bg-white text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all"
                        >
                            Start Purity Audit <Sparkles className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            href="#truth"
                            variant="outline"
                            size="lg"
                            className="border-espresso/20 text-espresso hover:bg-espresso/5 dark:border-ivory/20 dark:text-ivory dark:hover:bg-ivory/5 text-lg px-10 py-8 rounded-full"
                        >
                            See The Truth
                        </Button>
                    </motion.div>
                </div>
            </Section>

            {/* 2. The Truth Table (New Section) */}
            <Section id="truth" className="bg-espresso/5 dark:bg-white/5 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                            The Great Dairy Deception
                        </h2>
                        <p className="text-xl text-espresso/60 dark:text-ivory/60 max-w-2xl mx-auto">
                            Not all milk is created equal. See exactly what you&apos;ve been drinking versus what nature intended.
                        </p>
                    </div>
                    <ComparisonTable />
                </div>
            </Section>

            {/* 3. Kitchen Quiz Section */}
            <div id="audit" className="scroll-mt-20 py-12">
                <KitchenQuiz />
            </div>

            {/* 4. Lab Trust (New Section) */}
            <Section className="bg-white dark:bg-midnight border-y border-espresso/5 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left md:text-center mb-12">
                        <span className="text-terracotta font-bold uppercase tracking-widest text-xs">Scientific Verification</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-espresso dark:text-ivory mt-2">
                            Trust, Verified by Science.
                        </h2>
                    </div>
                    <LabTrust />
                </div>
            </Section>

            {/* 5. Educational Bridge */}
            <Section className="bg-espresso/5 dark:bg-white/5">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                        Why Play Russian Roulette with Health?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white dark:bg-midnight p-8 rounded-3xl shadow-sm border border-transparent hover:border-terracotta/20 transition-colors">
                            <h3 className="text-xl font-bold text-terracotta mb-4 flex items-center gap-2">
                                <span className="p-2 bg-terracotta/10 rounded-full"><Droplets className="w-5 h-5" /></span>
                                The Processed Trap
                            </h3>
                            <p className="text-espresso/70 dark:text-ivory/70 leading-relaxed">
                                Most commercial milk is stripped of nutrients, laced with synthetic hormones, and processed at high heat (UHT), destroying enzymes. It&apos;s dead white water, not milk.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-midnight p-8 rounded-3xl shadow-sm border border-transparent hover:border-emerald-500/20 transition-colors">
                            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                                <span className="p-2 bg-emerald-500/10 rounded-full"><Sun className="w-5 h-5" /></span>
                                The Sovereign Way
                            </h3>
                            <p className="text-espresso/70 dark:text-ivory/70 leading-relaxed">
                                Raw, chilled A2 milk from free-grazing Gir cows. Delivered within hours of milking. Loaded with live enzymes, A2 protein, and natural immunity.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 5a. Sustainability Story (Added) */}
            <SustainabilityStory />

            {/* 6. Product Highlight: A2 Milk */}
            <Section>
                <div className="py-12">
                    <ProductSpotlight
                        title="A2 Gir Cow Milk"
                        description="The foundational pillar of a Sovereign Kitchen. Sourced from indigenous Gir cows grazing on medicinal herbs, this is milk as nature intended—sweet, creamy, and easy to digest."
                        imageSrc="/assets/img/milk-gir.png"
                        benefits={[
                            "Zero A1 Protein (No bloating/inflammation)",
                            "Rich in Cerebrosides for brain health",
                            "Raw & Chilled (Not pasteurized)",
                            "Delivered in glass bottles, not plastic"
                        ]}
                        ctaText="Subscribe for Vitality"
                        ctaLink="/products/a2-milk-1000ml" // specific product link
                        accentColor="gold"
                    />
                </div>
            </Section>

            {/* 7. Investment Calculator */}
            <Section className="bg-espresso text-ivory dark:bg-black overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/img/hero-luxe-bg.png')] opacity-5 mix-blend-overlay pointer-events-none" />
                <div className="max-w-6xl mx-auto relative z-10 py-12">
                    <PurityCalculator />
                </div>
            </Section>

            {/* 8. Product Highlight: Ghee */}
            <Section>
                <div className="py-12">
                    <ProductSpotlight
                        title="Vedic Bilona Ghee"
                        description="Golden elixir made from fermenting A2 milk into curd, then hand-churning it to extract butter. Slow-cooked over cow dung cakes in brass vessels. This is not just fat; it&apos;s liquid gold for your joints and brain."
                        imageSrc="/assets/img/ghee-jar.png"
                        benefits={[
                            "Made from 30L of A2 Milk = 1L Ghee",
                            "Hand-churned Bilona method",
                            "Increases Ojas (Life vigor)",
                            "Highest smoke point for safe cooking"
                        ]}
                        ctaText="Add Liquid Gold"
                        ctaLink="/products/vedic-ghee-500ml"
                        reversed={true}
                        accentColor="terracotta"
                    />
                </div>
            </Section>

            {/* 9. Testimonials (New Section) */}
            <Section className="bg-creme-dark/10 dark:bg-white/5">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                            The Sovereign Circle
                        </h2>
                        <p className="text-xl text-espresso/60 dark:text-ivory/60 max-w-2xl mx-auto">
                            Hear from families who have already made the switch.
                        </p>
                    </div>
                    <TestimonialCarousel />
                </div>
            </Section>

            {/* 10. Final CTA / Lifestyle */}
            <Section className="bg-gradient-to-b from-creme to-gold/20 dark:from-midnight dark:to-gold/10 text-center py-32">
                <div className="max-w-4xl mx-auto space-y-10">
                    <Sprout className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce-slow" />
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-espresso dark:text-ivory leading-tight">
                        Join the Order.
                    </h2>
                    <p className="text-2xl text-espresso/70 dark:text-ivory/70 font-light max-w-2xl mx-auto">
                        Thousands of families have already reclaimed their kitchen sovereignty.
                        Don&apos;t let another day of processed compromises pass.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
                        <Button href="/subscription-hub" size="lg" className="w-full sm:w-auto px-12 py-8 text-xl h-auto rounded-full shadow-glow hover:scale-105 transition-transform">
                            Start Your Subscription
                        </Button>
                        <Button href="/products" variant="outline" size="lg" className="w-full sm:w-auto px-12 py-8 text-xl h-auto rounded-full hover:bg-espresso/5 dark:hover:bg-white/5">
                            Explore All Products
                        </Button>
                    </div>
                </div>
            </Section>
        </main>
    );
}
