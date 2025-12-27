import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Manifesto() {
    return (
        <Section className="bg-midnight-mid relative">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                <div className="flex-1 space-y-8">
                    <span className="block text-gold text-sm font-bold uppercase tracking-[0.3em]">The Manifesto</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                        Not Just Milk. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory to-gold">Liquid Heritage.</span>
                    </h2>
                    <div className="space-y-6 text-ivory/70 text-lg leading-relaxed">
                        <p>
                            In a world of industrial white fluid, we stand as the guardians of the Vedic tradition. Our Gows (cows) are not manufacturing units; they are mothers.
                        </p>
                        <p>
                            We reject hormone injections. We reject plastic packaging. We reject the very idea of "standardized" milk. This is raw, living nutrition, delivered with the reverence it deserves.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Button variant="outline">Read Our Story</Button>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="aspect-[4/5] bg-midnight-light rounded-2xl overflow-hidden border border-glass-border relative">
                        {/* Image Placeholder */}
                        <div className="absolute inset-0 bg-[url('/assets/img/farm-soul.png')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent"></div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <blockquote className="font-serif italic text-xl md:text-2xl text-ivory leading-relaxed">
                                "The milk from a happy, free-grazing Gir cow is equivalent to nectar."
                            </blockquote>
                            <cite className="block mt-4 text-gold font-bold not-italic tracking-widest text-xs uppercase">— Ancient Vedic Texts</cite>
                        </div>
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 border border-gold/20 rounded-full animate-spin-slow"></div>
                </div>
            </div>
        </Section>
    );
}
