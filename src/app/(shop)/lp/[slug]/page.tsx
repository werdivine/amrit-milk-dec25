import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { seoPages } from "@/lib/seo-content";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return Object.keys(seoPages).map((slug) => ({
        slug,
    }));
}

export const dynamicParams = false;

export default function SEOPage({ params }: { params: { slug: string } }) {
    const data = seoPages[params.slug];

    if (!data) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-creme dark:bg-midnight">
            {/* SEO Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${data.image}')` }}
                />
                
                <div className="container relative z-20 mx-auto px-6 text-center text-white">
                    <div className="flex justify-center gap-4 mb-8">
                        {data.heroValues.map((val: string, i: number) => (
                            <span key={i} className="px-4 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-xs font-bold uppercase tracking-widest">
                                {val}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
                        {data.mainHeading}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light mb-10">
                        {data.subHeading}
                    </p>
                    <Button size="lg" className="bg-terracotta hover:bg-espresso text-white border-none text-lg px-8 h-14">
                        {data.ctaText}
                    </Button>
                </div>
            </section>

            {/* Content Blocks */}
            <Section>
                <div className="max-w-4xl mx-auto px-6 space-y-16">
                    {data.content.map((block: any, i: number) => (
                        <div key={i} className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-2">
                                <CheckCircle className="w-6 h-6 text-terracotta" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-espresso dark:text-gold mb-4">
                                    {block.title}
                                </h2>
                                <p className="text-lg text-espresso/80 dark:text-ivory/80 leading-relaxed">
                                    {block.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Local Trust Signal */}
            <Section className="bg-espresso dark:bg-white/5 py-16">
                <div className="container mx-auto px-6 text-center">
                    <MapPin className="w-12 h-12 text-terracotta mx-auto mb-6" />
                    <h2 className="text-3xl font-serif font-bold text-white mb-8">
                        Proudly Serving Lucknow
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 text-white/70">
                        <span>Gomti Nagar</span> • 
                        <span>Indira Nagar</span> • 
                        <span>Aliganj</span> • 
                        <span>Hazratganj</span> • 
                        <span>Mahanagar</span>
                    </div>
                    <div className="mt-12">
                         <a
                            href="https://wa.me/919919999123" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all"
                        >
                            <Phone className="w-5 h-5" />
                            Check Delivery in Your Area
                        </a>
                    </div>
                </div>
            </Section>
        </main>
    );
}
