"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Meera Oberoi",
        role: "Gomti Nagar",
        content: "We stopped getting 'Mother Dairy' because my daughter's skin issues vanished within a month of switching to Amrit Gir Milk. The taste is nostalgic.",
        stars: 5
    },
    {
        name: "Capt. Vikram Singh",
        role: "Hazratganj",
        content: "The Ghee is exactly like what we used to have at our village. Grainy texture, nutty aroma. Truly the gold standard of Bilona.",
        stars: 5
    },
    {
        name: "Dr. S. K. Gupta",
        role: "Indira Nagar",
        content: "Being a doctor, I analyze the cold chain. Amrit is the only service in Lucknow that genuinely maintains 4°C from farm to fridge.",
        stars: 5
    }
];

export function WallOfLove() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-500">
            <div className="space-y-16">
                <div className="text-center space-y-4">
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">The Verdict</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">Wall of <span className="text-terracotta">Love.</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-creme-light dark:bg-white/5 p-8 rounded-[2rem] border border-espresso/5 dark:border-white/5 space-y-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="space-y-4">
                                <div className="flex gap-1">
                                    {[...Array(t.stars)].map((_, idx) => (
                                        <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-terracotta/10" />
                                <p className="text-espresso/70 dark:text-ivory/70 leading-relaxed font-light italic">
                                    "{t.content}"
                                </p>
                            </div>
                            <div className="pt-6 border-t border-espresso/5 dark:border-white/5">
                                <h4 className="font-bold text-espresso dark:text-ivory">{t.name}</h4>
                                <p className="text-xs uppercase tracking-widest text-terracotta/60 dark:text-gold/60">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
