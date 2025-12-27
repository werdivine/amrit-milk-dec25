"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "Finally, a milk that tastes exactly like what I remember from my grandmother's village in Gujarat. The glass bottles are a game-changer.",
        name: "Ananya Sharma",
        title: "Gomti Nagar Residents Association",
        rating: 5
    },
    {
        quote: "My kids used to hate milk. Now they ask for 'the gold milk' every morning. As a mother, the transparency reports give me total peace of mind.",
        name: "Dr. Meera Kapoor",
        title: "Pediatrician",
        rating: 5
    },
    {
        quote: "The Bilona Ghee is medicinal. I use it for my Ayurvedic morning ritual. Remarkable aroma and texture.",
        name: "Vikram Seth",
        title: "Yoga Practitioner",
        rating: 5
    },
    {
        quote: "Prompt delivery and very polite staff. The customer service via WhatsApp is very efficient.",
        name: "Rajesh Gupta",
        title: "Businessman",
        rating: 5
    },
    {
        quote: "After switching to Amrit, my daughter's chronic stomach issues have completely resolved. The A2 difference is real.",
        name: "Priya Malhotra",
        title: "Health Coach",
        rating: 5
    },
    {
        quote: "I've recommended Amrit to all my patients who have milk sensitivity. The results speak for themselves.",
        name: "Dr. Amit Verma",
        title: "Gastroenterologist",
        rating: 5
    }
];

export function WallOfLove() {
    return (
        <section className="py-32 bg-midnight relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                        Social Proof
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-ivory">
                        Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-300">Love.</span>
                    </h2>
                </motion.div>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            className="break-inside-avoid glass p-8 rounded-3xl border border-glass-border hover:border-gold/30 transition-all duration-500"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-ivory/80 italic text-lg leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-midnight font-bold text-lg">
                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-bold text-ivory">{testimonial.name}</p>
                                    <p className="text-ivory/50 text-sm">{testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
