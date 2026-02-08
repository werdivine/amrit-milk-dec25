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
import { InstaplugWidget } from "@/components/patterns/v2/InstaplugWidget";
import { MissionBridge } from "@/components/patterns/v2/MissionBridge";
import { OurMission } from "@/components/patterns/v2/OurMission";
import { SustainabilityStory } from "@/components/patterns/v2/SustainabilityStory";

// Content
import { FarmTourCTA } from "@/components/patterns/FarmTourCTA";
import { FreshDelivery } from "@/components/patterns/FreshDelivery";
import { GirWisdom } from "@/components/patterns/GirWisdom";
import { KitchenQuiz } from "@/components/patterns/KitchenQuiz";
import { LabReports } from "@/components/patterns/LabReports";
import { PremiumStats } from "@/components/patterns/PremiumStats";
import { ToxicityAudit } from "@/components/patterns/ToxicityAudit";
import { GheeSpotlight } from "@/components/patterns/v2/GheeSpotlight";

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
            url: "https://amritmilkorganic.com",
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
        answer:
            "A2 milk comes from indigenous Indian cows like Gir and Sahiwal breeds. It contains the A2 beta-casein protein which is easier to digest compared to A1 protein found in regular milk. A2 milk is naturally richer in nutrients and doesn't cause digestive discomfort.",
    },
    {
        question: "Do you deliver A2 milk daily in Lucknow?",
        answer:
            "Yes, we deliver fresh A2 Gir cow milk daily across Lucknow. Our milk is milked at 4 AM and delivered by 8 AM the same morning, ensuring maximum freshness and nutritional value.",
    },
    {
        question: "What is Bilona ghee and how is it different?",
        answer:
            "Bilona ghee is made using the traditional Vedic method where curd is churned to extract butter, which is then heated to make ghee. Unlike commercial ghee made from cream, Bilona ghee retains more nutrients and has a richer flavor.",
    },
    {
        question: "Is your milk lab tested?",
        answer:
            "Yes, all our products are regularly tested in certified laboratories for purity, adulteration, and nutritional content. We publish our lab reports transparently so you can verify the quality yourself.",
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

const TERMS = ["Ghee", "Oils", "Honey"];

export default async function Home() {
    const products = await getProducts();
    // Randomize Best Sellers
    const bestSellers = products
        .filter((p) => p.badge || p.featured)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

    const pantryEssentials = products.filter((p) => TERMS.includes(p.category));

    const superfoods = products
        .filter((p) => p.category === "Wellness" || p.category === "Other")
        .slice(0, 8);
    const grains = products
        .filter((p) => p.category === "Atta" || p.category === "Rice")
        .slice(0, 12);

    const reviews = await getGoogleReviews();

    return (
        <main className="flex min-h-screen flex-col bg-creme dark:bg-midnight transition-colors duration-500">
            {/* JSON-LD Schema Markup */}
            <FAQPageSchema faqs={homePageFAQs} />
            <HowToSchema {...gheeHowTo} />

            {/* 1. THE PROMISE */}
            <HeroSlider />

            {/* 2. QUICK NAVIGATION */}
            <CategoryIconStrip />

            {/* 3. IMMEDIATE VALUE - Pantry Essentials (Ghee, Oils, Honey) */}
            <ProductCollection
                items={pantryEssentials}
                category="Oils"
                title="Vedic Kitchen Treasures"
                subtitle="Ghee • Oils • Honey"
                description="Pure Bilona Ghee, Cold-Pressed Oils, and Raw Honey. The foundation of a healthy kitchen."
                backgroundTheme="light"
            />

            {/* 3.1. BEST SELLERS */}
            <ProductCollection
                items={bestSellers}
                title="Customer Favorites"
                subtitle="Best Sellers"
                description="The most loved products from our collection. Trusted by thousands of families."
                backgroundTheme="light"
            />

            {/* 3.5. CINEMATIC GHEE SPOTLIGHT */}
            <GheeSpotlight />

            {/* 4. WHY WE'RE DIFFERENT - Our Mission */}
            <OurMission />

            {/* Bridge CTA */}
            <MissionBridge />

            {/* 4.5. SUSTAINABILITY */}
            <SustainabilityStory />

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

            <ProductCollection
                items={grains}
                title="Stone-Ground Grains"
                subtitle="Traditional Atta & Rice"
                description="Wheat, Multigrain, Bajra, Besan, Millet, Kala Jeera, Basmati - freshly milled."
                backgroundTheme="light"
            />

            {/* 14. PROOF OF PURITY */}
            <LabReports />

            {/* 15. TRUST & SOCIAL PROOF */}
            <TrustStrip />
            <ComboCarousel />
            <ExpertPanel />
            <WallOfLove />

            {/* 16. JOIN US */}
            <GoogleReviews reviews={reviews} />
            <FarmTourCTA />

            {/* 17. SUPPORT */}
            <FAQSection />
            <Newsletter />
        </main>
    );
}
