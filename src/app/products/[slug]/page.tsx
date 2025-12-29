import { enrichedProducts, ProductDetail } from "@/lib/productsEnriched";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Check, Heart, Shield, Leaf, Award, ChevronDown, Star, ArrowRight, ShoppingBag, Truck, ShieldCheck, Zap } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import Image from "next/image";

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    const enrichedProduct = enrichedProducts.find(p => p.slug === params.slug);
    const basicProduct = products.find(p => p.slug === params.slug);

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
        <main className="bg-midnight min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-b from-gold/5 to-transparent overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Product Image */}
                        <div className="sticky top-24">
                            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-midnight-mid/50 border border-white/5 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <img
                                    src={basicProduct.image}
                                    alt={basicProduct.title}
                                    className="relative z-10 w-full h-full object-contain p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                {[
                                    { icon: ShieldCheck, label: "100% Pure" },
                                    { icon: Truck, label: "Fast Delivery" },
                                    { icon: Zap, label: "Farm Fresh" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <item.icon className="w-5 h-5 text-gold" />
                                        <span className="text-[10px] uppercase tracking-widest text-ivory/60 font-bold">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div>
                                {basicProduct.badge && (
                                    <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold border border-gold/20 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                                        {basicProduct.badge}
                                    </span>
                                )}

                                <h1 className="text-5xl md:text-6xl font-serif font-bold text-ivory mb-4 leading-tight">
                                    {basicProduct.title}
                                </h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex text-gold">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-ivory/40 font-medium">4.9/5 (240+ Reviews)</span>
                                </div>

                                <div className="flex items-baseline gap-4">
                                    <p className="text-5xl font-bold text-gold">{basicProduct.price}</p>
                                    {basicProduct.regularPrice && basicProduct.regularPrice !== basicProduct.price && (
                                        <p className="text-2xl text-ivory/30 line-through font-light">{basicProduct.regularPrice}</p>
                                    )}
                                </div>
                            </div>

                            <p className="text-xl text-ivory/70 leading-relaxed font-light">
                                {basicProduct.description}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button size="lg" className="flex-1 min-w-[200px] h-16 text-lg" icon>
                                    Add to Cart
                                </Button>
                                <button className="w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-gold/10 hover:border-gold/30 transition-all group">
                                    <Heart className="w-6 h-6 text-ivory group-hover:text-gold transition-colors" />
                                </button>
                            </div>

                            {/* Delivery Info */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                                <div className="flex items-center gap-4 text-ivory/70">
                                    <Truck className="w-5 h-5 text-gold" />
                                    <span className="text-sm">Free delivery on orders above ₹500</span>
                                </div>
                                <div className="flex items-center gap-4 text-ivory/70">
                                    <ShieldCheck className="w-5 h-5 text-gold" />
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
                            <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">The Essence</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold">Nature's Purest Form</h2>
                        </div>
                        <div className="prose prose-invert prose-lg max-w-none">
                            {(enrichedProduct?.longDescription || basicProduct.description).split('\n\n').map((para, i) => (
                                <p key={i} className="text-ivory/60 leading-relaxed mb-6 text-xl font-light">{para}</p>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* Benefits Section with Interstitial CTA */}
                <Section className="bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Why It Matters</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">The Benefits</h2>
                                <div className="grid gap-6">
                                    {(enrichedProduct?.benefits || [
                                        "100% Pure & Natural",
                                        "No Preservatives",
                                        "Traditionally Sourced",
                                        "Ethically Produced"
                                    ]).map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-midnight border border-white/5 hover:border-gold/20 transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                                                <Check className="w-4 h-4 text-gold" />
                                            </div>
                                            <p className="text-ivory/70 font-medium">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* CTA Card */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 text-center space-y-8">
                                    <h3 className="text-3xl font-serif font-bold italic">"Quality is not an act, it is a habit."</h3>
                                    <p className="text-ivory/60 text-lg">Experience the difference of Vedic-standard purity delivered to your doorstep.</p>
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
                                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">How to Use</span>
                                    <h2 className="text-4xl font-serif font-bold">Daily Rituals</h2>
                                </div>
                                <div className="space-y-4">
                                    {(enrichedProduct?.howToUse || [
                                        "Use daily for best results",
                                        "Store in a cool, dry place",
                                        "Follow traditional cooking methods",
                                        "Consult your nutritionist"
                                    ]).map((step, i) => (
                                        <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                                            <span className="text-4xl font-serif font-bold text-gold/20">{i + 1}</span>
                                            <p className="text-ivory/70 font-light text-lg">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Nutrition or Extra Info */}
                            <div className="p-12 rounded-[3rem] bg-midnight-mid border border-white/5">
                                <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                                    <Award className="w-6 h-6 text-gold" />
                                    Nutrition Facts
                                </h3>
                                <div className="space-y-6">
                                    {(enrichedProduct?.nutrition || [
                                        { label: "Purity", value: "100%" },
                                        { label: "Preservatives", value: "Zero" },
                                        { label: "Source", value: "Desi Gir Cows" },
                                        { label: "Method", value: "Traditional" }
                                    ]).map((item, i) => (
                                        <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0">
                                            <span className="text-ivory/50 font-medium uppercase tracking-wider text-xs">{item.label}</span>
                                            <span className="text-gold font-bold">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-12 p-6 rounded-2xl bg-gold/5 border border-gold/10 italic text-sm text-ivory/60 text-center">
                                    *Values may vary slightly based on seasonal farm conditions.
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Final CTA Section */}
                <Section className="pb-32">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative p-16 md:p-24 rounded-[4rem] bg-gold text-midnight text-center overflow-hidden">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/20 blur-[100px] rounded-full"></div>
                            
                            <div className="relative z-10 space-y-8">
                                <span className="inline-block px-6 py-2 bg-midnight text-gold rounded-full text-xs font-bold uppercase tracking-widest">Limited Availability</span>
                                <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">Bring the Farm to Your Table.</h2>
                                <p className="text-xl md:text-2xl font-medium opacity-80 max-w-2xl mx-auto leading-relaxed">
                                    Join our community of conscious consumers choosing health over convenience.
                                </p>
                                <div className="flex flex-wrap justify-center gap-6 pt-8">
                                    <Button variant="outline" size="lg" className="bg-midnight text-white border-none h-16 px-12 text-lg hover:bg-midnight/90">
                                        Subscribe Now
                                    </Button>
                                    <Button variant="outline" size="lg" className="bg-transparent border-2 border-midnight text-midnight h-16 px-12 text-lg hover:bg-midnight hover:text-white">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Recommended Products */}
                {recommendedProducts.length > 0 && (
                    <Section className="bg-white/[0.01]">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Because You Liked This</span>
                                    <h2 className="text-4xl font-serif font-bold">Recommended for You</h2>
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
                                <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Popular Choice</span>
                                <h2 className="text-4xl font-serif font-bold">Best Sellers</h2>
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
                <Section className="bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Discover More</span>
                                <h2 className="text-4xl font-serif font-bold">You Might Also Like</h2>
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
