import { CategoryIcons } from "@/components/shop/CategoryIcons";
import { FeaturedCollection } from "@/components/shop/FeaturedCollection";
import { TrustTicker } from "@/components/patterns/TrustTicker";
import { Storyteller } from "@/components/patterns/Storyteller";
import { GirWisdom } from "@/components/patterns/GirWisdom";
import { WallOfLove } from "@/components/patterns/WallOfLove";
import { FinalImperialCTA } from "@/components/patterns/FinalImperialCTA";
import { getProducts } from "@/lib/fetchProducts";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Clock, Award } from "lucide-react";

export default async function HomeV2() {
    const products = await getProducts();

    return (
        <main className="flex min-h-screen flex-col bg-white dark:bg-midnight">
            {/* ═══════════════════════════════════════════════════════════
                1. PREMIUM E-COMMERCE HERO
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image - Using a farm visual */}
                <div className="absolute inset-0 bg-[url('/assets/img/hero-luxe-bg.png')] bg-cover bg-center z-0 opacity-40 dark:opacity-60 scale-105 animate-slow-zoom"></div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-creme/90 via-creme/40 to-transparent dark:from-midnight/90 dark:via-midnight/40 dark:to-transparent z-10 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-creme dark:from-midnight via-transparent to-transparent z-10"></div>

                <div className="relative z-20 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 dark:bg-gold/10 border border-terracotta/20 dark:border-gold/20 rounded-full text-terracotta dark:text-gold font-bold text-xs uppercase tracking-widest">
                            <Star className="w-4 h-4 fill-current" /> Trusted by 10,000+ Wellness Families
                        </div>

                        <h1 className="font-serif text-6xl md:text-8xl font-black leading-tight text-espresso dark:text-ivory">
                            Pure Farm <br />
                            <span className="text-terracotta dark:text-gold italic">Excellence.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-espresso/70 dark:text-ivory/70 max-w-xl leading-relaxed">
                            Experience the raw majesty of Vedic A2 Dairy, Cold-Pressed Oils, and Raw forest Honey. Delivered from our farm to your Lucknow doorstep within 4 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button href="/products" size="lg" className="bg-espresso text-white hover:bg-terracotta dark:bg-gold dark:text-midnight dark:hover:bg-white px-10 h-16 text-lg rounded-2xl shadow-xl">
                                Shop All Products
                            </Button>
                            <Button href="/subscription-hub" variant="outline" size="lg" className="border-espresso/20 text-espresso dark:border-white/10 dark:text-white px-10 h-16 text-lg rounded-2xl">
                                Start Subscription
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-8">
                            {[
                                { icon: ShieldCheck, label: "Lab Certified" },
                                { icon: Clock, label: "4hr Freshness" },
                                { icon: Award, label: "Vedic Process" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-espresso/40 dark:text-ivory/40">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block relative group">
                        <div className="absolute inset-0 bg-terracotta/5 dark:bg-gold/5 blur-3xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                        <img
                            src="/assets/img/ghee-jar.png"
                            alt="Premium A2 Ghee"
                            className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl translate-y-4 hover:translate-y-0 transition-transform duration-700 animate-float"
                        />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                2. TRUST TICKER
            ═══════════════════════════════════════════════════════════ */}
            <TrustTicker />

            {/* ═══════════════════════════════════════════════════════════
                3. CATEGORY NAVIGATION (Anveshan Inspired)
            ═══════════════════════════════════════════════════════════ */}
            <CategoryIcons />

            {/* ═══════════════════════════════════════════════════════════
                4. FEATURED: THE GHEE COLLECTION
            ═══════════════════════════════════════════════════════════ */}
            <FeaturedCollection
                title="The Vedic Ghee Ritual"
                subtitle="High Vibrational Energy"
                category="Dairy"
                featuredOnly={true}
                description="Hand-churned using the Brahma Muhurta Bilona process. Pure A2 Gir Cow Ghee - liquid gold for your soul."
                lightBg={true}
                limit={4}
                products={products}
            />

            {/* ═══════════════════════════════════════════════════════════
                5. FEATURED: COLD PRESSED OILS
            ═══════════════════════════════════════════════════════════ */}
            <FeaturedCollection
                title="Elite Cold-Pressed Oils"
                subtitle="The Purity of Kacchi Ghani"
                category="Oils"
                description="Extraction below 40°C. No chemicals, no solvents. Just pure nutrient-dense oils enriched with native seeds."
                limit={4}
                products={products}
            />

            {/* ═══════════════════════════════════════════════════════════
                6. STORYTELLER - FOUNDER'S VISION
            ═══════════════════════════════════════════════════════════ */}
            <Storyteller />

            {/* ═══════════════════════════════════════════════════════════
                7. FEATURED: RAW FOREST HONEY
            ═══════════════════════════════════════════════════════════ */}
            <FeaturedCollection
                title="Sacred Raw Honey"
                subtitle="Untouched by Heat"
                category="Honey"
                description="Wildcrafted from the heart of the forest. Unpasteurized, enzyme-rich, and locally sourced."
                lightBg={true}
                limit={4}
                products={products}
            />

            {/* ═══════════════════════════════════════════════════════════
                8. GIR WISDOM - THE SCIENCE
            ═══════════════════════════════════════════════════════════ */}
            <GirWisdom />

            {/* ═══════════════════════════════════════════════════════════
                9. WALL OF LOVE
            ═══════════════════════════════════════════════════════════ */}
            <WallOfLove />

            {/* ═══════════════════════════════════════════════════════════
                10. FINAL CTA
            ═══════════════════════════════════════════════════════════ */}
            <FinalImperialCTA />
        </main>
    );
}
