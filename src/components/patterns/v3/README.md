# V3 Components - 2026 Homepage Restructuring

This directory contains the award-winning redesigned components for the Amrit homepage restructuring project.

## Architecture

Each component follows these principles:
1. **Single Responsibility** - One clear purpose per component
2. **Performance First** - Lazy loading, optimized images, code splitting
3. **Accessibility** - WCAG 2.1 AA compliant
4. **Responsive** - Mobile-first design
5. **Animated** - GSAPScrollTrigger + Framer Motion
6. **Typed** - Full TypeScript support

## Components

### 1. HeroStoryScroll
Fullscreen scrollytelling hero section combining multiple story beats.
- **Consolidates:** HeroSlider, GheeSpotlight
- **Tech:** GSAP ScrollTrigger, parallax effects
- **Lines:** ~150

### 2. CategoryNavigator
Enhanced category grid with visual product imagery.
- **Consolidates:** CategoryIconStrip
- **Tech:** Hover animations, lazy-loaded images
- **Lines:** ~100

### 3. UnifiedProductShowcase
Tabbed product display with 3D card interactions.
- **Consolidates:** 5 ProductCollection instances
- **Tech:** Atropos.js (3D hover), Framer Motion tabs
- **Lines:** ~250

### 4. BrandNarrativeModule
Integrated storytelling section with timeline.
- **Consolidates:** OurMission, MissionBridge, SustainabilityStory, FarmTimeline, FreshDelivery, GirWisdom, PremiumStats
- **Tech:** Interactive timeline, scrollytelling
- **Lines:** ~300

### 5. TrustCentralHub
Unified social proof and testimonials.
- **Consolidates:** TrustStrip, GoogleReviews, ExpertPanel, WallOfLove, ComboCarousel
- **Tech:** Masonry grid, video testimonials
- **Lines:** ~200

### 6. KnowledgeCenter
Educational content hub.
- **Consolidates:** ToxicityAudit, LabReports, KitchenQuiz, FAQSection
- **Tech:** Interactive accordions, data visualization
- **Lines:** ~250

### 7. ActionHub
Final conversion zone.
- **Consolidates:** FouitaInstagramWidget, FarmTourCTA, Newsletter
- **Tech:** Form validation, Instagram API
- **Lines:** ~150

## Design System

All components use tokens from `@/styles/designTokens.ts`:
- Typography hierarchy
- Color palette (light/dark modes)
- Spacing system
- Animation timings
- Component variants

## Usage Example

```tsx
import { HeroStoryScroll } from '@/components/patterns/v3/HeroStoryScroll';

export default function HomePage() {
  return (
    <main>
      <HeroStoryScroll />
      {/* ... other v3 components */}
    </main>
  );
}
```

## Testing

Each component includes:
- Unit tests (Vitest)
- Visual regression tests
- Accessibility tests
- Performance benchmarks

## Performance Targets

- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Cumulative Layout Shift: <0.1
