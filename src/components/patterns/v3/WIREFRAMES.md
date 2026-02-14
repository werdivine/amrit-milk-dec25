# Component Wireframes - V3 Homepage Restructuring

This document outlines the structure and data requirements for each v3 component.

---

## 1. HeroStoryScroll

### Purpose
Fullscreen scrollytelling hero that tells the Amrit origin story in 3-4 immersive panels.

### Structure
```
HeroStoryScroll
├── Panel 1: Product Hero
│   ├── Background: Full-bleed image (Gir cow in pasture)
│   ├── Headline: "Pure A2 Milk from Our Gir Cows"
│   ├── Subtext: "Traditional Farming. Modern Delivery."
│   └── Image: Product shot (milk bottle)
│
├── Panel 2: Daily Commitment
│   ├── Background: Farm at sunrise
│   ├── Headline: "Farm to Doorstep by 8 AM"
│   ├── Subtext: "Milked at 4 AM. At your door by 8 AM."
│   └── Animation: Parallax scrolling
│
├── Panel 3: Traditional Method
│   ├── Background: Video loop (bilona churning)
│   ├── Headline: "Hand-Churned Bilona Ghee"
│   ├── Subtext: "5000-year-old Vedic tradition"
│   └── Image: Ghee production
│
└── Panel 4: CTA
    ├── Background: Soft gradient
    ├── Headline: "Experience the Difference"
    ├── Buttons: ["Shop Now", "Learn More"]
    └── Trust indicators: "10k+ families" "Lab-tested" "4.9★"
```

### Data Requirements
```typescript
interface HeroPanel {
  id: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  headline: string;
  subtext: string;
  productImage?: string;
  ctaButtons?: {
    primary?: { text: string; href: string };
    secondary?: { text: string; href: string };
  };
  trustIndicators?: string[];
}
```

### Animations
- GSAP ScrollTrigger for panel transitions
- Parallax effect on background images
- Fade-in text reveals
- Smooth scroll snapping between panels

---

## 2. CategoryNavigator

### Purpose
Visual category grid with beautiful product imagery for quick navigation.

### Structure
```
CategoryNavigator
├── Grid (6 categories, responsive: 6→4→3→2)
│   ├── Category Card 1: A2 Dairy
│   │   ├── Image: Fresh milk bottles
│   │   ├── Title: "A2 Dairy"
│   │   ├── Product count: "12 products"
│   │   └── Link: /products?category=dairy
│   │
│   ├── Category Card 2: Bilona Ghee
│   ├── Category Card 3: Cold-Pressed Oils
│   ├── Category Card 4: Raw Honey
│   ├── Category Card 5: Stone-Ground Grains
│   └── Category Card 6: Wellness
```

### Data Requirements
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  href: string;
}
```

### Animations
- Hover: Image zoom + overlay reveal
- Card lift shadow on hover
- Staggered fade-in on scroll

---

## 3. UnifiedProductShowcase

### Purpose
Single consolidated product display with intelligent tabs.

### Structure
```
UnifiedProductShowcase
├── Tab Navigation
│   ├── Tab 1: "Best Sellers" (active)
│   ├── Tab 2: "New Arrivals"
│   └── Tab 3: "Seasonal" (dynamic label)
│
├── Product Grid (8 products, 4→3→2 responsive)
│   ├── ProductCard [3D hover effect]
│   │   ├── Image
│   │   ├── Badge (optional): "Bestseller" / "New"
│   │   ├── Title
│   │   ├── Price
│   │   ├── Rating ★★★★★
│   │   ├── Quick Actions:
│   │   │   ├── Quick View
│   │   │   └── Add to Cart
│   │   └── Hover: 3D tilt effect (Atropos)
│
└── Category Filter Pills (below tabs)
    ├── All
    ├── Dairy
    ├── Ghee
    ├── Oils
    └── [...]
```

### Data Requirements
```typescript
interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'Bestseller' | 'New' | 'Sale';
  category: string;
  featured?: boolean;
}

interface TabConfig {
  id: string;
  label: string;
  filter: (products: Product[]) => Product[];
}
```

### Animations
- Tab switching: Slide transition
- Product cards: 3D tilt on hover (Atropos)
- Add to cart: Success micro-animation
- Filter pills: Smooth transition

---

## 4. BrandNarrativeModule

### Purpose
Single integrated storytelling section consolidating mission, process, and impact.

### Structure
```
BrandNarrativeModule
├── Section Header
│   ├── Eyebrow: "The Amrit Story"
│   └── Headline: "From Purpose to Your Table"
│
├── Three-Column Timeline
│   │
│   ├── Column 1: Our Mission
│   │   ├── Icon: Heart
│   │   ├── Year: "2015"
│   │   ├── Headline: "Why We Started"
│   │   ├── Text: Founder story (condensed)
│   │   └── Values:
│   │       ├── "A2 Genetics Preserved"
│   │       └── "Ancestral Wisdom Restored"
│   │
│   ├── Column 2: Our Process
│   │   ├── Icon: Process/Cycle
│   │   ├── Interactive Timeline:
│   │   │   ├── Step 1: "4 AM Milking"
│   │   │   ├── Step 2: "Lab Testing"
│   │   │   ├── Step 3: "Glass Bottling"
│   │   │   └── Step 4: "8 AM Delivery"
│   │   └── Special highlight: Bilona method
│   │
│   └── Column 3: Our Impact
│       ├── Icon: Leaf/Growth
│       ├── Stats Counter:
│       │   ├── "10,000+ Families"
│       │   ├── "50 Gir Cows"
│       │   ├── "Zero Plastic"
│       │   └── "100% Lab-Tested"
│       └── Sustainability notes
│
├── Farm Map (Interactive)
│   ├── Farm location pin
│   ├── Delivery zones highlighted
│   └── Click: Opens farm tour booking
│
└── Optional: Live Cow Cam embed
    └── Real-time farm footage (if available)
```

### Data Requirements
```typescript
interface BrandNarrative {
  mission: {
    year: string;
    headline: string;
    story: string;
    values: string[];
  };
  process: {
    steps: Array<{
      time: string;
      title: string;
      description: string;
      icon?: string;
    }>;
    specialHighlight?: string;
  };
  impact: {
    stats: Array<{
      value: string;
      label: string;
    }>;
    sustainabilityNotes: string[];
  };
  farmLocation?: {
    lat: number;
    lng: number;
    deliveryZones?: string[];
  };
  liveCamUrl?: string;
}
```

### Animations
- Scroll-triggered counter animations for stats
- Interactive timeline with progress indicator
- Map hover effects
- Fade-in column reveals

---

## 5. TrustCentralHub

### Purpose
Unified social proof consolidating reviews, testimonials, and trust badges.

### Structure
```
TrustCentralHub
├── Section Header
│   ├── Headline: "Trusted by Thousands"
│   └── Subtext: "Real stories from real families"
│
├── Part A: Credentials Strip (Condensed)
│   └── Single horizontal bar:
│       "Lab-Tested | 4.9★ Google | 10k+ Customers | Certified Organic"
│
├── Part B: Customer Love Wall (Masonry Grid)
│   ├── Filter Tabs: [All | Video | Photos | Text]
│   │
│   └── Masonry Grid (3→2→1 responsive)
│       ├── Testimonial Card 1 [Photo + Quote]
│       ├── Testimonial Card 2 [Video]
│       ├── Testimonial Card 3 [Instagram post]
│       ├── Testimonial Card 4 [Google review]
│       └── [...] (10-12 total)
│
└── Part C: Expert Endorsements
    ├── Expert Card 1: Nutritionist
    │   ├── Quote
    │   ├── Name + Credentials
    │   └── Photo
    ├── Expert Card 2: Ayurvedic Doctor
    ├── Expert Card 3: Pediatrician
    └── Trust Badges: [Certifications displayed]
```

### Data Requirements
```typescript
interface Testimonial {
  id: string;
  type: 'photo' | 'video' | 'text' | 'instagram';
  customerName: string;
  customerImage?: string;
  quote: string;
  rating?: number;
  media?: string; // Image or video URL
  source: 'google' | 'instagram' | 'direct';
  date: string;
}

interface ExpertEndorsement {
  id: string;
  name: string;
  credentials: string;
  quote: string;
  photo: string;
}
```

### Animations
- Masonry grid: Staggered fade-in
- Video cards: Play on hover
- Filter transition: Smooth morph
- Trust badge pulse effect

---

## 6. KnowledgeCenter

### Purpose
Educational content hub with interactive elements.

### Structure
```
KnowledgeCenter
├── Section Header
│   ├── Headline: "Know Your Food"
│   └── Subtext: "Science-backed transparency"
│
├── Tab/Accordion System
│   │
│   ├── Tab 1: Why A2 Milk?
│   │   ├── Visual comparison: A2 vs A1 protein
│   │   ├── Health benefits infographic
│   │   ├── Scientific citations
│   │   └── CTA: "Read Full Article"
│   │
│   ├── Tab 2: Purity Reports
│   │   ├── Lab report grid (latest 6 reports)
│   │   ├── Interactive toxicity scorecard
│   │   ├── Batch tracking tool
│   │   └── Download buttons
│   │
│   ├── Tab 3: Kitchen Quiz
│   │   ├── Interactive quiz (5-7 questions)
│   │   ├── Personalized product recommendations
│   │   └── Email capture for results
│   │
│   └── Tab 4: FAQ (Condensed)
│       └── Accordion (8-10 critical questions)
│           ├── What is A2 milk?
│           ├── Do you deliver daily?
│           ├── What is Bilona ghee?
│           └── [...] + "View all FAQs" link
```

### Data Requirements
```typescript
interface EducationalContent {
  a2Explanation: {
    comparison: string; // Image URL
    benefits: string[];
    citations: string[];
    fullArticleUrl: string;
  };
  labReports: Array<{
    id: string;
    date: string;
    product: string;
    pdfUrl: string;
    scorecard: {
      purity: number;
      nutrients: number;
      safety: number;
    };
  }>;
  quiz: {
    questions: Array<{
      id: string;
      question: string;
      options: string[];
    }>;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
```

### Animations
- Tab switching: Slide + fade
- Accordion: Smooth expand/collapse
- Quiz: Step progression animation
- Scorecard: Animated progress bars

---

## 7. ActionHub

### Purpose
Final conversion zone with clear CTAs.

### Structure
```
ActionHub
├── Section Layout (3-column → 1-column stacked)
│   │
│   ├── Column 1: Join the Community
│   │   ├── Headline: "Follow Our Journey"
│   │   ├── Instagram Feed Widget (Fouita)
│   │   │   └── Latest 6 posts (2×3 grid)
│   │   └── CTA: "Follow @amritmilk"
│   │
│   ├── Column 2: Visit Our Farm
│   │   ├── Headline: "See Where It All Begins"
│   │   ├── Virtual tour video preview
│   │   │   └── Play button overlay
│   │   └── CTA: "Book Farm Tour"
│   │
│   └── Column 3: Subscribe to Newsletter
│       ├── Headline: "Get 10% Off Your First Order"
│       ├── Email input field
│       ├── CTA Button: "Subscribe"
│       └── Privacy note: "We respect your inbox"
```

### Data Requirements
```typescript
interface ActionHub {
  instagram: {
    feedUrl: string; // Fouita widget URL
    handle: string;
  };
  farmTour: {
    videoPreviewUrl: string;
    bookingUrl: string;
  };
  newsletter: {
    discountOffer: string;
    submitEndpoint: string;
  };
}
```

### Animations
- Column reveal: Staggered fade-in
- Video preview: Hover play effect
- Form submission: Success animation
- Instagram grid: Lazy load + fade-in

---

## Design Consistency

All components follow:
- **Typography:** Design tokens from `designTokens.ts`
- **Colors:** Theme-aware (light/dark mode)
- **Spacing:** Consistent section padding (120px → 80px → 60px)
- **Animations:** Smooth transitions (300-500ms)
- **Accessibility:** Keyboard navigation, ARIA labels, alt text

## Next Steps
1. Create these components one by one
2. Start with HeroStoryScroll (most impactful)
3. Test each component in isolation
4. Integrate into new homepage layout
