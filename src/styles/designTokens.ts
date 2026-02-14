/**
 * AMRIT V3 DESIGN SYSTEM TOKENS
 * Award-Winning Design System for 2026 Homepage Restructuring
 * 
 * Based on research of:
 * - Opal Tadpole (Awwwards 2024 Ecommerce Site of the Year)
 * - Aesop, Glossier, Patagonia
 * - 2026 ecommerce design trends
 */

export const designTokens = {
    /**
     * TYPOGRAPHY
     * Hierarchy for immersive storytelling
     */
    typography: {
        hero: {
            size: '72px',
            sizeTablet: '56px',
            sizeMobile: '40px',
            lineHeight: '1.1',
            fontFamily: 'var(--font-playfair)', // Serif for luxury
            fontWeight: '800',
        },
        h1: {
            size: '56px',
            sizeTablet: '48px',
            sizeMobile: '32px',
            lineHeight: '1.15',
            fontFamily: 'var(--font-playfair)',
            fontWeight: '700',
        },
        h2: {
            size: '48px',
            sizeTablet: '40px',
            sizeMobile: '28px',
            lineHeight: '1.2',
            fontFamily: 'var(--font-inter)', // Sans for modern clarity
            fontWeight: '700',
        },
        h3: {
            size: '32px',
            sizeTablet: '28px',
            sizeMobile: '24px',
            lineHeight: '1.3',
            fontFamily: 'var(--font-inter)',
            fontWeight: '600',
        },
        body: {
            size: '18px',
            sizeMobile: '16px',
            lineHeight: '1.7',
            fontFamily: 'var(--font-inter)',
            fontWeight: '400',
        },
        bodyLarge: {
            size: '20px',
            sizeMobile: '18px',
            lineHeight: '1.7',
            fontFamily: 'var(--font-inter)',
            fontWeight: '400',
        },
        caption: {
            size: '14px',
            lineHeight: '1.5',
            fontFamily: 'var(--font-inter)',
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase' as const,
        },
    },

    /**
     * COLORS
     * Premium palette with warm, organic tones
     */
    colors: {
        // Light Mode (Primary)
        light: {
            primary: '#fefaed', // Warm cream
            secondary: '#f5ebe0', // Light cream
            tertiary: '#e7d4c0', // Dark cream
            text: {
                primary: '#3e2723', // Espresso
                secondary: 'rgba(62, 39, 35, 0.7)',
                muted: 'rgba(62, 39, 35, 0.5)',
            },
            accent: '#c75b39', // Terracotta
            accentHover: '#b04a2f',
            success: '#4caf50',
            warning: '#f59e0b',
            error: '#ef4444',
        },
        // Dark Mode
        dark: {
            primary: '#0d1b2a', // Midnight
            secondary: '#1b263b', // Midnight mid
            tertiary: '#415a77', // Midnight light
            text: {
                primary: '#fefbe9', // Ivory
                secondary: 'rgba(254, 251, 233, 0.8)',
                muted: 'rgba(254, 251, 233, 0.6)',
            },
            accent: '#d4af37', // Gold
            accentHover: '#f5d76e',
            success: '#4caf50',
            warning: '#f59e0b',
            error: '#ef4444',
        },
        // Semantic Colors
        glass: {
            bg: 'rgba(255, 255, 255, 0.05)',
            border: 'rgba(255, 255, 255, 0.1)',
            hover: 'rgba(255, 255, 255, 0.08)',
        },
    },

    /**
     * SPACING
     * Consistent rhythm for layout
     */
    spacing: {
        section: {
            vertical: '120px',
            verticalTablet: '80px',
            verticalMobile: '60px',
        },
        container: {
            maxWidth: '1440px',
            padding: '2rem',
            paddingMobile: '1rem',
        },
        element: {
            xs: '4px',
            sm: '8px',
            md: '16px',
            lg: '24px',
            xl: '32px',
            xxl: '48px',
            xxxl: '64px',
        },
    },

    /**
     * ANIMATIONS
     * Timing and easing for smooth interactions
     */
    animations: {
        // Durations
        duration: {
            instant: '150ms',
            fast: '300ms',
            normal: '500ms',
            slow: '800ms',
            xSlow: '1200ms',
        },
        // Easing curves
        easing: {
            default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            inOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
            in: 'cubic-bezier(0.4, 0.0, 1, 1)',
            out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
            spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        // Scroll trigger settings (GSAP)
        scrollTrigger: {
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
            markers: false,
        },
    },

    /**
     * SHADOWS
     * Depth and elevation
     */
    shadows: {
        light: {
            soft: '0 2px 8px rgba(62, 39, 35, 0.08)',
            lifted: '0 8px 24px rgba(62, 39, 35, 0.16)',
            elevated: '0 16px 48px rgba(62, 39, 35, 0.24)',
            embossed: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(62, 39, 35, 0.1)',
        },
        dark: {
            glow: '0 0 40px rgba(212, 175, 55, 0.3)',
            glowLarge: '0 0 80px rgba(212, 175, 55, 0.4)',
            card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        },
    },

    /**
     * BORDERS
     * Subtle dividers and outlines
     */
    borders: {
        radius: {
            sm: '8px',
            md: '12px',
            lg: '16px',
            xl: '24px',
            full: '9999px',
        },
        width: {
            thin: '1px',
            medium: '2px',
            thick: '4px',
        },
    },

    /**
     * BREAKPOINTS
     * Responsive design system
     */
    breakpoints: {
        mobile: '375px',
        mobileLarge: '480px',
        tablet: '768px',
        desktop: '1024px',
        desktopLarge: '1440px',
        desktopXL: '1920px',
    },

    /**
     * Z-INDEX
     * Layering system
     */
    zIndex: {
        base: 0,
        elevated: 10,
        dropdown: 100,
        sticky: 200,
        modal: 1000,
        popover: 1100,
        toast: 1200,
    },

    /**
     * TRANSITIONS
     * Pre-defined transition configs
     */
    transitions: {
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.5 },
        },
        slideUp: {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 40 },
            transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] },
        },
        slideRight: {
            initial: { opacity: 0, x: -40 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -40 },
            transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] },
        },
        scale: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
            transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
        },
    },
};

/**
 * COMPONENT VARIANTS
 * Reusable component configurations
 */
export const componentVariants = {
    button: {
        primary: {
            base: 'bg-terracotta hover:bg-terracotta-dark text-white',
            dark: 'dark:bg-gold dark:hover:bg-gold-bright dark:text-midnight',
        },
        secondary: {
            base: 'bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
            dark: 'dark:border-gold dark:text-gold dark:hover:bg-gold dark:hover:text-midnight',
        },
        ghost: {
            base: 'bg-transparent text-espresso hover:bg-creme-light',
            dark: 'dark:text-ivory dark:hover:bg-midnight-mid',
        },
    },
    card: {
        default: {
            base: 'bg-white shadow-soft border border-creme-dark rounded-lg',
            dark: 'dark:bg-midnight-mid dark:border-midnight-light dark:shadow-card-dark',
        },
        glass: {
            base: 'bg-glass-bg backdrop-blur-glass border border-glass-border',
            dark: 'dark:bg-glass-bg dark:backdrop-blur-glass dark:border-glass-border',
        },
        elevated: {
            base: 'bg-white shadow-lifted hover:shadow-elevated transition-shadow duration-300',
            dark: 'dark:bg-midnight-mid dark:shadow-glow dark:hover:shadow-glow-lg',
        },
    },
};

/**
 * GRID SYSTEMS
 * Layout configurations
 */
export const gridSystems = {
    productShowcase: {
        columns: {
            desktop: 4,
            tablet: 3,
            mobile: 2,
        },
        gap: '24px',
        gapMobile: '16px',
    },
    categoryGrid: {
        columns: {
            desktop: 6,
            tablet: 4,
            mobile: 3,
        },
        gap: '16px',
    },
    testimonialMasonry: {
        columns: {
            desktop: 3,
            tablet: 2,
            mobile: 1,
        },
        gap: '24px',
    },
};

export type DesignTokens = typeof designTokens;
export type ComponentVariants = typeof componentVariants;
export type GridSystems = typeof gridSystems;
