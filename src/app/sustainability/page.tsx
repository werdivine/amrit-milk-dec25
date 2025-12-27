import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Sun, Truck, Heart, Users } from "lucide-react";

const initiatives = [
    {
        icon: Leaf,
        title: "Zero Chemical Farming",
        description: "Our fodder is grown using only organic methods. No pesticides, no synthetic fertilizers. Just pure, natural nutrition for our cows."
    },
    {
        icon: Recycle,
        title: "Glass Bottle Return Program",
        description: "100% of our glass bottles are collected, sterilized, and reused. Zero single-use plastic in our entire supply chain."
    },
    {
        icon: Sun,
        title: "Solar-Powered Operations",
        description: "Our dairy farm runs on 100% solar energy. From milking to cold storage to lighting — all powered by the sun."
    },
    {
        icon: Truck,
        title: "Electric Fleet Delivery",
        description: "Our entire delivery fleet consists of electric vehicles. Zero emissions from farm to your doorstep."
    },
    {
        icon: Heart,
        title: "Cruelty-Free Promise",
        description: "Calves drink first from two udders. We milk only the remaining two. Natural lifecycle, no artificial insemination."
    },
    {
        icon: Users,
        title: "Farmer Welfare Program",
        description: "We partner with local farmers, providing fair wages, healthcare benefits, and agricultural training."
    }
];

const impactStats = [
    { number: "50+", label: "Acres Organic Land" },
    { number: "0", label: "Kg Plastic Used" },
    { number: "100%", label: "Solar Powered" },
    { number: "400+", label: "Happy Cows" },
];

export default function SustainabilityPage() {
    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-midnight to-midnight" />
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-green-400 font-bold uppercase tracking-[0.3em] mb-4 block">Our Commitment</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-ivory mb-6">Sustainability</h1>
                    <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
                        Purity isn't just about what's in the milk. It's about how we treat
                        the land, the animals, and the people who make it possible.
                    </p>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-16 bg-midnight-mid border-y border-glass-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {impactStats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-5xl font-bold text-green-400 mb-2">{stat.number}</p>
                                <p className="text-ivory/60 uppercase tracking-wider text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Initiatives */}
            <Section>
                <div className="text-center mb-16">
                    <span className="text-green-400 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">What We Do</span>
                    <h2 className="text-4xl font-serif font-bold text-ivory">Green Initiatives</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {initiatives.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="glass p-8 rounded-3xl border border-glass-border hover:border-green-500/30 transition-all">
                                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                                    <Icon className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-ivory mb-3">{item.title}</h3>
                                <p className="text-ivory/60 leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            {/* Vision */}
            <Section className="bg-midnight-mid">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-green-400 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">2030 Vision</span>
                    <h2 className="text-4xl font-serif font-bold text-ivory mb-8">Our Sustainability Goals</h2>

                    <div className="glass p-8 md:p-12 rounded-3xl border border-green-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-green-400 mb-2">1000+</p>
                                <p className="text-ivory/70">Indigenous Cows Protected</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-green-400 mb-2">100%</p>
                                <p className="text-ivory/70">Carbon Neutral Operations</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-green-400 mb-2">500</p>
                                <p className="text-ivory/70">Farmer Families Supported</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <Section className="text-center">
                <h2 className="text-3xl font-serif font-bold text-ivory mb-6">Join the Movement</h2>
                <p className="text-ivory/60 max-w-xl mx-auto mb-8">
                    Every subscription supports sustainable dairy farming,
                    indigenous cow preservation, and rural livelihoods.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="/subscription-hub" size="lg" className="bg-green-500 text-midnight hover:bg-green-400">
                        Subscribe Now
                    </Button>
                    <Button href="/the-farm" variant="glass" size="lg">
                        Visit Our Farm
                    </Button>
                </div>
            </Section>
        </main>
    );
}
