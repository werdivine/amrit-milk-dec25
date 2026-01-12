import type { Metadata } from "next";
import { CategoryIconStrip } from "@/components/patterns/v2/CategoryIconStrip";
import { ComboCarousel } from "@/components/patterns/v2/ComboCarousel";
import { HeroSlider } from "@/components/patterns/v2/HeroSlider";
import { ProductCollection } from "@/components/patterns/v2/ProductCollection";
import { TrustStrip } from "@/components/patterns/v2/TrustStrip";
import { getProducts } from "@/lib/fetchProducts";

// Sustainability & Story
import { FarmTimeline } from "@/components/patterns/v2/FarmTimeline";
import { InstagramFeed } from "@/components/patterns/v2/InstagramFeed";
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
import { HoneySource } from "@/components/patterns/v2/HoneySource";
import { OilsProcess } from "@/components/patterns/v2/OilsProcess";

// Social Proof
import { ExpertPanel } from "@/components/patterns/ExpertPanel";
import { FAQSection } from "@/components/patterns/FAQSection";
import { Newsletter } from "@/components/patterns/Newsletter";
import { WallOfLove } from "@/components/patterns/WallOfLove";
export const metadata: Metadata = {
    title: "Amrit Milk Organic | Pure A2 Milk & Farm Foods",
    description:
        "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
    openGraph: {
        title: "Amrit Milk Organic | Pure A2 Milk & Farm Foods",
        description:
            "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        url: "https://amritmilkorganic.com",
        siteName: "Amrit Milk Organic",
        images: [
            {
                url: "https://amritmilkorganic.com/assets/img/milk-bottle.png",
                alt: "Amrit Milk glass bottle",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Amrit Milk Organic | Pure A2 Milk & Farm Foods",
        description:
            "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        images: ["https://amritmilkorganic.com/assets/img/milk-bottle.png"],
    },
};

export default async function Home() {
    const products = await getProducts();
    const bestSellers = products.filter((p) => p.badge || p.featured).slice(0, 8);
    const superfoods = products
        .filter(
            (p) => p.category === "Honey" || p.category === "Wellness" || p.category === "Other"
        )
        .slice(0, 8);
    const grains = products
        .filter((p) => p.category === "Atta" || p.category === "Rice")
        .slice(0, 12);

    return (
        <main className="flex min-h-screen flex-col bg-creme dark:bg-midnight transition-colors duration-500">
            {/* 1. THE PROMISE */}
            <HeroSlider />

            {/* 2. QUICK NAVIGATION */}
            <CategoryIconStrip />

            {/* 3. IMMEDIATE VALUE - Best Sellers */}
            <ProductCollection
                items={bestSellers}
                title="Customer Favorites"
                subtitle="Best Sellers"
                description="The most loved products from our collection. Trusted by thousands of families."
                backgroundTheme="light"
            />

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

            <OilsProcess />
            <ProductCollection
                category="Oils"
                title="Ancient Cold-Pressed Oils"
                subtitle="Wood-Pressed Purity"
                description="Yellow Mustard, Black Mustard, Groundnut, Coconut, Sesame, and healing Essential Oils."
                backgroundTheme="light"
            />

            <HoneySource />
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
            <InstagramFeed />
            <FarmTourCTA />

            {/* 17. SUPPORT */}
            <FAQSection />
            <Newsletter />
        </main>
    );
}
