import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: {
                    DEFAULT: "#0d1b2a",
                    mid: "#1b263b",
                    light: "#415a77",
                },
                gold: {
                    DEFAULT: "#d4af37",
                    glow: "rgba(212, 175, 55, 0.3)",
                    dim: "#aa8c2c",
                },
                ivory: {
                    DEFAULT: "#fefbe9",
                    dim: "#f0ebd8",
                },
                glass: {
                    bg: "rgba(255, 255, 255, 0.05)",
                    border: "rgba(255, 255, 255, 0.1)",
                    blur: "24px",
                }
            },
            fontFamily: {
                sans: "var(--font-inter)",
                serif: "var(--font-playfair)",
            },
        },
    },
    plugins: [],
};
export default config;
