"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const benefits = [
    { icon: "✨", title: "Suryaketu Nadi", description: "Solar energy absorption via cow's hump." },
    { icon: "🥛", title: "Lactose Friendly", description: "Naturally easier on the stomach." },
    { icon: "🛡️", title: "Immunity", description: "Rich in Gold-trace elements." }
];

export function GirWisdom() {
    return (
        <section className="py-32 bg-midnight relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            The Science of Life
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-ivory mb-6">
                            The Wisdom of{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-300">
                                A2 DNA.
                            </span>
                        </h2>
                        <p className="text-xl text-ivory/70 leading-relaxed mb-8">
                            Unlike industrial breeds (A1), the native Desi Gir Cow possesses a specific
                            amino acid chain that produces A2 Beta-casein. This is the same protein
                            found in human mother's milk.
                        </p>

                        {/* Benefits List */}
                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <motion.li
                                    key={benefit.title}
                                    className="flex items-start gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="text-2xl">{benefit.icon}</span>
                                    <div>
                                        <strong className="text-gold">{benefit.title}:</strong>
                                        <span className="text-ivory/70 ml-2">{benefit.description}</span>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-glass-border shadow-[0_0_60px_rgba(212,175,55,0.1)]">
                            <img
                                src="/assets/img/farm-soul.png"
                                alt="Gir Cow"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl border border-gold/30">
                            <p className="text-gold font-bold text-lg">Pure A2</p>
                            <p className="text-ivory/60 text-sm">Certified Gir Genetics</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
