/**
 * Midnight Sovereign Theme
 * Dark mode design tokens - Sophisticated, mysterious, modern luxury
 */

export const midnightSovereign = {
    colors: {
        // Base colors
        background: {
            primary: '#0d1b2a',
            secondary: '#1b263b',
            tertiary: '#415a77',
        },
        // Text colors
        text: {
            primary: '#fefbe9',
            secondary: '#f0ebd8',
            muted: 'rgba(254, 251, 233, 0.6)',
        },
        // Accent colors
        accent: {
            gold: '#d4af37',
            goldGlow: 'rgba(212, 175, 55, 0.3)',
            goldDim: '#aa8c2c',
            goldBright: '#f5d76e',
        },
        // Glass effects
        glass: {
            bg: 'rgba(255, 255, 255, 0.05)',
            border: 'rgba(255, 255, 255, 0.1)',
            hover: 'rgba(255, 255, 255, 0.08)',
        },
    },
    shadows: {
        glow: '0 0 40px rgba(212, 175, 55, 0.3)',
        glowLarge: '0 0 80px rgba(212, 175, 55, 0.4)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    blur: {
        glass: '24px',
        backdrop: '16px',
    },
    typography: {
        fontFamily: {
            primary: 'var(--font-inter)',
            accent: 'var(--font-playfair)',
        },
    },
} as const;

export type MidnightSovereignTheme = typeof midnightSovereign;
