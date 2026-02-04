import { BreadcrumbListSchema } from "@/components/seo/JsonLd";
import { ArrowLeft, Home, Package, Phone, Search } from "lucide-react";
import Link from "next/link";

/**
 * Common URL mappings for redirects from old URLs or common typos
 */
const REDIRECT_MAP: Record<string, string> = {
    "/ghee": "/products/a2-bilona-ghee",
    "/milk": "/products/a2-gir-cow-milk",
    "/honey": "/products/wild-forest-honey",
    "/oil": "/products/wood-pressed-oil",
    "/oils": "/products/wood-pressed-oil",
    "/paneer": "/products/fresh-paneer",
    "/butter": "/products/white-butter",
    "/curd": "/products/fresh-curd",
    "/subscription": "/subscription-hub",
    "/subscribe": "/subscription-hub",
    "/about": "/the-farm",
    "/about-us": "/the-farm",
    "/farm": "/the-farm",
    "/contact-us": "/contact",
    "/shop": "/products",
    "/store": "/products",
    "/blog": "/blog",
    "/articles": "/blog",
    "/faq": "/faqs",
    "/questions": "/faqs",
    "/help": "/faqs",
    "/return": "/refund",
    "/returns": "/refund",
    "/cancellation": "/refund",
    "/privacy-policy": "/privacy",
    "/terms-of-service": "/terms",
    "/terms-and-conditions": "/terms",
    "/csr-policy": "/csr",
};

/**
 * Suggested pages based on common patterns
 */
const SUGGESTED_PAGES = [
    { name: "All Products", href: "/products", icon: Package },
    { name: "A2 Milk", href: "/products/a2-gir-cow-milk", icon: Package },
    { name: "Bilona Ghee", href: "/products/a2-bilona-ghee", icon: Package },
    { name: "Subscription Plans", href: "/subscription-hub", icon: Package },
    { name: "Our Farm", href: "/the-farm", icon: Home },
    { name: "Contact Us", href: "/contact", icon: Phone },
];

export default function NotFound() {
    return (
        <main className="min-h-screen bg-creme dark:bg-midnight flex flex-col items-center justify-center px-4 py-16">
            {/* Breadcrumb Schema */}
            <BreadcrumbListSchema
                items={[
                    { name: "Home", item: "/" },
                    { name: "Page Not Found", item: "/404" },
                ]}
            />

            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="text-8xl md:text-9xl font-serif font-bold text-terracotta/20 dark:text-gold/20">
                        404
                    </div>
                    <div className="text-6xl md:text-7xl font-serif font-bold text-terracotta dark:text-gold -mt-16 md:-mt-20">
                        404
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-theme-primary mb-4">
                    Page Not Found
                </h1>

                <p className="text-lg text-theme-secondary mb-8 max-w-md mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or the URL might be incorrect.
                </p>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta dark:bg-gold text-white dark:text-midnight font-semibold rounded-full hover:opacity-90 transition-opacity"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-terracotta dark:border-gold text-terracotta dark:text-gold font-semibold rounded-full hover:bg-terracotta/10 dark:hover:bg-gold/10 transition-colors"
                    >
                        <Package className="w-5 h-5" />
                        Browse Products
                    </Link>
                </div>

                {/* Search Suggestion */}
                <div className="bg-white dark:bg-white/5 rounded-2xl p-6 mb-8 border border-theme-light">
                    <div className="flex items-center gap-3 mb-4">
                        <Search className="w-5 h-5 text-theme-accent" />
                        <h2 className="text-lg font-semibold text-theme-primary">
                            Looking for something specific?
                        </h2>
                    </div>
                    <p className="text-theme-secondary mb-4">
                        Try visiting one of these popular pages:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SUGGESTED_PAGES.map((page) => (
                            <Link
                                key={page.href}
                                href={page.href}
                                className="flex items-center gap-3 p-3 rounded-xl bg-theme-secondary/30 hover:bg-theme-secondary/50 transition-colors text-left"
                            >
                                <page.icon className="w-5 h-5 text-theme-accent flex-shrink-0" />
                                <span className="text-theme-primary font-medium">
                                    {page.name}
                                </span>
                                <ArrowLeft className="w-4 h-4 text-theme-muted ml-auto rotate-180" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-theme-secondary">
                    <p className="mb-2">Need help finding something?</p>
                    <p>
                        Contact us on{" "}
                        <a
                            href="https://wa.me/919919999123"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terracotta dark:text-gold hover:underline"
                        >
                            WhatsApp
                        </a>{" "}
                        or call{" "}
                        <a
                            href="tel:+919919999123"
                            className="text-terracotta dark:text-gold hover:underline"
                        >
                            +91 991-999-9123
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}

/**
 * Server-side function to check if a path should be redirected
 * Can be used in middleware for automatic redirects
 */
export function getRedirectPath(path: string): string | null {
    const normalizedPath = path.toLowerCase().trim();
    return REDIRECT_MAP[normalizedPath] || null;
}

/**
 * List of all redirect mappings for reference
 */
export const redirectMappings = Object.entries(REDIRECT_MAP).map(([from, to]) => ({
    from,
    to,
}));
