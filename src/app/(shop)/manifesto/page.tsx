import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { CheckCircle } from "lucide-react";

export default function ManifestoPage() {
    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 animate-fade-in-up">
                    <span className="inline-block px-8 py-3 bg-midnight/80 backdrop-blur-md border border-gold rounded-full text-gold font-bold tracking-[0.25em] text-xs uppercase shadow-2xl mb-6">
                        The Sovereign Manifesto
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl font-black mb-6 leading-tight">
                        What We{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-gold to-ivory animate-shine">
                            Stand For
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-ivory/70 max-w-3xl mx-auto leading-relaxed">
                        A declaration of principles in a world of compromised food.
                    </p>
                </div>
            </section>

            {/* Manifesto Content */}
            <Section>
                <div className="max-w-4xl mx-auto space-y-12">
                    {[
                        {
                            title: "We Believe Food is Medicine",
                            content:
                                "Not metaphorically. Literally. A2 milk contains bioactive peptides that modulate inflammation, support immunity, and regulate digestion. But only when it&apos;s raw, fresh, and from stress-free cows. Industrial processing destroys these compounds. We don&apos;t process. We preserve.",
                        },
                        {
                            title: "We Reject the Industrial Food System",
                            content:
                                "Pasteurization, homogenization, plastic packaging, hormone injections, grain feeding—these aren't food safety measures. They're profit maximization strategies that sacrifice nutrition for shelf life. We choose nutrition over convenience, every single time.",
                        },
                        {
                            title: "We Honor the Cow as Sacred",
                            content:
                                "Not for religious reasons—though we respect those who hold them sacred. But because indigenous cow breeds like Gir are genetic treasures. Repositories of resilience, adapted to our climate, resistant to disease. Crossbreeding has nearly killed them off. We&apos;re bringing them back.",
                        },
                        {
                            title: "We Deliver Within 4 Hours. Always.",
                            content:
                                "Milk isn&apos;t meant to sit in cold storage for weeks. Fresh milk, consumed within hours of milking, contains living enzymes and beneficial bacteria. Probiotics aren&apos;t something you add to milk—they&apos;re naturally present when milk is truly fresh. We protect that.",
                        },
                        {
                            title: "We Use Glass. Never Plastic.",
                            content:
                                "Microplastics leach into food. Endocrine disruptors migrate from packaging. Glass is inert, reusable, and doesn&apos;t poison your family. Yes, it&apos;s more expensive. Yes, it&apos;s heavier. No, we&apos;re not switching to plastic. Ever.",
                        },
                        {
                            title: "We Are Transparent. Radically.",
                            content:
                                "Every batch is third-party lab tested. Reports are public. Our farm is open for visits (book ahead). We share both our wins and our challenges. If we ever fail a test or make a mistake, you&apos;ll hear it from us first. No hiding. No spinning.",
                        },
                        {
                            title: "We Price Fairly, Not Cheaply",
                            content:
                                "Our prices reflect real costs: feed quality, cow welfare, fair wages for farmers, glass bottles, cold chain logistics, and comprehensive testing. We won&apos;t compete on price with diluted, pasteurized, plastic-bottled milk. We compete on value. Health has no discount.",
                        },
                        {
                            title: "We Build a Movement, Not Just a Brand",
                            content:
                                "Every customer is a co-creator of food sovereignty. When you choose Amrit, you're voting for a different food system—one that cares for soil, animals, farmers, and your family's health. This is bigger than milk. This is about reclaiming what was stolen.",
                        },
                    ].map((section, i) => (
                        <div
                            key={i}
                            className="space-y-4 animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-ivory mb-3">
                                        {section.title}
                                    </h3>
                                    <p className="text-lg text-ivory/70 leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                            {i < 7 && <div className="h-px bg-glass-border"></div>}
                        </div>
                    ))}
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="bg-midnight-mid">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-ivory">
                        Ready to Join?
                    </h2>
                    <p className="text-xl text-ivory/70">
                        This manifesto isn&apos;t just words. It&apos;s our daily practice.
                        Experience the difference yourself.
                    </p>
                    <Button href="/subscription-hub" size="lg" icon>
                        Start Your Subscription
                    </Button>
                </div>
            </Section>
        </main>
    );
}
