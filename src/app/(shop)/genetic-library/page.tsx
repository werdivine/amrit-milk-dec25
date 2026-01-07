import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const cowBreeds = [
    {
        name: "Gir Cow",
        origin: "Gujarat",
        milkType: "A2 Only",
        features: ["Large curved horns", "Distinctive hump", "Red/brown mottled coat"],
        description: "The Gir is the most famous indigenous breed, known for producing the highest-quality A2 milk. Our herd consists exclusively of purebred Gir cows.",
        stats: { dailyMilk: "8-12L", fatContent: "4.5-5%", protein: "3.8%" }
    },
    {
        name: "Sahiwal",
        origin: "Punjab",
        milkType: "A2 Only",
        features: ["Heavy body", "Loose skin", "Reddish-brown coat"],
        description: "Sahiwal cattle are one of the best milch breeds and are known for their heat tolerance and tick resistance.",
        stats: { dailyMilk: "6-10L", fatContent: "4.5%", protein: "3.5%" }
    },
    {
        name: "Red Sindhi",
        origin: "Sindh/Gujarat",
        milkType: "A2 Only",
        features: ["Deep red color", "Compact body", "Adaptable"],
        description: "Known for their hardiness and adaptability to tropical conditions while maintaining excellent milk quality.",
        stats: { dailyMilk: "5-8L", fatContent: "4.2%", protein: "3.4%" }
    }
];

export default function GeneticLibraryPage() {
    return (
        <main className="bg-creme dark:bg-midnight min-h-screen transition-colors duration-500">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/assets/img/farm-soul.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/30" />
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] mb-4 block">The Bloodline</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-ivory mb-6">Genetic Library</h1>
                    <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
                        Every drop of Amrit Milk comes from verified indigenous breeds.
                        Explore the science behind pure A2 genetics.
                    </p>
                </div>
            </section>

            {/* A2 vs A1 Explainer */}
            <Section>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">The Science</span>
                    <h2 className="text-4xl font-serif font-bold text-espresso dark:text-ivory mb-6">A2 vs A1: The Critical Difference</h2>
                    <p className="text-xl text-espresso-light dark:text-ivory/70 leading-relaxed">
                        All milk contains beta-casein protein, but there are two types: A1 and A2.
                        When A1 protein is digested, it releases BCM-7, a peptide linked to
                        digestive discomfort and inflammation. Indigenous Indian cows naturally
                        produce only A2 protein — the same type found in human mother's milk.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-glass-bg border border-red-500/30 shadow-soft dark:shadow-none p-8 rounded-3xl">
                        <h3 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">❌ A1 Milk (Industrial)</h3>
                        <ul className="space-y-3 text-espresso-light dark:text-ivory/70">
                            <li>• Releases BCM-7 during digestion</li>
                            <li>• Linked to digestive discomfort</li>
                            <li>• From HF / Jersey hybrid breeds</li>
                            <li>• May trigger inflammation</li>
                            <li>• Often contains synthetic hormones</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-glass-bg border border-green-500/30 shadow-soft dark:shadow-none p-8 rounded-3xl">
                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">✅ A2 Milk (Indigenous)</h3>
                        <ul className="space-y-3 text-espresso-light dark:text-ivory/70">
                            <li>• No BCM-7 release</li>
                            <li>• Natural, easy digestion</li>
                            <li>• From Gir, Sahiwal, Red Sindhi</li>
                            <li>• Anti-inflammatory properties</li>
                            <li>• Hormone-free, natural cycle only</li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Cow Breeds */}
            <Section className="bg-creme-light dark:bg-midnight-mid transition-colors duration-500">
                <div className="text-center mb-16">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Herd</span>
                    <h2 className="text-4xl font-serif font-bold text-espresso dark:text-ivory">Indigenous Breeds</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cowBreeds.map((breed, index) => (
                        <div key={breed.name} className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border hover:border-gold/30 shadow-soft dark:shadow-none p-8 rounded-3xl transition-all">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-midnight text-3xl font-bold mb-6 mx-auto">
                                🐄
                            </div>
                            <h3 className="text-2xl font-bold text-gold mb-2 text-center">{breed.name}</h3>
                            <p className="text-espresso-muted dark:text-ivory/50 text-center mb-4">Origin: {breed.origin}</p>
                            <p className="text-espresso-light dark:text-ivory/70 text-center mb-6">{breed.description}</p>

                            <div className="grid grid-cols-3 gap-2 text-center border-t border-glass-border pt-6">
                                <div>
                                    <p className="text-gold font-bold">{breed.stats.dailyMilk}</p>
                                    <p className="text-espresso-muted dark:text-ivory/50 text-xs">Daily Yield</p>
                                </div>
                                <div>
                                    <p className="text-gold font-bold">{breed.stats.fatContent}</p>
                                    <p className="text-espresso-muted dark:text-ivory/50 text-xs">Fat</p>
                                </div>
                                <div>
                                    <p className="text-gold font-bold">{breed.stats.protein}</p>
                                    <p className="text-espresso-muted dark:text-ivory/50 text-xs">Protein</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <Section className="text-center">
                <h2 className="text-3xl font-serif font-bold text-espresso dark:text-ivory mb-6">Experience Pure A2 Genetics</h2>
                <p className="text-espresso-light dark:text-ivory/60 max-w-xl mx-auto mb-8">
                    Join 500+ families who have switched to verified pure A2 milk
                    from our indigenous Gir cow herd.
                </p>
                <Button href="/subscription-hub" size="lg" className="bg-gold text-midnight hover:bg-white">
                    Start Your Subscription
                </Button>
            </Section>
        </main>
    );
}
