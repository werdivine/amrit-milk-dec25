"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Dr. Anjali S.",
        role: "Pediatrician & Mother",
        text: "I've seen a noticeable difference in my children's digestion and immunity since switching to Amrit's A2 milk. The difference between processed milk and this is night and day.",
        stars: 5,
    },
    {
        name: "Rajesh K.",
        role: "Fitness Enthusiast",
        text: "The Vedic Bilona Ghee is genuine. The aroma takes me back to my grandmother's village. It's now a staple in my pre-workout meals.",
        stars: 5,
    },
    {
        name: "Meera V.",
        role: "Yoga Instructor",
        text: "Finally, milk that doesn't cause bloating! Amrit has restored my faith in dairy. It feels light, energetic, and pure.",
        stars: 5,
    },
];

export function TestimonialCarousel() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white dark:bg-white/5 p-8 rounded-[2rem] relative border border-espresso/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow"
                >
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-gold/10 rotate-180" />

                    <div className="flex gap-1 mb-6">
                        {[...Array(t.stars)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                        ))}
                    </div>

                    <p className="text-lg text-espresso/80 dark:text-ivory/80 italic mb-8 leading-relaxed">
                        &quot;{t.text}&quot;
                    </p>

                    <div>
                        <div className="font-bold text-espresso dark:text-ivory font-serif text-xl">
                            {t.name}
                        </div>
                        <div className="text-sm text-espresso/50 dark:text-ivory/50 uppercase tracking-widest font-bold">
                            {t.role}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
