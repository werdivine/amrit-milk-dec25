import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ['class'],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Midnight Sovereign (Dark Mode)
                midnight: {
                    DEFAULT: "#0d1b2a",
                    mid: "#1b263b",
                    light: "#415a77",
                },
                gold: {
                    DEFAULT: "#d4af37",
                    glow: "rgba(212, 175, 55, 0.3)",
                    dim: "#aa8c2c",
                    bright: "#f5d76e",
                },
                ivory: {
                    DEFAULT: "#fefbe9",
                    dim: "#f0ebd8",
                },
                glass: {
                    bg: "rgba(255, 255, 255, 0.05)",
                    border: "rgba(255, 255, 255, 0.1)",
                    hover: "rgba(255, 255, 255, 0.08)",
                    blur: "24px",
                },

                // Royal Creme (Light Mode)
                creme: {
                    DEFAULT: "#fefaed",
                    light: "#f5ebe0",
                    dark: "#e7d4c0",
                },
                terracotta: {
                    DEFAULT: "#c75b39",
                    light: "#d97456",
                    dark: "#b04a2f",
                },
                espresso: {
                    DEFAULT: "#3e2723",
                    light: "#5d4037",
                    muted: "rgba(62, 39, 35, 0.6)",
                },
                warmGold: {
                    DEFAULT: "#d4a373",
                    light: "#e3b685",
                    dark: "#c49363",
                },
                amber: {
                    DEFAULT: "#f59e0b",
                },
            },
            fontFamily: {
                sans: "var(--font-inter)",
                serif: "var(--font-playfair)",
            },
            boxShadow: {
                // Dark mode shadows
                'glow': '0 0 40px rgba(212, 175, 55, 0.3)',
                'glow-lg': '0 0 80px rgba(212, 175, 55, 0.4)',
                'card-dark': '0 8px 32px rgba(0, 0, 0, 0.4)',

                // Light mode shadows
                'soft': '0 2px 8px rgba(62, 39, 35, 0.08)',
                'lifted': '0 8px 24px rgba(62, 39, 35, 0.16)',
                'embossed': 'inset 0 2px 4px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(62, 39, 35, 0.1)',
            },
            backdropBlur: {
                'glass': '24px',
            },
        },
    },
    plugins: [],
};
export default config;

