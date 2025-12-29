/**
 * Royal Creme Theme
 * Light mode design tokens - Warm, tactile, heritage luxury
 */

export const royalCreme = {
    colors: {
        // Base colors
        background: {
            primary: '#fefaed',
            secondary: '#f5ebe0',
            tertiary: '#e7d4c0',
        },
        // Text colors
        text: {
            primary: '#3e2723',
            secondary: '#5d4037',
            muted: 'rgba(62, 39, 35, 0.6)',
        },
        // Accent colors
        accent: {
            terracotta: '#c75b39',
            terracottaLight: '#d97456',
            amber: '#f59e0b',
            warmGold: '#d4a373',
        },
        // Surface colors
        surface: {
            white: '#ffffff',
            cream: '#faf6f0',
            beige: '#f0e6d8',
        },
        // Border colors
        border: {
            light: '#e7d4c0',
            medium: '#d4bfa8',
            dark: '#c4a888',
        },
    },
    shadows: {
        soft: '0 2px 8px rgba(62, 39, 35, 0.08)',
        medium: '0 4px 16px rgba(62, 39, 35, 0.12)',
        lifted: '0 8px 24px rgba(62, 39, 35, 0.16)',
        embossed: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(62, 39, 35, 0.1)',
    },
    gradients: {
        warm: 'linear-gradient(135deg, #fefaed 0%, #f5ebe0 100%)',
        sunset: 'linear-gradient(135deg, #f59e0b 0%, #c75b39 100%)',
        paper: 'linear-gradient(180deg, #ffffff 0%, #faf6f0 100%)',
    },
    typography: {
        fontFamily: {
            primary: 'var(--font-playfair)', // Serif primary in light mode
            accent: 'var(--font-inter)',
        },
    },
} as const;

export type RoyalCremeTheme = typeof royalCreme;
