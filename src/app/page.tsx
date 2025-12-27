import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";

// Existing patterns
import { Manifesto } from "@/components/patterns/Manifesto";
import { KitchenQuiz } from "@/components/patterns/KitchenQuiz";
import { AdvancedProductShowcase } from "@/components/patterns/AdvancedProductShowcase";
import { VitalityMatrix } from "@/components/patterns/VitalityMatrix";
import { SubscriptionPlans } from "@/components/patterns/SubscriptionPlans";
import { SovereignCompare } from "@/components/patterns/SovereignCompare";
import { VantageGrid } from "@/components/patterns/VantageGrid";
import { ProductStrips } from "@/components/patterns/ProductStrips";
import { FinalImperialCTA } from "@/components/patterns/FinalImperialCTA";

// NEW patterns
import { ToxicityAudit } from "@/components/patterns/ToxicityAudit";
import { PurePath } from "@/components/patterns/PurePath";
import { WallOfLove } from "@/components/patterns/WallOfLove";
import { FarmTourCTA } from "@/components/patterns/FarmTourCTA";
import { Storyteller } from "@/components/patterns/Storyteller";
import { GirWisdom } from "@/components/patterns/GirWisdom";
import { LabReports } from "@/components/patterns/LabReports";
import { ExpertPanel } from "@/components/patterns/ExpertPanel";
import { FounderNote } from "@/components/patterns/FounderNote";
import { TrustTicker } from "@/components/patterns/TrustTicker";
import { FAQSection } from "@/components/patterns/FAQSection";

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* ═══════════════════════════════════════════════════════════
                1. HERO SECTION
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative w-full h-[110vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden -mt-20">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-transparent to-midnight z-10"></div>

                {/* Abstract Background */}
                <div className="absolute inset-0 bg-[url('/assets/img/hero-luxe-bg.png')] bg-cover bg-center z-0 scale-105 animate-slow-zoom"></div>

                <div className="relative z-20 max-w-5xl space-y-10 animate-fade-in-up pt-20">
                    <span className="inline-block px-8 py-3 bg-midnight/80 backdrop-blur-md border border-gold rounded-full text-gold font-bold tracking-[0.25em] text-xs md:text-sm uppercase shadow-2xl">
                        Lucknow's Gold Standard
                    </span>
                    <h1 className="font-serif text-6xl md:text-9xl font-black leading-tight drop-shadow-2xl">
                        Purity, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-gold to-ivory bg-300% animate-shine">
                            Sovereign.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-ivory font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                        Discover the raw majesty of A2 Desi Gir Cow Milk. <br className="hidden md:block" />
                        Native DNA. Sterilized Glass. Delivered within 4 hours.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Button href="/subscription-hub#plans" size="lg" icon className="bg-gold text-midnight hover:bg-white hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]">Reserve Your Bottle</Button>
                        <Button href="/the-farm" variant="glass" size="lg">Watch Farm Tour</Button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                2. TRUST TICKER (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <TrustTicker />

            {/* ═══════════════════════════════════════════════════════════
                3. TOXICITY AUDIT - THE CRISIS (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <ToxicityAudit />

            {/* ═══════════════════════════════════════════════════════════
                4. STORYTELLER - FOUNDER'S STORY (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <Storyteller />

            {/* ═══════════════════════════════════════════════════════════
                5. GIR WISDOM - A2 SCIENCE (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <GirWisdom />

            {/* ═══════════════════════════════════════════════════════════
                6. PURE PATH - FARM TO DOORSTEP TIMELINE (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <PurePath />

            {/* ═══════════════════════════════════════════════════════════
                7. ADVANCED PRODUCT SHOWCASE
            ═══════════════════════════════════════════════════════════ */}
            <AdvancedProductShowcase />

            {/* ═══════════════════════════════════════════════════════════
                8. PRODUCT STRIPS - THE COLLECTION
            ═══════════════════════════════════════════════════════════ */}
            <ProductStrips />

            {/* ═══════════════════════════════════════════════════════════
                9. WALL OF LOVE - TESTIMONIALS (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <WallOfLove />

            {/* ═══════════════════════════════════════════════════════════
                10. EXPERT PANEL - DOCTOR ENDORSEMENTS (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <ExpertPanel />

            {/* ═══════════════════════════════════════════════════════════
                11. FARM TOUR CTA - PARALLAX (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <FarmTourCTA />

            {/* ═══════════════════════════════════════════════════════════
                12. VITALITY MATRIX - ROI CALCULATOR
            ═══════════════════════════════════════════════════════════ */}
            <VitalityMatrix />

            {/* ═══════════════════════════════════════════════════════════
                13. SUBSCRIPTION PLANS
            ═══════════════════════════════════════════════════════════ */}
            <SubscriptionPlans />

            {/* ═══════════════════════════════════════════════════════════
                14. SOVEREIGN COMPARE TABLE
            ═══════════════════════════════════════════════════════════ */}
            <SovereignCompare />

            {/* ═══════════════════════════════════════════════════════════
                15. LAB REPORTS - TRANSPARENCY (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <LabReports />

            {/* ═══════════════════════════════════════════════════════════
                16. VANTAGE GRID - BENEFITS
            ═══════════════════════════════════════════════════════════ */}
            <VantageGrid />

            {/* ═══════════════════════════════════════════════════════════
                17. FOUNDER NOTE - PERSONAL MESSAGE (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <FounderNote />

            {/* ═══════════════════════════════════════════════════════════
                18. FAQ SECTION (NEW)
            ═══════════════════════════════════════════════════════════ */}
            <FAQSection />

            {/* ═══════════════════════════════════════════════════════════
                19. FINAL IMPERIAL CTA
            ═══════════════════════════════════════════════════════════ */}
            <FinalImperialCTA />

        </main>
    );
}
