import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { BenefitsSection } from "@/components/shop/BenefitsSection";
import { HowToUseSection } from "@/components/shop/HowToUseSection";
import { IngredientsSection } from "@/components/shop/IngredientsSection";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductHighlightsSection } from "@/components/shop/ProductHighlightsSection";
import { ShareButton } from "@/components/shop/ShareButton";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getProductBySlug, getProducts } from "@/lib/fetchProducts";
import { getContentForProduct } from "@/lib/product-content";
import {
    ArrowRight,
    Award,
    Heart,
    MessageCircle,
    ShieldCheck,
    Star,
    Truck,
    Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);
    if (!product) return {};

    const title = `${product.title} | Amrit Milk Organic`;
    const description = product.description;
    // Check for optimized smaller variants for WhatsApp/Social (<300KB)
    let socialImageUrl = product.image;
    if (socialImageUrl.includes("gir_1l_v2.png")) {
        socialImageUrl = "/assets/img/products/amrit_milk_gir_1l_single.png";
    } else if (socialImageUrl.includes("sahiwal_1l_v2.png")) {
        socialImageUrl = "/assets/img/products/amrit_milk_sahiwal_1l_single.png";
    } else {
        // Fallback to the optimized brand logo (266KB) for all other heavy images (>800KB)
        // This ensures WhatsApp ALWAYS shows an image instead of failing due to size
        socialImageUrl = "/assets/img/amrit-logo-transparent.png";
    }

    const imageUrl = socialImageUrl.startsWith("http")
        ? socialImageUrl
        : `https://amritmilkorganic.com${socialImageUrl}`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://amritmilkorganic.com/products/${params.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://amritmilkorganic.com/products/${params.slug}`,
            siteName: "Amrit Milk Organic",
            images: [
                {
                    url: imageUrl,
                    secureUrl: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                    type: "image/png",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const products = await getProducts();
    const basicProduct = await getProductBySlug(slug);

    if (!basicProduct) {
        notFound();
    }

    // Get specific content based on category or slug
    let contentKey = basicProduct.category;
    if (basicProduct.title.toLowerCase().includes("ghee")) contentKey = "ghee"; // Force ghee if title has it
    const content = getContentForProduct(contentKey);

    // Recommended products (same category, excluding current)
    const recommendedProducts = products
        .filter((p: any) => p.category === basicProduct.category && p.slug !== basicProduct.slug)
        .slice(0, 4);

    // Best selling products (those with Best Seller badge or first 4)
    const bestSellingProducts = products
        .filter(
            (p: any) =>
                p.badge?.toLowerCase().includes("seller") ||
                p.badge?.toLowerCase().includes("value") ||
                p.featured
        )
        .slice(0, 4);

    // Other products (randomly selected from other categories)
    const otherProducts = products
        .filter((p: any) => p.category !== basicProduct.category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return (
        <main className="bg-theme-primary min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 md:pt-32 pb-20 bg-gradient-to-b from-terracotta/5 dark:from-gold/5 to-transparent overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-terracotta/5 dark:bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-6">
                    {/* Mobile Header (Title on Top) */}
                    <div className="lg:hidden mb-8 text-center">
                        {basicProduct.badge && (
                            <span className="inline-block px-4 py-1.5 bg-terracotta/10 dark:bg-gold/10 text-theme-accent border border-terracotta/20 dark:border-gold/20 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                                {basicProduct.badge}
                            </span>
                        )}
                        <h1 className="text-4xl font-serif font-bold text-theme-primary mb-4 leading-tight">
                            {basicProduct.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="flex text-theme-accent">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-xs text-theme-muted font-medium">
                                4.9/5 (240+ Reviews)
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* Product Image */}
                        <div className="sticky top-24">
                            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-theme-secondary border border-theme-light group">
                                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 dark:from-gold/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <Image
                                    src={basicProduct.image}
                                    alt={basicProduct.title}
                                    width={800}
                                    height={800}
                                    className="relative z-10 w-full h-full object-contain p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                {[
                                    { icon: ShieldCheck, label: "100% Pure" },
                                    { icon: Truck, label: "Fast Delivery" },
                                    { icon: Zap, label: "Farm Fresh" },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-theme-elevated border border-theme-light"
                                    >
                                        <item.icon className="w-5 h-5 text-theme-accent" />
                                        <span className="text-[10px] uppercase tracking-widest text-theme-muted font-bold">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div>
                                {basicProduct.badge && (
                                    <span className="hidden lg:inline-block px-4 py-1.5 bg-terracotta/10 dark:bg-gold/10 text-theme-accent border border-terracotta/20 dark:border-gold/20 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                                        {basicProduct.badge}
                                    </span>
                                )}

                                <h1 className="hidden lg:block text-5xl md:text-6xl font-serif font-bold text-theme-primary mb-4 leading-tight">
                                    {basicProduct.title}
                                </h1>

                                <div className="hidden lg:flex items-center gap-4 mb-6">
                                    <div className="flex text-theme-accent">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-theme-muted font-medium">
                                        4.9/5 (240+ Reviews)
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-4">
                                    <p className="text-5xl font-bold text-theme-accent">
                                        {basicProduct.price}
                                    </p>
                                    {basicProduct.regularPrice &&
                                        basicProduct.regularPrice !== basicProduct.price && (
                                            <p className="text-2xl text-theme-muted line-through font-light">
                                                {basicProduct.regularPrice}
                                            </p>
                                        )}
                                </div>
                            </div>

                            <p className="text-xl text-theme-secondary leading-relaxed font-light">
                                {basicProduct.description}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <AddToCartButton
                                    id={basicProduct.id}
                                    title={basicProduct.title}
                                    price={basicProduct.price}
                                    image={basicProduct.image}
                                    slug={basicProduct.slug}
                                    category={basicProduct.category}
                                    description={basicProduct.description}
                                    sku={basicProduct.sku}
                                />
                                <ShareButton
                                    title={basicProduct.title}
                                    text={basicProduct.description}
                                    url={`https://amritmilkorganic.com/products/${basicProduct.slug}`}
                                />
                                <button className="w-16 h-16 flex items-center justify-center bg-theme-elevated border border-theme-light rounded-full hover:bg-terracotta/10 dark:hover:bg-gold/10 hover:border-terracotta/30 dark:hover:border-gold/30 transition-all group">
                                    <Heart className="w-6 h-6 text-theme-primary group-hover:text-theme-accent transition-colors" />
                                </button>
                            </div>

                            {/* Delivery Info */}
                            <div className="p-6 rounded-2xl bg-theme-elevated border border-theme-light space-y-4">
                                <div className="flex items-center gap-4 text-theme-secondary">
                                    <Truck className="w-5 h-5 text-theme-accent" />
                                    <span className="text-sm">
                                        Free delivery on orders above ₹500
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-theme-secondary">
                                    <ShieldCheck className="w-5 h-5 text-theme-accent" />
                                    <span className="text-sm">
                                        Quality Guaranteed or Money Back
                                    </span>
                                </div>
                            </div>

                            {/* New Product Detail Sections */}
                            {(basicProduct.highlights ||
                                basicProduct.ingredients ||
                                basicProduct.benefits ||
                                basicProduct.howToUse) && (
                                <div className="space-y-8 p-6 rounded-2xl bg-gradient-to-br from-theme-elevated to-theme-secondary/30 border border-theme-light">
                                    <ProductHighlightsSection
                                        highlights={basicProduct.highlights || []}
                                    />
                                    <IngredientsSection
                                        ingredients={basicProduct.ingredients || []}
                                    />
                                    <BenefitsSection benefits={basicProduct.benefits || []} />
                                    <HowToUseSection steps={basicProduct.howToUse || []} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="space-y-0">
                {/* 1. What it is */}
                <Section className="relative overflow-hidden">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            The Product
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary mb-8">
                            What it is
                        </h2>
                        <p className="text-xl md:text-2xl text-theme-secondary font-light leading-relaxed">
                            {content.whatItIs}
                        </p>
                    </div>
                </Section>

                {/* 2. Why it's safe */}
                <Section className="bg-theme-secondary/30">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                Safety First
                            </span>
                            <h2 className="text-4xl font-serif font-bold text-theme-primary">
                                Why it&apos;s safe for families
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {content.whySafe.map(
                                (
                                    item: string,
                                    i: number // Explicitly typed as string
                                ) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-white/5 border border-theme-light"
                                    >
                                        <ShieldCheck className="w-8 h-8 text-terracotta dark:text-gold" />
                                        <p className="text-lg font-medium text-theme-primary">
                                            {item}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </Section>

                {/* 3. The Difference */}
                <Section>
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                The Amrit Standard
                            </span>
                            <h2 className="text-4xl font-serif font-bold text-theme-primary">
                                What makes Amrit Milk different
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {content.difference.map(
                                (
                                    item: string,
                                    i: number // Typed
                                ) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-6 rounded-2xl bg-theme-elevated border border-terracotta/20 dark:border-gold/20"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center flex-shrink-0">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <p className="text-lg font-medium text-theme-primary pt-2">
                                            {item}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </Section>

                {/* 4. Who should choose */}
                <Section className="bg-theme-primary relative overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-terracotta/5 dark:bg-gold/5"></div>
                    <div className="max-w-5xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                Ideal For
                            </span>
                            <h2 className="text-4xl font-serif font-bold text-theme-primary">
                                Who should choose this
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {content.whoShouldChoose.map(
                                (
                                    item: string,
                                    i: number // Typed
                                ) => (
                                    <span
                                        key={i}
                                        className="px-8 py-4 rounded-full bg-white dark:bg-white/10 border border-theme-light text-xl text-theme-secondary shadow-sm"
                                    >
                                        {item}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </Section>

                {/* 5. Ordering & Delivery */}
                <Section>
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            Service
                        </span>
                        <h2 className="text-4xl font-serif font-bold text-theme-primary mb-12">
                            Ordering & Delivery
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {content.ordering.map(
                                (
                                    item: string,
                                    i: number // Typed
                                ) => (
                                    <div key={i} className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-theme-secondary/10 flex items-center justify-center">
                                            <Truck className="w-8 h-8 text-theme-accent" />
                                        </div>
                                        <p className="text-lg font-medium text-theme-primary">
                                            {item}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="inline-block">
                            <a
                                href="https://wa.me/919919999123"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full text-lg font-bold transition-transform hover:scale-105"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Have a question? Talk to us on WhatsApp
                            </a>
                        </div>
                    </div>
                </Section>

                {/* Recommended Products */}
                {recommendedProducts.length > 0 && (
                    <Section className="bg-theme-secondary/30">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                        Because You Liked This
                                    </span>
                                    <h2 className="text-4xl font-serif font-bold text-theme-primary">
                                        Recommended for You
                                    </h2>
                                </div>
                                <Button variant="outline" href="/products">
                                    View All <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {recommendedProducts.map((p: any) => (
                                    <ProductCard key={p.id} {...p} />
                                ))}
                            </div>
                        </div>
                    </Section>
                )}

                {/* Best Sellers */}
                <Section className="bg-theme-secondary/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                    Popular Choices
                                </span>
                                <h2 className="text-4xl font-serif font-bold text-theme-primary">
                                    Best Sellers
                                </h2>
                            </div>
                            <Button variant="outline" href="/products">
                                View All <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {bestSellingProducts.map((p: any) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                </Section>

                {/* Other Products */}
                <Section className="bg-theme-secondary/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                    Discover More
                                </span>
                                <h2 className="text-4xl font-serif font-bold text-theme-primary">
                                    You Might Also Like
                                </h2>
                            </div>
                            <Button variant="outline" href="/products">
                                Explore More <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {otherProducts.map((p: any) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                </Section>
            </div>
        </main>
    );
}
