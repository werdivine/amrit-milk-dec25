"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Storyteller() {
    return (
        <section className="py-32 bg-gradient-to-b from-midnight via-midnight-mid to-midnight relative overflow-hidden">
            {/* Decorative Skew */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent transform -skew-y-3" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-bold uppercase tracking-wider mb-6">
                            The Founder's Rite
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-ivory leading-tight mb-6">
                            Built for My <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-gold">
                                Daughter.
                            </span>
                        </h2>
                        <p className="text-xl text-ivory/70 leading-relaxed mb-8">
                            "When traditional dairy failed her health, I stopped looking for a brand
                            and started looking for a breed. This is the legacy of the Gir Cow."
                        </p>
                        <Button href="/about" variant="glass" size="lg">
                            Read the Odyssey
                        </Button>
                    </motion.div>

                    {/* Right - Floating Card */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50, rotate: 0 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="glass p-8 rounded-3xl border border-gold/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <h4 className="text-2xl font-bold text-gold mb-4">
                                Zero Compromise Protocol
                            </h4>
                            <p className="text-ivory/70 text-lg leading-relaxed">
                                Every drop of Sovereign milk is tracked from the cow's heart to your
                                home's glass bottle. No middle-men. No dilution.
                            </p>
                            <div className="mt-6 pt-6 border-t border-glass-border">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                                        <span className="text-gold text-xl">🛡️</span>
                                    </div>
                                    <div>
                                        <p className="text-gold font-bold">100% Traceable</p>
                                        <p className="text-ivory/50 text-sm">From cow to cup</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
