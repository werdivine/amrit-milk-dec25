import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Manifesto() {
    return (
        <Section className="bg-creme-light dark:bg-midnight-mid relative transition-colors duration-300">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                <div className="flex-1 space-y-8">
                    <span className="block text-terracotta dark:text-gold text-sm font-bold uppercase tracking-[0.3em] transition-colors duration-300">The Manifesto</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-espresso dark:text-ivory transition-colors duration-300">
                        Not Just Milk. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-espresso to-terracotta dark:from-ivory dark:to-gold">Liquid Heritage.</span>
                    </h2>
                    <div className="space-y-6 text-espresso/70 dark:text-ivory/70 text-lg leading-relaxed transition-colors duration-300">
                        <p>
                            In a world of industrial white fluid, we stand as the guardians of the Vedic tradition. Our Gows (cows) are not manufacturing units; they are mothers.
                        </p>
                        <p>
                            We reject hormone injections. We reject plastic packaging. We reject the very idea of "standardized" milk. This is raw, living nutrition, delivered with the reverence it deserves.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Button variant="outline" className="border-espresso/20 text-espresso hover:bg-espresso/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">Read Our Story</Button>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="aspect-[4/5] bg-creme dark:bg-midnight-light rounded-2xl overflow-hidden border border-espresso/10 dark:border-glass-border relative transition-colors duration-300">
                        {/* Image Placeholder */}
                        <div className="absolute inset-0 bg-[url('/assets/img/farm-soul.png')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-creme-light dark:from-midnight via-transparent to-transparent transition-colors duration-300"></div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <blockquote className="font-serif italic text-xl md:text-2xl text-espresso dark:text-ivory leading-relaxed transition-colors duration-300">
                                "The milk from a happy, free-grazing Gir cow is equivalent to nectar."
                            </blockquote>
                            <cite className="block mt-4 text-terracotta dark:text-gold font-bold not-italic tracking-widest text-xs uppercase transition-colors duration-300">— Ancient Vedic Texts</cite>
                        </div>
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 border border-terracotta/20 dark:border-gold/20 rounded-full animate-spin-slow transition-colors duration-300"></div>
                </div>
            </div>
        </Section>
    );
}
