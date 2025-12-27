"use client";

import { motion } from "framer-motion";

export function FounderNote() {
    return (
        <section className="py-32 bg-midnight relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    {/* Left - Signature & Quote */}
                    <motion.div
                        className="lg:col-span-2 text-center lg:text-right"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Signature Placeholder */}
                        <div className="inline-block mb-8">
                            <svg
                                className="w-64 h-20 text-ivory/30"
                                viewBox="0 0 200 60"
                            >
                                <path
                                    d="M10,45 Q30,10 60,40 T120,35 T180,45"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif italic text-ivory leading-relaxed">
                            "I built this for my daughter."
                        </h2>
                    </motion.div>

                    {/* Right - Message */}
                    <motion.div
                        className="lg:col-span-3 lg:pl-12 lg:border-l border-glass-border"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-xl text-ivory/70 leading-relaxed mb-6">
                            "When my daughter was diagnosed with lactose intolerance, the doctors
                            told us to stop milk. But in Ayurveda, milk is nectar. I realized the
                            problem wasn't milk—it was <em>what</em> we call milk today."
                        </p>
                        <p className="text-xl text-ivory/70 leading-relaxed mb-8">
                            "I traveled to the heart of Gujarat, met with Veda-practicing farmers,
                            and found the answer: The Desi Gir Cow. Today, Amrit Milk is not a
                            business. It's my legacy to her, and to you."
                        </p>
                        <p className="text-gold font-bold uppercase tracking-[0.2em]">
                            — The Amrit Milk Team
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
