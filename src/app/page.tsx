import { HeroSlider } from "@/components/patterns/v2/HeroSlider";
import { CategoryIconStrip } from "@/components/patterns/v2/CategoryIconStrip";
import { TrustStrip } from "@/components/patterns/v2/TrustStrip";
import { ProductCollection } from "@/components/patterns/v2/ProductCollection";
import { ComboCarousel } from "@/components/patterns/v2/ComboCarousel";
import { products } from "@/lib/products";

// Sustainability & Story
import { FarmTimeline } from "@/components/patterns/v2/FarmTimeline";
import { SustainabilityStory } from "@/components/patterns/v2/SustainabilityStory";
import { InstagramFeed } from "@/components/patterns/v2/InstagramFeed";

// Content
import { OilsProcess } from "@/components/patterns/v2/OilsProcess";
import { HoneySource } from "@/components/patterns/v2/HoneySource";
import { ToxicityAudit } from "@/components/patterns/ToxicityAudit";
import { KitchenQuiz } from "@/components/patterns/KitchenQuiz";
import { FreshDelivery } from "@/components/patterns/FreshDelivery";
import { GirWisdom } from "@/components/patterns/GirWisdom";
import { PremiumStats } from "@/components/patterns/PremiumStats";
import { LabReports } from "@/components/patterns/LabReports";
import { FarmTourCTA } from "@/components/patterns/FarmTourCTA";

// Social Proof
import { ExpertPanel } from "@/components/patterns/ExpertPanel";
import { WallOfLove } from "@/components/patterns/WallOfLove";
import { Newsletter } from "@/components/patterns/Newsletter";
import { FAQSection } from "@/components/patterns/FAQSection";

export default function Home() {
   const bestSellers = products.filter(p => p.badge || p.featured).slice(0, 8);
   const superfoods = products.filter(p => p.category === "Honey" || p.category === "Wellness" || p.category === "Other").slice(0, 8);
   const grains = products.filter(p => p.category === "Atta" || p.category === "Rice").slice(0, 12);

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

         {/* 4. WHY WE'RE DIFFERENT - Sustainability */}
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
            subtitle="From Our Sovereign Gir Cows"
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
