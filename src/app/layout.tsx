import { ChatWidget } from "@/components/chat/ChatWidget";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "@/lib/CartContext";
import { LocalBusinessSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-1C4LN7YY4D";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    metadataBase: new URL("https://amritmilkorganic.com"),
    title: {
        default: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee in Lucknow",
        template: "%s | Amrit Milk Organic",
    },
    description:
        "Pure A2 Gir Cow Milk with authentic bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered daily from our own farm in Lucknow since 2015.",
    keywords: [
        "A2 milk Lucknow",
        "Gir cow milk",
        "bilona ghee",
        "pure desi ghee",
        "organic milk delivery",
        "farm fresh milk",
        "cold pressed oils",
        "organic honey",
        "stone ground atta",
    ],
    authors: [{ name: "Amrit Milk Organic" }],
    creator: "Amrit Milk Organic",
    publisher: "Amrit Milk Organic",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        siteName: "Amrit Milk Organic",
        title: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee",
        description:
            "Pure A2 Gir Cow Milk with authentic bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        locale: "en_IN",
        images: [
            {
                url: "https://amritmilkorganic.com/assets/img/amrit-logo-transparent.png",
                width: 1200,
                height: 630,
                alt: "Amrit Milk Organic - Purity Assured",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee",
        description:
            "Pure A2 Gir Cow Milk with authentic bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        images: ["https://amritmilkorganic.com/assets/img/amrit-logo-transparent.png"],
        creator: "@amritmilkorganic",
        site: "@amritmilkorganic",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-32x32.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    alternates: {
        canonical: "https://amritmilkorganic.com",
        languages: {
            "en-IN": "https://amritmilkorganic.com",
            "en-US": "https://amritmilkorganic.com",
            "hi-IN": "https://amritmilkorganic.com/hi",
        },
    },
    verification: {
        google: "G-1C4LN7YY4D",
    },
    other: {
        "geo.region": "IN-UP",
        "geo.placename": "Lucknow",
        "geo.position": "26.8467;80.9462",
        ICBM: "26.8467, 80.9462",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                        gtag('config', 'AW-17921700565');
                    `}
                </Script>
            </head>
            <body
                className={`${inter.variable} ${playfair.variable} font-sans bg-midnight text-ivory antialiased`}
            >
                <ThemeProvider>
                    <CartProvider>
                        <OrganizationSchema />
                        <LocalBusinessSchema />
                        <WebsiteSchema />
                        {children}
                        <ChatWidget />
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
