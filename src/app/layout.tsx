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
    title: "Amrit Milk | Affordable Milk, Rich in Taste",
    description: "Pure A2 Gir Cow Milk - Affordable milk, rich in taste. Delivered fresh to your doorstep within 4 hours of milking.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen bg-creme text-espresso dark:bg-midnight dark:text-ivory transition-colors duration-500`}>
                <ThemeProvider>
                    <CartProvider>
                        <Header />
                        <main className="flex-grow pt-20">
                            {children}
                        </main>
                        <Footer />
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
