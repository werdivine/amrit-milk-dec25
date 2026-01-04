import { enrichedProducts, ProductDetail } from "@/lib/productsEnriched";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Check, Heart, Shield, Leaf, Award, ChevronDown, Star, ArrowRight, ShoppingBag, Truck, ShieldCheck, Zap } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import Image from "next/image";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const enrichedProduct = enrichedProducts.find(p => p.slug === slug);
    const basicProduct = products.find(p => p.slug === slug);

    if (!basicProduct) {
        notFound();
    }

    // Recommended products (same category, excluding current)
    const recommendedProducts = products
        .filter(p => p.category === basicProduct.category && p.slug !== basicProduct.slug)
        .slice(0, 4);

    // Best selling products (those with Best Seller badge or first 4)
    const bestSellingProducts = products
        .filter(p => p.badge?.toLowerCase().includes('seller') || p.badge?.toLowerCase().includes('value'))
        .slice(0, 4);

    // Other products (randomly selected from other categories)
    const otherProducts = products
        .filter(p => p.category !== basicProduct.category)
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
                            <span className="text-xs text-theme-muted font-medium">4.9/5 (240+ Reviews)</span>
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
                                    { icon: Zap, label: "Farm Fresh" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-theme-elevated border border-theme-light">
                                        <item.icon className="w-5 h-5 text-theme-accent" />
                                        <span className="text-[10px] uppercase tracking-widest text-theme-muted font-bold">{item.label}</span>
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
                                    <span className="text-sm text-theme-muted font-medium">4.9/5 (240+ Reviews)</span>
                                </div>

                                <div className="flex items-baseline gap-4">
                                    <p className="text-5xl font-bold text-theme-accent">{basicProduct.price}</p>
                                    {basicProduct.regularPrice && basicProduct.regularPrice !== basicProduct.price && (
                                        <p className="text-2xl text-theme-muted line-through font-light">{basicProduct.regularPrice}</p>
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
                                />
                                <button className="w-16 h-16 flex items-center justify-center bg-theme-elevated border border-theme-light rounded-full hover:bg-terracotta/10 dark:hover:bg-gold/10 hover:border-terracotta/30 dark:hover:border-gold/30 transition-all group">
                                    <Heart className="w-6 h-6 text-theme-primary group-hover:text-theme-accent transition-colors" />
                                </button>
                            </div>

                            {/* Delivery Info */}
                            <div className="p-6 rounded-2xl bg-theme-elevated border border-theme-light space-y-4">
                                <div className="flex items-center gap-4 text-theme-secondary">
                                    <Truck className="w-5 h-5 text-theme-accent" />
                                    <span className="text-sm">Free delivery on orders above ₹500</span>
                                </div>
                                <div className="flex items-center gap-4 text-theme-secondary">
                                    <ShieldCheck className="w-5 h-5 text-theme-accent" />
                                    <span className="text-sm">Quality Guaranteed or Money Back</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="space-y-0">
                {/* Description & Story */}
                <Section className="relative overflow-hidden">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">The Essence</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary">Nature's Purest Form</h2>
                        </div>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            {(enrichedProduct?.longDescription || basicProduct.description).split('\n\n').map((para, i) => (
                                <p key={i} className="text-theme-muted leading-relaxed mb-6 text-xl font-light">{para}</p>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* Benefits Section with Interstitial CTA */}
                <Section className="bg-theme-secondary/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Why It Matters</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-theme-primary">The Benefits</h2>
                                <div className="grid gap-6">
                                    {(enrichedProduct?.benefits || [
                                        "100% Pure & Natural",
                                        "No Preservatives",
                                        "Traditionally Sourced",
                                        "Ethically Produced"
                                    ]).map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-theme-card border border-theme-light hover:border-terracotta/20 dark:hover:border-gold/20 transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-terracotta/10 dark:bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta/20 dark:group-hover:bg-gold/20 transition-colors">
                                                <Check className="w-4 h-4 text-theme-accent" />
                                            </div>
                                            <p className="text-theme-secondary font-medium">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-terracotta/20 dark:bg-gold/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-terracotta/20 dark:from-gold/20 to-transparent border border-terracotta/30 dark:border-gold/30 text-center space-y-8">
                                    <h3 className="text-3xl font-serif font-bold italic text-theme-primary">"Quality is not an act, it is a habit."</h3>
                                    <p className="text-theme-muted text-lg">Experience the difference of Vedic-standard purity delivered to your doorstep.</p>
                                    <Button size="lg" className="w-full h-16" icon>Start Your Journey</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Uses & Nutrition Section */}
                <Section>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* How to Use */}
                            <div className="space-y-12">
                                <div>
                                    <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">How to Use</span>
                                    <h2 className="text-4xl font-serif font-bold text-theme-primary">Daily Rituals</h2>
                                </div>
                                <div className="space-y-4">
                                    {(enrichedProduct?.howToUse || [
                                        "Use daily for best results",
                                        "Store in a cool, dry place",
                                        "Follow traditional cooking methods",
                                        "Consult your nutritionist"
                                    ]).map((step, i) => (
                                        <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-theme-elevated border border-theme-light">
                                            <span className="text-4xl font-serif font-bold text-terracotta/20 dark:text-gold/20">{i + 1}</span>
                                            <p className="text-theme-secondary font-light text-lg">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Nutrition or Extra Info */}
                            <div className="p-12 rounded-[3rem] bg-theme-card border border-theme-light">
                                <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3 text-theme-primary">
                                    <Award className="w-6 h-6 text-theme-accent" />
                                    Nutrition Facts
                                </h3>
                                <div className="space-y-6">
                                    {(enrichedProduct?.nutrition || [
                                        { label: "Purity", value: "100%" },
                                        { label: "Preservatives", value: "Zero" },
                                        { label: "Source", value: "Desi Gir Cows" },
                                        { label: "Method", value: "Traditional" }
                                    ]).map((item, i) => (
                                        <div key={i} className="flex justify-between items-center pb-4 border-b border-theme-light last:border-0">
                                            <span className="text-theme-muted font-medium uppercase tracking-wider text-xs">{item.label}</span>
                                            <span className="text-theme-accent font-bold">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 rounded-2xl bg-terracotta/5 dark:bg-gold/5 border border-terracotta/10 dark:border-gold/10 italic text-sm text-theme-muted text-center">
                                    *Values may vary slightly based on seasonal farm conditions.
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Final CTA Section */}
                <Section className="pb-32">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative p-16 md:p-24 rounded-[4rem] bg-terracotta dark:bg-gold text-white dark:text-midnight text-center overflow-hidden">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/20 blur-[100px] rounded-full"></div>

                            <div className="relative z-10 space-y-8">
                                <span className="inline-block px-6 py-2 bg-midnight dark:bg-midnight text-terracotta dark:text-gold rounded-full text-xs font-bold uppercase tracking-widest">Limited Availability</span>
                                <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">Bring the Farm to Your Table.</h2>
                                <p className="text-xl md:text-2xl font-medium opacity-80 max-w-2xl mx-auto leading-relaxed">
                                    Join our community of conscious consumers choosing health over convenience.
                                </p>
                                <div className="flex flex-wrap justify-center gap-6 pt-8">
                                    <Button variant="outline" size="lg" className="bg-midnight text-white border-none h-16 px-12 text-lg hover:bg-midnight/90">
                                        Subscribe Now
                                    </Button>
                                    <Button variant="outline" size="lg" className="bg-transparent border-2 border-midnight dark:border-midnight text-midnight h-16 px-12 text-lg hover:bg-midnight hover:text-white">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Recommended Products */}
                {recommendedProducts.length > 0 && (
                    <Section className="bg-theme-secondary/30">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Because You Liked This</span>
                                    <h2 className="text-4xl font-serif font-bold text-theme-primary">Recommended for You</h2>
                                </div>
                                <Button variant="outline" href="/products">View All <ArrowRight className="ml-2 w-4 h-4" /></Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {recommendedProducts.map((p) => (
                                    <ProductCard key={p.id} {...p} />
                                ))}
                            </div>
                        </div>
                    </Section>
                )}

                {/* Best Selling Products */}
                <Section>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Popular Choice</span>
                                <h2 className="text-4xl font-serif font-bold text-theme-primary">Best Sellers</h2>
                            </div>
                            <Button variant="outline" href="/products">View All <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {bestSellingProducts.map((p) => (
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
                                <span className="text-theme-accent font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Discover More</span>
                                <h2 className="text-4xl font-serif font-bold text-theme-primary">You Might Also Like</h2>
                            </div>
                            <Button variant="outline" href="/products">Explore More <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {otherProducts.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                </Section>
            </div>
        </main>
    );
}
