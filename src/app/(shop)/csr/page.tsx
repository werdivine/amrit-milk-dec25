import { Section } from "@/components/ui/section";
import { Droplet, Heart, Leaf, Recycle, Sun, TreePine } from "lucide-react";
import Image from "next/image";

export default function CSRPage() {
    return (
        <main className="flex min-h-screen flex-col pt-20">
            {/* Hero Section */}
            <section className="relative w-full py-32 bg-gradient-to-br from-creme via-ivory to-creme dark:from-midnight dark:via-midnight-mid dark:to-midnight transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                        Corporate Social Responsibility
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        Ahimsa. Sustainability. <br />
                        <span className="text-terracotta dark:text-gold">Legacy.</span>
                    </h1>
                    <p className="text-xl text-espresso/70 dark:text-ivory/70 max-w-3xl mx-auto leading-relaxed">
                        Our commitment to the earth, our animals, and future generations runs deeper
                        than business—it&apos;s our dharma.
                    </p>
                </div>
            </section>

            {/* Ahimsa Philosophy */}
            <Section className="bg-white dark:bg-midnight-deep">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-terracotta dark:text-gold font-bold uppercase tracking-widest text-xs">
                            The Ahimsa Way
                        </span>
                        <h2 className="text-4xl font-serif font-bold text-espresso dark:text-ivory">
                            Non-Violence, Not Just Non-Harm
                        </h2>
                        <p className="text-espresso/70 dark:text-ivory/70 leading-relaxed">
                            At Amrit, we practice true Ahimsa dairy. Our cows are never artificially
                            inseminated. Calves stay with their mothers and nurse first. Bulls are
                            honored and given meaningful work in the fields rather than being sold
                            for slaughter.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Calves fed before milking",
                                "No artificial insemination ever",
                                "Bulls live full natural lives",
                                "Zero slaughter guarantee",
                                "Organic, grass-fed diet",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-terracotta dark:text-gold" />
                                    <span className="text-espresso/80 dark:text-ivory/80">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative aspect-square rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 to-transparent dark:from-gold/20"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80"
                            alt="Gir Cows grazing naturally"
                            width={800}
                            height={800}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </Section>

            {/* Sustainability Pillars */}
            <Section className="bg-creme dark:bg-midnight">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-espresso dark:text-ivory">
                        Our Sustainability Pillars
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Sun,
                            title: "Solar Energy",
                            description:
                                "100% solar-powered milk chillers and operations. Zero fossil fuels on-farm.",
                        },
                        {
                            icon: Recycle,
                            title: "Glass Bottles",
                            description:
                                "Returnable, reusable glass packaging. Zero plastic waste contribution.",
                        },
                        {
                            icon: Droplet,
                            title: "Water Conservation",
                            description:
                                "Rainwater harvesting, drip irrigation, and wastewater recycling systems.",
                        },
                        {
                            icon: TreePine,
                            title: "Regenerative Farming",
                            description:
                                "Organic composting, natural pest control, and soil health restoration.",
                        },
                        {
                            icon: Leaf,
                            title: "Carbon Negative",
                            description:
                                "Our farm sequesters more carbon than it emits through tree planting.",
                        },
                        {
                            icon: Heart,
                            title: "Community Support",
                            description:
                                "Fair wages, education programs, and healthcare for all farm workers.",
                        },
                    ].map((pillar, i) => (
                        <div
                            key={i}
                            className="glass rounded-2xl p-8 border border-espresso/10 dark:border-glass-border"
                        >
                            <pillar.icon className="w-12 h-12 text-terracotta dark:text-gold mb-4" />
                            <h3 className="text-xl font-bold text-espresso dark:text-ivory mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-espresso/70 dark:text-ivory/70 leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Impact Stats */}
            <Section className="bg-gradient-to-br from-terracotta/10 to-transparent dark:from-gold/10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-espresso dark:text-ivory">
                        Our Environmental Impact
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { number: "100%", label: "Solar Powered" },
                        { number: "0", label: "Plastic Bottles" },
                        { number: "500+", label: "Trees Planted" },
                        { number: "30%", label: "Water Saved" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-5xl font-bold text-terracotta dark:text-gold mb-2">
                                {stat.number}
                            </div>
                            <div className="text-espresso/70 dark:text-ivory/70 uppercase tracking-widest text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* CSR Carbon Partnerships - NEW */}
            <Section className="bg-gradient-to-br from-creme-light to-white dark:from-midnight-mid dark:to-midnight">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-terracotta dark:text-gold font-bold uppercase tracking-widest text-xs">
                            Corporate + Community
                        </span>
                        <h2 className="text-4xl font-serif font-bold text-espresso dark:text-ivory">
                            CSR Funding That{" "}
                            <span className="text-terracotta dark:text-gold">Cuts Carbon</span> and
                            Lifts Farmers
                        </h2>
                        <p className="text-espresso/70 dark:text-ivory/70 leading-relaxed">
                            Channel your CSR to renewable chilling, bottle reuse, tree belts, and
                            farmer training. Trackable impact with carbon credit documentation.
                        </p>
                        <ul className="space-y-4">
                            {[
                                {
                                    emoji: "🌳",
                                    text: "Fund carbon sinks & fodder forests around Lucknow",
                                },
                                { emoji: "🔌", text: "Solar + biogas for chilling and processing" },
                                {
                                    emoji: "🧪",
                                    text: "Breed & genetics lab (BMF) for resilient Indian cows",
                                },
                                {
                                    emoji: "👩🏽‍🌾",
                                    text: "FPO capacity building for 1400+ partnered farmers",
                                },
                                {
                                    emoji: "📈",
                                    text: "Transparent reports & carbon credit certificates",
                                },
                            ].map((item) => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <span className="text-xl">{item.emoji}</span>
                                    <span className="text-espresso/80 dark:text-ivory/80">
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta dark:bg-gold text-white dark:text-midnight font-semibold rounded-full hover:opacity-90 transition-opacity"
                            >
                                Download CSR Deck
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-terracotta dark:border-gold text-terracotta dark:text-gold font-semibold rounded-full hover:bg-terracotta/5 dark:hover:bg-gold/5 transition-colors"
                            >
                                Book Impact Call
                            </a>
                        </div>
                    </div>

                    {/* Impact Scorecard */}
                    <div className="bg-white dark:bg-midnight-deep rounded-3xl p-8 border border-espresso/10 dark:border-glass-border shadow-xl">
                        <h3 className="text-xl font-bold text-espresso dark:text-ivory mb-6">
                            Impact Snapshot
                        </h3>
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {[
                                {
                                    value: "1400+",
                                    label: "Farmers empowered via FPO network",
                                    color: "terracotta",
                                },
                                {
                                    value: "18%",
                                    label: "Lower emissions per litre delivered",
                                    color: "gold",
                                },
                                {
                                    value: "₹50L",
                                    label: "CSR deployed in FY24",
                                    color: "terracotta",
                                },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div
                                        className={`text-3xl font-bold ${stat.color === "terracotta" ? "text-terracotta dark:text-gold" : "text-warmGold dark:text-warmGold"} mb-1`}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-espresso/60 dark:text-ivory/60 leading-tight">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="border-espresso/10 dark:border-glass-border my-6" />
                        <p className="text-sm text-espresso/60 dark:text-ivory/60 mb-4">
                            Choose initiatives: renewable energy, fodder forests, bottle reuse,
                            genetics lab, farmer training, Gaushala care.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-warmGold text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                        >
                            Talk to Impact Team
                        </a>
                    </div>
                </div>
            </Section>
        </main>
    );
}
