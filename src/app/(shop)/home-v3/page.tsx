
import { CategoryIconStrip } from "@/components/patterns/v2/CategoryIconStrip";
import { ComboCarousel } from "@/components/patterns/v2/ComboCarousel";
import { HeroSlider } from "@/components/patterns/v2/HeroSlider";
import { ProductCollection } from "@/components/patterns/v2/ProductCollection";
import { TrustStrip } from "@/components/patterns/v2/TrustStrip";
import { FAQPageSchema, HowToSchema } from "@/components/seo/JsonLd";
import { getProducts } from "@/lib/fetchProducts";
import { getGoogleReviews, getInstagramPosts } from "@/lib/fetchSocials";
import type { Metadata } from "next";

// V3 Story Components
import { ToxicityAuditDark } from "@/components/patterns/v3/ToxicityAuditDark";
import { KitchenQuizDark } from "@/components/patterns/v3/KitchenQuizDark";
import { SustainabilityImpactDark } from "@/components/patterns/v3/SustainabilityImpactDark";
import { DhartiGauMataSection } from "@/components/patterns/v3/DhartiGauMataSection";
import { StoryTransition } from "@/components/patterns/v3/StoryTransition";

// Story & Mission
import { FarmTimeline } from "@/components/patterns/v2/FarmTimeline";
import { GoogleReviews } from "@/components/patterns/v2/GoogleReviews";
import { FouitaInstagramWidget } from "@/components/patterns/v2/FouitaInstagramWidget";
import { MissionBridge } from "@/components/patterns/v2/MissionBridge";
import { OurMission } from "@/components/patterns/v2/OurMission";

// Product Spotlights
import { FarmTourCTA } from "@/components/patterns/FarmTourCTA";
import { FreshDelivery } from "@/components/patterns/FreshDelivery";
import { LabReports } from "@/components/patterns/LabReports";
import { PremiumStats } from "@/components/patterns/PremiumStats";
import { GheeSpotlight } from "@/components/patterns/v2/GheeSpotlight";

// Social Proof & Support
import { ExpertPanel } from "@/components/patterns/ExpertPanel";
import { FAQSection } from "@/components/patterns/FAQSection";
import { Newsletter } from "@/components/patterns/Newsletter";
import { WallOfLove } from "@/components/patterns/WallOfLove";
import { LucknowOnlyBanner } from "@/components/ui/LucknowOnlyBanner";

export const metadata: Metadata = {
    title: "Amrit Milk Organic | Pure A2 Milk, Bilona Ghee & Organic Food — Lucknow",
    description: "Pure A2 Gir Cow Milk delivered fresh daily in Lucknow. Bilona Ghee, Cold-Pressed Oils, Raw Honey & Organic Grains. Serving 700+ families. Lab-tested, farm-fresh, zero preservatives.",
    robots: {
        index: false,
        follow: false,
    },
};

// FAQ Schema Data
const homePageFAQs = [
    {
        question: "What is A2 milk and why is it better?",
        answer: "A2 milk comes from indigenous Indian cows like Gir and Sahiwal breeds. It contains the A2 beta-casein protein which is easier to digest compared to A1 protein found in regular milk. A2 milk is naturally richer in nutrients and doesn't cause digestive discomfort.",
    },
    {
        question: "Do you deliver A2 milk daily in Lucknow?",
        answer: "Yes, we deliver fresh A2 Gir cow milk daily across Lucknow. Our milk is milked at 4 AM and delivered by 8 AM the same morning, ensuring maximum freshness and nutritional value.",
    },
    {
        question: "What is Bilona ghee and how is it different?",
        answer: "Bilona ghee is made using the traditional Vedic method where curd is churned to extract butter, which is then heated to make ghee. Unlike commercial ghee made from cream, Bilona ghee retains more nutrients and has a richer flavor.",
    },
    {
        question: "Is your milk lab tested?",
        answer: "Yes, all our products are regularly tested in certified laboratories for purity, adulteration, and nutritional content. We publish our lab reports transparently so you can verify the quality yourself.",
    },
];

// HowTo Schema  
const gheeHowTo = {
    name: "How to Use Bilona Ghee for Maximum Health Benefits",
    description:
        "Learn the traditional ways to use pure A2 Bilona ghee in your daily diet for optimal health and wellness.",
    steps: [
        {
            name: "Daily Consumption",
            text: "Consume 1-2 teaspoons of pure Bilona ghee daily on an empty stomach or with warm milk for improved digestion and immunity.",
        },
        {
            name: "Cooking",
            text: "Use Bilona ghee for cooking instead of refined oils. It has a high smoke point and adds a rich, nutty flavor to your dishes.",
        },
        {
            name: "Skin Care",
            text: "Apply a small amount of ghee on dry skin or lips for natural moisturization and healing properties.",
        },
    ],
};

export default async function HomeV3() {
    let products = [];
    let reviews = [];

    try {
        products = await getProducts();
    } catch (e) {
        console.error("Failed to fetch products", e);
    }

    try {
        reviews = await getGoogleReviews();
    } catch (e) {
        console.error("Failed to fetch reviews", e);
    }

    // ── Product Filters ──────────────────────────────────────
    const bestSellers = products
        .filter((p) => p.badge || p.featured)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

    const coldPressedOils = products.filter((p) => p.category === "Cold-Pressed Oils");
    const grains = products.filter((p) => p.category === "Atta" || p.category === "Flour");
    const wellnessProducts = products.filter((p) => p.category === "Wellness" || p.category === "Other");
    const honeyProducts = products.filter((p) => p.category === "Honey");
    const riceProducts = products.filter((p) => p.category === "Rice");
    const pulses = products.filter((p) => p.category === "Pulses" || p.category === "Dal");

    // ══════════════════════════════════════════════════════════
    //  THE STORY BEGINS
    // ══════════════════════════════════════════════════════════

    return (
        <main className="flex min-h-screen flex-col bg-creme dark:bg-midnight transition-colors duration-500">
            {/* JSON-LD Schema */}
            <FAQPageSchema faqs={homePageFAQs} />
            <HowToSchema {...gheeHowTo} />

            {/* ═══════════════════════════════════════════════
                ACT 1: THE PROMISE — Hook their heart
               ═══════════════════════════════════════════════ */}
            <HeroSlider />

            {/* ═══════════════════════════════════════════════
                ACT 2: THE CRISIS — Show the problem
               ═══════════════════════════════════════════════ */}
            <StoryTransition
                text="But first… do you know what's really in your milk?"
                theme="dramatic"
            />
            <ToxicityAuditDark />

            <StoryTransition
                text="Take the test. Most Indian kitchens fail."
            />
            <KitchenQuizDark />

            {/* ═══════════════════════════════════════════════
                ACT 3: THE ORIGIN — Introduce the hero
               ═══════════════════════════════════════════════ */}
            <StoryTransition
                text="This is what drives us — a sacred duty to Dharti Mata and Gau Mata."
                theme="gradient"
            />
            <DhartiGauMataSection />

            <StoryTransition
                text="It didn't start as a business. It started with 5 cows and a father's love."
            />
            <FarmTimeline />

            <StoryTransition
                text="Not a brand. A movement."
                theme="gradient"
            />
            <OurMission />
            <MissionBridge />

            {/* ═══════════════════════════════════════════════
                ACT 4: THE PROOF — Show what we built
               ═══════════════════════════════════════════════ */}
            <StoryTransition
                text="Purity demands responsibility. Here's ours."
            />
            <SustainabilityImpactDark />
            <PremiumStats />

            {/* ═══════════════════════════════════════════════
                ACT 5: THE PRODUCTS — The solutions
               ═══════════════════════════════════════════════ */}
            <StoryTransition
                text="Now, experience the result — food you can finally trust."
                theme="gradient"
            />

            {/* Quick Navigation */}
            <CategoryIconStrip />

            {/* Customer Favorites */}
            <ProductCollection
                items={bestSellers}
                title="Customer Favorites"
                subtitle="Trusted by 700+ Families Daily"
                description="The products that built our reputation — loved by thousands, verified by lab reports, delivered with devotion."
                backgroundTheme="light"
            />

            {/* Ghee — The Flagship */}
            <StoryTransition
                text="Our most sacred product — churned the Vedic way."
            />
            <GheeSpotlight />

            {/* Cold Pressed Oils — The Kitchen */}
            <ProductCollection
                items={coldPressedOils}
                category="Oils"
                title="Cold Pressed Oils"
                subtitle="The Oils Your Grandmother Cooked With"
                description="Yellow Mustard, Black Sesame, Coconut — extracted using traditional wooden kolhu presses. No heat. No chemicals. Just pure nutrition."
                backgroundTheme="creme"
            />

            {/* Milk — The Daily Ritual */}
            <StoryTransition
                text="Fresh at 4 AM. At your doorstep by 8 AM. Every single morning."
                theme="gradient"
            />
            <LucknowOnlyBanner dismissible={false} persistent={true} />
            <ProductCollection
                category="Dairy"
                title="Pure A2 Milk"
                subtitle="Fresh Daily in Lucknow — 700+ Families Served"
                description="Gir Cow, Sahiwal, Buffalo — milked at dawn, chilled to 4°C, sealed in glass. Subscribe for daily doorstep delivery."
                backgroundTheme="light"
            />

            {/* Grains — The Staples */}
            <ProductCollection
                items={grains}
                category="Atta"
                title="Stone-Ground Grains"
                subtitle="Milled the Way It Was Meant to Be"
                description="Khapli Atta (Non-GMO heritage wheat), Multigrain, Besan, Corn Flour — freshly stone-ground to preserve every nutrient."
                backgroundTheme="creme"
            />

            {/* Honey — The Forest */}
            <StoryTransition
                text="Straight from wild forest beehives to your kitchen."
            />
            <ProductCollection
                items={honeyProducts}
                category="Honey"
                title="Raw Forest Honey"
                subtitle="Unfiltered • Unprocessed • Uncompromised"
                description="Collected by tribal beekeepers from deep forest hives. Never heated, never blended — nature's purest medicine."
                backgroundTheme="light"
            />

            {/* Rice — The Health Choice */}
            <ProductCollection
                items={riceProducts}
                category="Rice"
                title="Premium Rice"
                subtitle="India's First Low-GI Rice for Diabetic Families"
                description="Clinically proven to maintain healthy blood sugar. Traditional varieties grown without pesticides."
                backgroundTheme="creme"
            />

            {/* Wellness — The Healing */}
            <StoryTransition
                text="Ancient Ayurvedic remedies, reimagined for the modern Indian home."
            />
            <ProductCollection
                items={wellnessProducts}
                title="Essential Wellness"
                subtitle="Bull Balm • Herbal Spray • Natural Wax • Therapeutic Oils"
                description="Handcrafted herbal remedies for muscle relief, joint care, and daily wellness — rooted in centuries of Ayurvedic wisdom."
                backgroundTheme="light"
            />

            {/* Pulses */}
            <ProductCollection
                items={pulses}
                category="Pulses"
                title="Farm-Fresh Pulses"
                subtitle="Stone-Cleaned • Unpolished • Chemical-Free"
                description="Toor Dal, Chana Dal, Moong Dal, Urad Dal — sourced directly from farmer collectives, cleaned the traditional way."
                backgroundTheme="creme"
            />

            {/* ═══════════════════════════════════════════════
                ACT 6: TRUST — Validate everything
               ═══════════════════════════════════════════════ */}
            <StoryTransition
                text="Don't just trust us. Verify."
                theme="gradient"
            />

            {/* Lab Reports — The Proof */}
            <LabReports />

            {/* Social Proof Block */}
            <GoogleReviews reviews={reviews} />
            <TrustStrip />
            <ExpertPanel />
            <WallOfLove />

            {/* ═══════════════════════════════════════════════
                ACT 7: ACTION — Convert & Invite
               ═══════════════════════════════════════════════ */}
            <StoryTransition
                text="Come see it yourself. Walk our farms. Meet our cows."
                theme="gradient"
            />

            {/* Combos & Farm Tour */}
            <ComboCarousel />
            <FreshDelivery />
            <FarmTourCTA />

            {/* Community */}
            <FouitaInstagramWidget />

            {/* Support */}
            <FAQSection />
            <Newsletter />
        </main>
    );
}
