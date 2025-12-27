import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function AdvancedProductShowcase() {
    return (
        <Section className="bg-midnight-mid border-t border-glass-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className="space-y-8 order-2 md:order-1">
                    <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm">The Sovereign Difference</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-ivory">
                        Beyond Organic. <br />
                        <span className="text-gold">Vedic.</span>
                    </h2>
                    <p className="text-ivory/70 text-lg leading-relaxed">
                        Most "organic" milk is still processed. Ours is raw. Most "farm fresh" milk is still from mixed breeds. Ours is 100% Gir.
                        We follow the 4:00 AM Brahma Muhurta milking protocol to ensure the highest vibrational energy in every drop.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gold mb-1">A2</h3>
                            <p className="text-xs text-ivory/50 uppercase tracking-wider">Beta-Casein Protein</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gold mb-1">0%</h3>
                            <p className="text-xs text-ivory/50 uppercase tracking-wider">Adrenaline / Cortisol</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gold mb-1">4hr</h3>
                            <p className="text-xs text-ivory/50 uppercase tracking-wider">Farm to Fridge</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gold mb-1">Glass</h3>
                            <p className="text-xs text-ivory/50 uppercase tracking-wider">Zero Plastic Contact</p>
                        </div>
                    </div>
                    <div className="pt-8">
                        <Button href="/products">Explore The Collection</Button>
                    </div>
                </div>

                {/* Visual */}
                <div className="relative order-1 md:order-2">
                    <div className="relative z-10 aspect-square rounded-full border border-gold/20 flex items-center justify-center bg-midnight overflow-hidden">
                        <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"></div>
                        <img
                            src="/assets/img/milk-bottle.png"
                            alt="Sovereign A2 Milk"
                            className="w-3/4 object-contain drop-shadow-2xl animate-float"
                        />
                    </div>

                    {/* Orbital Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-spin-slow -z-0"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-spin-reverse-slower -z-0"></div>
                </div>
            </div>
        </Section>
    );
}
