"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Newsletter() {
    return (
        <Section className="bg-espresso dark:bg-midnight-mid transition-colors duration-500">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <span className="text-creme/60 dark:text-gold/60 font-medium uppercase tracking-[0.3em] text-sm block">Join the Elite</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-creme dark:text-ivory">The Sovereign <span className="text-terracotta dark:text-gold">Circle.</span></h2>
                    <p className="text-creme/70 dark:text-ivory/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Become part of Lucknow's most discerning community. Get early access to seasonal harvests, Vedic wisdom, and farm-to-table events.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 dark:bg-white/5 rounded-full border border-white/10 max-w-2xl mx-auto backdrop-blur-md"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="email"
                        placeholder="Enter your royal email..."
                        className="flex-grow bg-transparent px-8 py-4 outline-none text-creme dark:text-ivory placeholder:text-creme/30 dark:placeholder:text-ivory/30 md:text-lg"
                        required
                    />
                    <Button type="submit" className="bg-creme text-espresso hover:bg-white dark:bg-gold dark:text-midnight dark:hover:bg-white rounded-full px-10 whitespace-nowrap">
                        Apply for Entry
                    </Button>
                </motion.form>

                <p className="text-creme/40 dark:text-ivory/40 text-xs uppercase tracking-widest">
                    No spam. Just pure gold content and exclusive farm updates.
                </p>
            </div>
        </Section>
    );
}
