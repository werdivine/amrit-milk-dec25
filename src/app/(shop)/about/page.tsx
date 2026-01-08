import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Heart, Leaf, Shield, Target } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="bg-theme-primary min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-terracotta/10 dark:from-gold/10 via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 animate-fade-in-up">
                    <span className="inline-block px-8 py-3 bg-theme-secondary backdrop-blur-md border border-theme-accent rounded-full text-theme-accent font-bold tracking-[0.25em] text-xs uppercase shadow-2xl mb-6">
                        The Founder&apos;s Odyssey
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl font-black mb-6 leading-tight text-theme-primary">
                        Born from{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-espresso via-terracotta to-espresso dark:from-ivory dark:via-gold dark:to-ivory animate-shine">
                            Purpose
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-theme-secondary max-w-3xl mx-auto leading-relaxed">
                        A journey from corporate burnout to rediscovering ancestral wisdom in every
                        drop of A2 milk.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6 animate-slide-in-left">
                        <span className="text-theme-accent font-bold uppercase tracking-[0.2em] text-sm">
                            The Beginning
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary">
                            Why We Started
                        </h2>
                        <div className="space-y-4 text-theme-secondary text-lg leading-relaxed">
                            <p>
                                In 2019, after years in the corporate world, our founder faced a
                                health crisis that modern medicine couldn&apos;t solve. The answer
                                came from an unexpected place: his grandmother&apos;s village in
                                rural India.
                            </p>
                            <p>
                                There, drinking fresh A2 milk from indigenous Gir cows, he
                                experienced a transformation. Within weeks, chronic inflammation
                                disappeared. Energy returned. Mental clarity sharpened.
                            </p>
                            <p>
                                This wasn&apos;t magic—it was biology. The A2 beta-casein protein
                                our ancestors consumed for millennia, before industrial farming bred
                                it out in favor of higher yields.
                            </p>
                        </div>
                        <Button href="/the-farm" className="mt-8">
                            Visit Our Farm
                        </Button>
                    </div>

                    <div className="relative aspect-square rounded-2xl overflow-hidden animate-slide-in-right">
                        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 dark:from-gold/20 to-transparent"></div>
                        <img
                            src="/assets/img/farm-soul.png"
                            alt="Farm Soul"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </Section>

            {/* Values Section */}
            <Section className="bg-theme-secondary">
                <div className="text-center mb-16">
                    <span className="text-theme-accent font-bold uppercase tracking-[0.2em] text-sm">
                        Our Principles
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary mt-4">
                        The Amrit Way
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Heart,
                            title: "Cow Welfare First",
                            desc: "Free-grazing, no force-milking, music therapy, and natural breeding only.",
                        },
                        {
                            icon: Target,
                            title: "Radical Transparency",
                            desc: "Every batch tested. Lab reports shared. Farm visits welcome anytime.",
                        },
                        {
                            icon: Leaf,
                            title: "Native Genetics",
                            desc: "100% pure Gir breed. No crossbreeding. Preserving indigenous DNA.",
                        },
                        {
                            icon: Shield,
                            title: "Zero Compromise",
                            desc: "No preservatives, no dilution, no plastic contact. Glass only.",
                        },
                    ].map((value, i) => (
                        <div
                            key={i}
                            className="p-8 card-theme rounded-2xl hover:border-terracotta/30 dark:hover:border-gold/30 transition-all duration-500 animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            <value.icon className="w-12 h-12 text-theme-accent mb-4" />
                            <h3 className="text-xl font-serif font-bold mb-3 text-theme-primary">
                                {value.title}
                            </h3>
                            <p className="text-theme-muted leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Mission Section */}
            <Section>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <span className="text-theme-accent font-bold uppercase tracking-[0.2em] text-sm">
                        Our Mission
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary">
                        Food You Can Trust
                    </h2>
                    <p className="text-xl text-theme-secondary leading-relaxed">
                        We believe every family deserves access to food that nourishes, not just
                        fills. Food produced with integrity, not just efficiency. Food that connects
                        you to the land, the farmer, and your own ancestral knowing.
                    </p>
                    <p className="text-xl text-theme-secondary leading-relaxed mt-4">
                        Amrit Milk Organic isn&apos;t just a dairy brand. It&apos;s a movement to
                        restore what industrial agriculture stole: the right to real food.
                    </p>
                    <Button href="/subscription-hub" size="lg" icon className="mt-8">
                        Join the Movement
                    </Button>
                </div>
            </Section>
        </main>
    );
}
