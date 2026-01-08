"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const experts = [
    {
        name: "Dr. Aniruddh Sharma",
        role: "Pediatrician & Nutritionist",
        quote: "For growing children, A2 milk is the only choice that ensures proper cognitive development without the inflammatory triggers of A1 milk.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dr1",
    },
    {
        name: "Vaidya Rajeshwari",
        role: "Ayurvedic Practitioner",
        quote: "Our ancient texts call Desi Cow Ghee &apos;Maha-Aushadhi&apos;. Amrit Sovereign preserves this potency by following the Bilona method strictly.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dr2",
    },
];

export function ExpertPanel() {
    return (
        <Section className="bg-creme dark:bg-midnight transition-colors duration-500">
            <div className="space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">
                            Medical Trust
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory">
                            The Expert <span className="italic">Perspective.</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-espresso/60 dark:text-ivory/60">
                        Top healthcare professionals and traditional healers recommend Amrit
                        Sovereign for its uncompromising quality standards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {experts.map((expert, i) => (
                        <motion.div
                            key={expert.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-creme-light dark:bg-white/5 p-10 rounded-[3rem] space-y-8 border border-espresso/5 dark:border-white/5 flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-10 hover:shadow-lifted dark:hover:shadow-none transition-all duration-500"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-terracotta/20 dark:border-gold/20 flex-shrink-0">
                                <img
                                    src={expert.image}
                                    alt={expert.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-4">
                                <Quote className="w-10 h-10 text-terracotta/20 dark:text-gold/20" />
                                <p className="text-lg text-espresso/80 dark:text-ivory/80 italic leading-relaxed">
                                    &quot;{expert.quote}&quot;
                                </p>
                                <div>
                                    <h4 className="text-xl font-bold text-espresso dark:text-ivory">
                                        {expert.name}
                                    </h4>
                                    <p className="text-xs uppercase tracking-widest text-terracotta dark:text-gold font-bold">
                                        {expert.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
