"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FarmTourCTA() {
    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-[url('/assets/img/farm-soul.png')] bg-cover bg-center bg-fixed"
                style={{ transform: 'scale(1.1)' }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center max-w-3xl px-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="glass p-12 rounded-3xl border border-glass-border backdrop-blur-xl">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-ivory mb-6">
                        The Living Sanctuary
                    </h2>
                    <p className="text-xl text-ivory/80 leading-relaxed mb-8">
                        Our cows aren't milk machines. They are members of the family.
                        They feed on hydroponic green fodder, listen to Vedic chants, and roam free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            href="https://wa.me/919876543210"
                            size="lg"
                            className="bg-gold text-midnight hover:bg-white"
                        >
                            Book Private Tour
                        </Button>
                        <Button
                            href="/the-farm"
                            variant="glass"
                            size="lg"
                        >
                            Virtual 360° Tour
                        </Button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
