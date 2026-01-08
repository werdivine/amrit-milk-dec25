import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function AdvancedProductShowcase() {
    return (
        <Section className="bg-creme-light dark:bg-midnight-mid border-t border-espresso/5 dark:border-glass-border transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className="space-y-8 order-2 md:order-1">
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.2em] text-sm transition-colors duration-300">
                        The Sovereign Difference
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory transition-colors duration-300">
                        Beyond Organic. <br />
                        <span className="text-terracotta dark:text-gold">Vedic.</span>
                    </h2>
                    <p className="text-espresso/70 dark:text-ivory/70 text-lg leading-relaxed transition-colors duration-300">
                        Most &quot;organic&quot; milk is still processed. Ours is raw. Most
                        &quot;farm fresh&quot; milk is still from mixed breeds. Ours is 100% Gir. We
                        follow the 4:00 AM Brahma Muhurta milking protocol to ensure the highest
                        vibrational energy in every drop.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        {[
                            { title: "A2", subtitle: "Beta-Casein Protein" },
                            { title: "0%", subtitle: "Adrenaline / Cortisol" },
                            { title: "4hr", subtitle: "Farm to Fridge" },
                            { title: "Glass", subtitle: "Zero Plastic Contact" },
                        ].map((item, i) => (
                            <div key={i}>
                                <h3 className="text-2xl font-bold text-terracotta dark:text-gold mb-1 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-espresso/50 dark:text-ivory/50 uppercase tracking-wider transition-colors duration-300">
                                    {item.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8">
                        <Button
                            href="/products"
                            className="bg-espresso text-white hover:bg-terracotta dark:bg-gold dark:text-midnight dark:hover:bg-white transition-all"
                        >
                            Explore The Collection
                        </Button>
                    </div>
                </div>

                {/* Visual */}
                <div className="relative order-1 md:order-2">
                    <div className="relative z-10 aspect-square rounded-full border border-terracotta/20 dark:border-gold/20 flex items-center justify-center bg-creme dark:bg-midnight overflow-hidden transition-colors duration-300">
                        <div className="absolute inset-0 bg-terracotta/5 dark:bg-gold/5 blur-3xl rounded-full"></div>
                        <img
                            src="/assets/img/milk-bottle.png"
                            alt="Sovereign A2 Milk"
                            className="w-3/4 object-contain drop-shadow-2xl animate-float"
                        />
                    </div>

                    {/* Orbital Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-espresso/5 dark:border-white/5 rounded-full animate-spin-slow -z-0 transition-colors duration-300"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-espresso/5 dark:border-white/5 rounded-full animate-spin-reverse-slower -z-0 transition-colors duration-300"></div>
                </div>
            </div>
        </Section>
    );
}
