import { ChatWidget } from "@/components/chat/ChatWidget";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "@/lib/CartContext";
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
        default: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee",
        template: "%s | Amrit Milk Organic",
    },
    description:
        "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
    openGraph: {
        type: "website",
        siteName: "Amrit Milk Organic",
        title: "Amrit Milk Organic | Pure A2 Gir Cow Milk & Bilona Ghee",
        description:
            "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        url: "https://amritmilkorganic.com",
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
            "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        images: ["https://amritmilkorganic.com/assets/img/amrit-logo-transparent.png"],
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-32x32.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* Google Analytics */}
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
                `}
            </Script>
            <body
                className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen bg-creme dark:bg-midnight transition-colors duration-500`}
            >
                <ThemeProvider>
                    <CartProvider>
                        {children}
                        <ChatWidget />
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
