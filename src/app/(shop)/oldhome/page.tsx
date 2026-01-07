import { HeroSlider } from "@/components/patterns/v2/HeroSlider";
import { CategoryIconStrip } from "@/components/patterns/v2/CategoryIconStrip";
import { TrustStrip } from "@/components/patterns/v2/TrustStrip";
import { ProductCollection } from "@/components/patterns/v2/ProductCollection";
import { ComboCarousel } from "@/components/patterns/v2/ComboCarousel";

// Use actual product data
import { products } from "@/lib/products";

// Content Patterns
import { OilsProcess } from "@/components/patterns/v2/OilsProcess";
import { HoneySource } from "@/components/patterns/v2/HoneySource";
import { ToxicityAudit } from "@/components/patterns/ToxicityAudit";
import { KitchenQuiz } from "@/components/patterns/KitchenQuiz";

// Social Proof
import { ExpertPanel } from "@/components/patterns/ExpertPanel";
import { WallOfLove } from "@/components/patterns/WallOfLove";
import { Newsletter } from "@/components/patterns/Newsletter";
import { FAQSection } from "@/components/patterns/FAQSection";

export default function Home() {

   // BEST SELLERS - Mix of diverse products with badges or featured flag
   const bestSellers = products
      .filter(p => p.badge || p.featured)
      .slice(0, 8);

   // SUPERFOODS & WELLNESS - Honey, Wellness, Sweets
   const superfoods = products
      .filter(p => p.category === "Honey" || p.category === "Wellness" || p.category === "Other")
      .slice(0, 8);

   // TRADITIONAL GRAINS - All Atta + Rice
   const grains = products
      .filter(p => p.category === "Atta" || p.category === "Rice")
      .slice(0, 12);

   return (
      <main className="flex min-h-screen flex-col bg-creme dark:bg-midnight transition-colors duration-500">

         {/* ═══════════════════════════════════════════════════════════
               1. HERO & NAVIGATION
            ═══════════════════════════════════════════════════════════ */}
         <HeroSlider />
         <CategoryIconStrip />

         {/* ═══════════════════════════════════════════════════════════
               2. STORYTELLING: THE PROBLEM
            ═══════════════════════════════════════════════════════════ */}
         <ToxicityAudit />
         <KitchenQuiz />

         {/* ═══════════════════════════════════════════════════════════
               3. BEST SELLERS (Diverse Products)
            ═══════════════════════════════════════════════════════════ */}
         <ProductCollection
            items={bestSellers}
            title="Customer Favorites"
            subtitle="Best Sellers"
            description="The most loved products from our collection. Trusted by thousands of families."
            backgroundTheme="light"
         />

         {/* ═══════════════════════════════════════════════════════════
               4. A2 DAIRY COLLECTION (8 Different Dairy Products)
            ═══════════════════════════════════════════════════════════ */}
         <ProductCollection
            category="Dairy"
            title="Pure A2 Dairy"
            subtitle="From Our Sovereign Gir Cows"
            description="Gir Milk, Sahiwal Milk, Buffalo Milk, Ghee, Paneer, Curd, Khoya - all from A2 breeds."
            backgroundTheme="creme"
         />

         {/* ═══════════════════════════════════════════════════════════
               5. WOOD-PRESSED OILS (8 Different Oil Types)
            ═══════════════════════════════════════════════════════════ */}
         <OilsProcess />
         <ProductCollection
            category="Oils"
            title="Ancient Cold-Pressed Oils"
            subtitle="Wood-Pressed Purity"
            description="Yellow Mustard, Black Mustard, Groundnut, Coconut, Sesame, and healing Essential Oils."
            backgroundTheme="light"
         />

         {/* ═══════════════════════════════════════════════════════════
               6. SUPERFOODS & WELLNESS (Honey, Balms, Turmeric, etc.)
            ═══════════════════════════════════════════════════════════ */}
         <HoneySource />
         <ProductCollection
            items={superfoods}
            title="Superfoods & Healing"
            subtitle="Nature's Medicine Cabinet"
            description="Wild Forest Honey, Ayurvedic Balms, Organic Turmeric, and natural remedies."
            backgroundTheme="creme"
         />

         {/* ═══════════════════════════════════════════════════════════
               7. TRADITIONAL GRAINS (All Atta + Rice varieties)
            ═══════════════════════════════════════════════════════════ */}
         <ProductCollection
            items={grains}
            title="Stone-Ground Grains"
            subtitle="Traditional Atta & Rice"
            description="Wheat, Multigrain, Bajra, Besan, Millet, Kala Jeera, Basmati - freshly milled."
            backgroundTheme="light"
         />

         {/* ═══════════════════════════════════════════════════════════
               8. TRUST & COMMUNITY
            ═══════════════════════════════════════════════════════════ */}
         <TrustStrip />

         {/* ═══════════════════════════════════════════════════════════
               9. COMBOS
            ═══════════════════════════════════════════════════════════ */}
         <ComboCarousel />

         {/* ═══════════════════════════════════════════════════════════
               10. SOCIAL PROOF
            ═══════════════════════════════════════════════════════════ */}
         <ExpertPanel />
         <WallOfLove />

         {/* ═══════════════════════════════════════════════════════════
               11. SUPPORT
            ═══════════════════════════════════════════════════════════ */}
         <FAQSection />
         <Newsletter />
      </main>
   );
}
