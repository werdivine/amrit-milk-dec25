import { CategoryIconStrip } from "@/components/patterns/v2/CategoryIconStrip";
import { ComboCarousel } from "@/components/patterns/v2/ComboCarousel";
import { HeroSlider } from "@/components/patterns/v2/HeroSlider";
import { ProductCollection } from "@/components/patterns/v2/ProductCollection";
import { TrustStrip } from "@/components/patterns/v2/TrustStrip";
import { FAQPageSchema, HowToSchema } from "@/components/seo/JsonLd";
import { getProducts } from "@/lib/fetchProducts";
import { getGoogleReviews } from "@/lib/fetchSocials";
import type { Metadata } from "next";

// Sustainability & Story
import { FarmTimeline } from "@/components/patterns/v2/FarmTimeline";
import { GoogleReviews } from "@/components/patterns/v2/GoogleReviews";
import { FouitaInstagramWidget } from "@/components/patterns/v2/FouitaInstagramWidget";
import { MissionBridge } from "@/components/patterns/v2/MissionBridge";
import { OurMission } from "@/components/patterns/v2/OurMission";
import { DhartiGauMataSection } from "@/components/patterns/v3/DhartiGauMataSection";

// Content
import { FarmTourCTA } from "@/components/patterns/FarmTourCTA";
import { FreshDelivery } from "@/components/patterns/FreshDelivery";
import { GirWisdom } from "@/components/patterns/GirWisdom";
import { KitchenQuiz } from "@/components/patterns/KitchenQuiz";
import { LabReports } from "@/components/patterns/LabReports";
import { PremiumStats } from "@/components/patterns/PremiumStats";
import { ToxicityAudit } from "@/components/patterns/ToxicityAudit";
import { GheeSpotlight } from "@/components/patterns/v2/GheeSpotlight";

import { LucknowOnlyBanner } from "@/components/ui/LucknowOnlyBanner";

// Social Proof
import { ExpertPanel } from "@/components/patterns/ExpertPanel";
import { FAQSection } from "@/components/patterns/FAQSection";
import { Newsletter } from "@/components/patterns/Newsletter";
import { WallOfLove } from "@/components/patterns/WallOfLove";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee in Lucknow",
        description:
            "Pure A2 Gir Cow Milk with authentic bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered daily from our own farm in Lucknow since 2015. Order now!",
        keywords: [
            "A2 milk Lucknow",
            "Gir cow milk",
            "bilona ghee online",
            "organic milk delivery",
            "pure desi ghee",
            "farm fresh milk",
        ],
        alternates: {
            canonical: "https://amritmilkorganic.com",
        },
        openGraph: {
            title: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee",
            description:
                "Pure A2 Gir Cow Milk with authentic bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
            siteName: "Amrit Milk Organic",
            images: [
                {
                    url: "https://amritmilkorganic.com/assets/img/products/amrit_ghee_premium.png",
                    alt: "Amrit Milk A2 Bilona Ghee",
                    width: 1200,
                    height: 630,
                },
            ],
            type: "website",
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee",
            description:
                "Pure A2 Gir Cow Milk with authentic bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
            images: ["https://amritmilkorganic.com/assets/img/products/amrit_ghee_premium.png"],
        },
    };
}

// FAQ Schema data
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

// HowTo Schema data for making ghee at home
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

const GHEE_SLUG = "a2-cow-ghee-1kg";
const HONEY_SLUG = "multiflora-honey-1kg";
const MILK_SLUG = "a2-gir-cow-milk-1l";
const COMBO_SLUG = "wellness-trio-pack";

const COLD_PRESSED_OIL_SLUGS = [
    "yellow-mustard-oil-1l",
    "black-mustard-oil-1l",
    "sesame-til-oil-1l",
    "coconut-oil-1l-premium",
];

export default async function Home() {
    const products = await getProducts();

    // Vedic Kitchen Treasures: Only 1 product each - Ghee, Honey, Milk, Combo
    const gheeProduct = products.find((p) => p.slug === GHEE_SLUG);
    const honeyProduct = products.find((p) => p.slug === HONEY_SLUG);
    const milkProduct = products.find((p) => p.slug === MILK_SLUG);
    const comboProduct = products.find((p) => p.slug === COMBO_SLUG);
    const pantryEssentials = [gheeProduct, honeyProduct, milkProduct, comboProduct].filter(Boolean);

    // Customer Favorites: Only 4 Cold-Pressed Oils in specific order
    // Yellow Mustard -> Black Mustard -> Sesame -> Coconut
    const coldPressedOils = COLD_PRESSED_OIL_SLUGS.map((slug) =>
        products.find((p) => p.slug === slug)
    ).filter(Boolean);

    // Randomize Best Sellers (excluding Cold Pressed Oils which will be shown separately)
    const bestSellers = products
        .filter((p) => (p.badge || p.featured) && p.category !== "Cold-Pressed Oils")
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

    const superfoods = products
        .filter((p) => p.category === "Wellness" || p.category === "Other")
        .slice(0, 8);
    // Grains: Kala Jeera Low GI first, Basmati & Kala Namak at end
    const GRAINS_LAST_SLUGS = ["premium-basmati-rice-1kg", "kala-namak-rice-1kg"];
    const grains = products
        .filter((p) => p.category === "Atta" || p.category === "Rice")
        .sort((a, b) => {
            const aIsLast = GRAINS_LAST_SLUGS.includes(a.slug);
            const bIsLast = GRAINS_LAST_SLUGS.includes(b.slug);
            if (aIsLast && !bIsLast) return 1;
            if (!aIsLast && bIsLast) return -1;
            return 0;
        });

    const reviews = await getGoogleReviews();

    return (
        <main className="flex min-h-screen flex-col bg-creme dark:bg-midnight transition-colors duration-500">
            {/* JSON-LD Schema Markup */}
            <FAQPageSchema faqs={homePageFAQs} />
            <HowToSchema {...gheeHowTo} />

            {/* Lucknow-Only Delivery Banner */}
            <LucknowOnlyBanner persistent={true} dismissible={false} />

            {/* 1. THE PROMISE */}
            <HeroSlider />

            {/* 2. QUICK NAVIGATION */}
            <CategoryIconStrip />

            {/* 3. VEDIC KITCHEN TREASURES - Ordered: Ghee, Honey, Milk, Combo */}
            <ProductCollection
                items={pantryEssentials}
                category="Oils"
                title="Vedic Kitchen Treasures"
                subtitle="Ghee • Honey • Milk • Combos"
                description="Pure Bilona Ghee, Raw Honey, Fresh A2 Milk, and Combo Packs. The foundation of a healthy kitchen."
                backgroundTheme="light"
            />

            {/* 3.1. CUSTOMER FAVORITES - Cold Pressed Oils: Yellow Mustard, Black Mustard, Sesame, Coconut */}
            <ProductCollection
                items={coldPressedOils}
                title="Customer Favorites"
                subtitle="Cold-Pressed Oils"
                description="Traditional wood-pressed oils for authentic Indian cooking. Yellow Mustard, Black Mustard, Sesame, and Coconut oils."
                backgroundTheme="light"
            />

            {/* 3.2. PREMIUM GRAINS - All Atta & Rice products */}
            <ProductCollection
                items={grains}
                title="Premium Grains"
                subtitle="Traditional Staples"
                description="Stone-ground wheat, organic rice, millets, and heritage grains. Farm-fresh and nutrient-rich."
                backgroundTheme="creme"
            />

            {/* 3.3. FARM-FRESH DALS */}
            <ProductCollection
                items={products.filter((p) => p.category === "Lentils/Dals")}
                title="Farm-Fresh Dals"
                subtitle="Organic Lentils"
                description="Unpolished, protein-rich dals. Toor, Chana, Urad, and Moong directly from the farm."
                backgroundTheme="light"
            />

            {/* 3.5. CINEMATIC GHEE SPOTLIGHT */}
            <GheeSpotlight />

            {/* 4. WHY WE'RE DIFFERENT - Our Mission */}
            <OurMission />

            {/* Bridge CTA */}
            <MissionBridge />

            {/* 4.5. GOOGLE REVIEWS (Moved Up) */}
            <GoogleReviews reviews={reviews} />

            {/* 4.6. DHARTI MATA & GAU MATA - Sacred Commitment */}
            <DhartiGauMataSection />

            {/* 5. OUR JOURNEY - Timeline from 2015 */}
            <FarmTimeline />

            {/* 6. DAILY COMMITMENT */}
            <FreshDelivery />

            {/* 7. MEET THE HERD */}
            <GirWisdom />

            {/* 8. OUR IMPACT */}
            <PremiumStats />

            {/* 9. THE PROBLEM WE SOLVE */}
            <ToxicityAudit />
            <KitchenQuiz />

            {/* 10-13. PRODUCT COLLECTIONS */}
            <ProductCollection
                category="Dairy"
                title="Pure A2 Dairy"
                subtitle="From Our Pure Gir Cows"
                description="Gir Milk, Sahiwal Milk, Buffalo Milk, Ghee, Paneer, Curd, Khoya - all from A2 breeds."
                backgroundTheme="creme"
            />

            {/* Removed Pantry Essentials from here as it moved up */}

            <ProductCollection
                items={superfoods}
                title="Superfoods & Healing"
                subtitle="Nature's Medicine Cabinet"
                description="Wild Forest Honey, Ayurvedic Balms, Organic Turmeric, and natural remedies."
                backgroundTheme="creme"
            />

            {/* 3.2. BEST SELLERS (Other products) */}
            <ProductCollection
                items={bestSellers}
                title="More Favorites"
                subtitle="Trending Now"
                description="Other popular products loved by our customers."
                backgroundTheme="light"
            />

            {/* 14. PROOF OF PURITY */}
            <LabReports />

            {/* 15. TRUST & SOCIAL PROOF */}
            <TrustStrip />
            <ComboCarousel items={products.filter((p) => p.category === "Combos")} />
            <ExpertPanel />
            <WallOfLove />

            {/* 16. JOIN US */}
            <FouitaInstagramWidget />
            <FarmTourCTA />

            {/* 17. SUPPORT */}
            <FAQSection />
            <Newsletter />
        </main>
    );
}
