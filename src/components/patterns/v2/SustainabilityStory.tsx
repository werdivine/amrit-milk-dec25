"use client";

import { Section } from "@/components/ui/section";
import { Droplets, Heart, Leaf, Recycle, Sun, TreePine, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const practices = [
    {
        icon: Recycle,
        title: "Zero Waste Cycle",
        description: "Nothing leaves the farm as waste. Cow dung feeds our soil, and farm waste feeds our biogas plants.",
        color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    },
    {
        icon: Sun,
        title: "Solar Powered",
        description: "Harnessing the Indian sun to power our cold storage and processing, keeping your milk fresh naturally.",
        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    },
    {
        icon: Droplets,
        title: "Pristine Water",
        description: "Rainwater harvesting and drip irrigation ensure every drop is used with respect for the groundwater.",
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
        icon: Leaf,
        title: "Living Soil",
        description: "100% organic fodder. We grow what our cows eat, ensuring zero pesticides enter their system (or yours).",
        color: "bg-green-500/10 text-green-600 dark:text-green-400"
    },
    {
        icon: TreePine,
        title: "Native Heritage",
        description: "We are guardians of the Gir and Sahiwal breeds—indigenous cows meant for Indian soil and health.",
        color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
    },
    {
        icon: Heart,
        title: "Ethical Love",
        description: "Cruelty-free, natural breeding, and open pastures. Happy cows produce the purest healing milk.",
        color: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
    },
];

export function SustainabilityStory() {
    return (
        <Section id="the-farm" className="bg-[#FDFBF7] dark:bg-[#0D150B] text-espresso dark:text-white py-32 md:py-48 relative overflow-hidden transition-colors duration-500">
            {/* Cinematic Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(34,197,94,0.05),_transparent)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,_rgba(234,179,8,0.05),_transparent)]" />
                <div className="absolute inset-0 opacity-[0.03] grayscale"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaf.png")' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-green-500/20 mb-8"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Eco-Conscious Legacy
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] mb-10 text-espresso dark:text-white"
                        >
                            Decisions that <span className="text-green-600 dark:text-green-500 italic">breathe</span> life.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-espresso/70 dark:text-white/70 leading-relaxed max-w-xl"
                        >
                            At Amrit Milk, sustainability isn&apos;t a policy—it&apos;s our pulse.
                            We farm with the wisdom of our ancestors to protect the health of your descendants.
                        </motion.p>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                        <div className="pt-20">
                            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative shadow-2xl border border-espresso/10 dark:border-white/10 group">
                                <img src="/assets/img/farm-soul.png" alt="The Farm" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <p className="absolute bottom-10 left-8 right-8 text-sm font-bold tracking-widest uppercase text-white">Pure Horizons</p>
                            </div>
                        </div>
                        <div>
                            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative shadow-2xl border border-espresso/10 dark:border-white/10 group">
                                <img src="/assets/img/products/amrit_ghee_premium.png" alt="Native Heritage" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <p className="absolute bottom-10 left-8 right-8 text-sm font-bold tracking-widest uppercase text-white">Native Heritage</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {practices.map((practice, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-white/5 backdrop-blur-md border border-espresso/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-xl dark:shadow-none hover:shadow-2xl hover:border-green-500/30 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${practice.color} shadow-lg shadow-black/5 dark:shadow-black/20`}>
                                <practice.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-serif text-espresso dark:text-white">{practice.title}</h3>
                            <p className="text-espresso/60 dark:text-white/60 leading-relaxed">{practice.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 text-center"
                >
                    <div className="inline-block p-1 bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-green-500/20 rounded-[2rem]">
                        <div className="bg-[#FDFBF7] dark:bg-[#0D150B] rounded-[1.9rem] px-12 py-10 border border-espresso/5 dark:border-white/10">
                            <p className="text-2xl md:text-3xl font-serif italic text-espresso/90 dark:text-white/90 max-w-4xl mx-auto leading-relaxed">
                                &quot;Dharti Maa ki seva hi humara asli uddeshya hai. Jab dharti khush hogi,
                                tabhi toh shuddh amrit jaisa doodh milega।&quot;
                            </p>
                            <div className="flex items-center justify-center gap-4 mt-8">
                                <div className="h-px w-8 bg-green-500/30" />
                                <span className="text-xs font-bold uppercase tracking-[0.4em] text-green-600 dark:text-green-500">The Amrit Commitment</span>
                                <div className="h-px w-8 bg-green-500/30" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
