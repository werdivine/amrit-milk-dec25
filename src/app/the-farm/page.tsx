import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function TheFarm() {
    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/assets/img/hero-luxe-bg.png')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/20"></div>

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] mb-4 block">The Soul of Amrit</span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-ivory mb-8">Sanctum.</h1>
                    <p className="text-xl md:text-2xl text-ivory/80 max-w-2xl mx-auto leading-relaxed">
                        Where 400 + Gir Cows live as queens. No cages. No machines. Just 50 acres of organic freedom.
                    </p>
                </div>
            </section>

            {/* The Protocol */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-serif font-bold">The Vedic Protocol</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <span className="text-4xl font-bold text-gold/30">01</span>
                                <div>
                                    <h3 className="text-xl font-bold text-gold mb-2">Brahma Muhurta Milking</h3>
                                    <p className="text-ivory/60">Milking begins at 3:30 AM while chanting Vedic mantras. The cows are calm, ensuring zero adrenaline in the milk.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-4xl font-bold text-gold/30">02</span>
                                <div>
                                    <h3 className="text-xl font-bold text-gold mb-2">Ayurvedic Diet</h3>
                                    <p className="text-ivory/60">Our cows eat organic Shatavari, Ashwagandha, and Jaggery. What they eat, you eat.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-4xl font-bold text-gold/30">03</span>
                                <div>
                                    <h3 className="text-xl font-bold text-gold mb-2">Calf First Policy</h3>
                                    <p className="text-ivory/60">We only take what's left. The calf drinks from two udders; we milk the other two. Cruelty-free guarantee.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 translate-y-8">
                            <img src="/assets/img/farm-soul.png" className="rounded-2xl border border-glass-border grayscale hover:grayscale-0 transition-all duration-700 h-64 w-full object-cover" alt="Farm 1" />
                            <img src="/assets/img/milk-bottle.png" className="rounded-2xl border border-glass-border grayscale hover:grayscale-0 transition-all duration-700 h-64 w-full object-cover" alt="Farm 2" />
                        </div>
                        <div className="space-y-4">
                            <img src="/assets/img/hero-luxe-bg.png" className="rounded-2xl border border-glass-border grayscale hover:grayscale-0 transition-all duration-700 h-64 w-full object-cover" alt="Farm 3" />
                            <img src="/assets/img/atta-sack.png" className="rounded-2xl border border-glass-border grayscale hover:grayscale-0 transition-all duration-700 h-64 w-full object-cover" alt="Farm 4" />
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-glass-bg text-center">
                <h2 className="text-3xl font-serif font-bold mb-8">Visit The Sanctuary</h2>
                <p className="text-ivory/60 max-w-2xl mx-auto mb-8">We are open to our subscribers every Sunday. Come touch the cows, drink fresh milk, and reconnect with nature.</p>
                <Button href="/contact">Book a Farm Visit</Button>
            </Section>
        </main>
    );
}
