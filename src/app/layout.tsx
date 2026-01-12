import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    metadataBase: new URL("https://amritmilkorganic.com"),
    title: {
        default: "Amrit Milk Organic | Pure A2 Milk & Farm Foods",
        template: "%s | Amrit Milk Organic",
    },
    description:
        "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        siteName: "Amrit Milk Organic",
        title: "Amrit Milk Organic | Pure A2 Milk & Farm Foods",
        description:
            "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        url: "https://amritmilkorganic.com",
        images: [
            {
                url: "/assets/img/milk-bottle.png",
                alt: "Amrit Milk glass bottle",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Amrit Milk Organic | Pure A2 Milk & Farm Foods",
        description:
            "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        images: ["/assets/img/milk-bottle.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen bg-creme dark:bg-midnight transition-colors duration-500`}
            >
                <ThemeProvider>
                    <CartProvider>{children}</CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
