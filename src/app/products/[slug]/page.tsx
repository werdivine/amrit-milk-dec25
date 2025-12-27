import { enrichedProducts } from "@/lib/productsEnriched";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Check, Heart, Shield, Leaf, Award, ChevronDown } from "lucide-react";

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    const enrichedProduct = enrichedProducts.find(p => p.slug === params.slug);

    // If no enriched data, use basic product
    const basicProduct = products.find(p => p.slug === params.slug);

    if (!basicProduct) {
        notFound();
    }

    // If we have enriched data, show full rich page
    if (enrichedProduct) {
        return <RichProductPage product={enrichedProduct} />;
    }

    // Otherwise show basic product page
    return <BasicProductPage product={basicProduct} />;
}

// Rich product page for products with detailed content
function RichProductPage({ product }: { product: typeof enrichedProducts[0] }) {
    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-b from-gold/5 to-transparent">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Product Image */}
                        <div className="sticky top-24">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-midnight-mid">
                                <div className="absolute inset-0 bg-gold/10 blur-3xl"></div>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="relative z-10 w-full h-full object-contain p-12"
                                />
                            </div>

                            {/* Certifications */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {product.certifications.map((cert, i) => (
                                    <div key={i} className="bg-glass-bg border border-glass-border rounded-xl p-4 flex items-center gap-3">
                                        <Award className="w-5 h-5 text-gold flex-shrink-0" />
                                        <span className="text-xs text-ivory/70">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            {product.badge && (
                                <span className="inline-block px-4 py-2 bg-gold text-midnight text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                                    {product.badge}
                                </span>
                            )}

                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.title}</h1>

                            <div className="flex items-baseline gap-4 mb-6">
                                <p className="text-4xl font-bold text-gold">{product.price}</p>
                                {product.regularPrice && product.regularPrice !== product.price && (
                                    <p className="text-xl text-ivory/40 line-through">{product.regularPrice}</p>
                                )}
                            </div>

                            <p className="text-xl text-ivory/70 leading-relaxed mb-8">
                                {product.description}
                            </p>

                            <div className="flex gap-4 mb-12">
                                <Button size="lg" icon className="flex-1">
                                    Add to Cart
                                </Button>
                                <button className="p-4 bg-glass-bg border border-glass-border rounded-full hover:border-gold/30 transition-colors">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Quick Facts */}
                            <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 mb-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs text-ivory/60 uppercase tracking-wider mb-1">Category</p>
                                        <p className="font-bold text-gold">{product.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-ivory/60 uppercase tracking-wider mb-1">SKU</p>
                                        <p className="font-bold">{product.sku}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Subscription Option */}
                            {product.subscription && (
                                <div className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="w-6 h-6 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2">Save with Subscription</h3>
                                            <p className="text-sm text-ivory/70 mb-4">Get recurring delivery and never run out. Cancel anytime. Save up to 15%.</p>
                                            <Button variant="outline" size="sm">
                                                Subscribe & Save
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Long Description */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold mb-6">About This Product</h2>
                    <div className="prose prose-invert prose-lg max-w-none">
                        {product.longDescription.split('\n\n').map((para, i) => (
                            <p key={i} className="text-ivory/70 leading-relaxed mb-4">{para}</p>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Benefits */}
            <Section className="bg-midnight-mid">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center">Health Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-4 bg-glass-bg border border-glass-border rounded-xl p-6 hover:border-gold/30 transition-all">
                                <Check className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                                <p className="text-ivory/80">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Nutrition */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center">Nutrition Facts</h2>
                    <div className="bg-glass-bg border border-glass-border rounded-2xl p-8">
                        <div className="space-y-4">
                            {product.nutrition.map((item, i) => (
                                <div key={i} className="flex justify-between items-center pb-4 border-b border-glass-border last:border-0">
                                    <span className="font-medium">{item.label}</span>
                                    <span className="text-gold font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* How to Use */}
            <Section className="bg-midnight-mid">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center">How to Use</h2>
                    <div className="grid gap-4">
                        {product.howToUse.map((step, i) => (
                            <div key={i} className="flex items-start gap-4 bg-glass-bg border border-glass-border rounded-xl p-6">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-gold font-bold text-sm">{i + 1}</span>
                                </div>
                                <p className="text-ivory/80">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Recipes (if available) */}
            {product.recipes && product.recipes.length > 0 && (
                <Section>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-serif font-bold mb-12 text-center">Recipe Ideas</h2>
                        <div className="grid gap-6">
                            {product.recipes.map((recipe, i) => (
                                <div key={i} className="bg-glass-bg border border-glass-border rounded-2xl p-8">
                                    <h3 className="text-2xl font-serif font-bold mb-4 text-gold">{recipe.name}</h3>
                                    <p className="text-ivory/70 leading-relaxed">{recipe.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* FAQs */}
            <Section className="bg-midnight-mid">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {product.faqs.map((faq, i) => (
                            <details key={i} className="bg-glass-bg border border-glass-border rounded-xl group">
                                <summary className="p-6 cursor-pointer flex justify-between items-center hover:bg-glass-border/10 transition-colors">
                                    <span className="font-bold pr-4">{faq.question}</span>
                                    <ChevronDown className="w-5 h-5 text-gold group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6">
                                    <p className="text-ivory/70 leading-relaxed">{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Research (if available) */}
            {product.research && product.research.length > 0 && (
                <Section>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-serif font-bold mb-8 text-center">Scientific Research</h2>
                        <div className="bg-glass-bg border border-glass-border rounded-2xl p-8 space-y-4">
                            {product.research.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                                    <p className="text-sm text-ivory/70 italic">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}
        </main>
    );
}

// Basic product page for products without detailed content yet
function BasicProductPage({ product }: { product: any }) {
    return (
        <main className="bg-midnight min-h-screen pt-32">
            <Section>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <img src={product.image} alt={product.title} className="w-full rounded-2xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-serif font-bold mb-4">{product.title}</h1>
                            <p className="text-3xl font-bold text-gold mb-6">{product.price}</p>
                            <p className="text-xl text-ivory/70 mb-8">{product.description}</p>
                            <Button size="lg" icon>Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
