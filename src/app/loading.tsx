"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-creme dark:bg-midnight transition-colors duration-500">
            <div className="relative">
                {/* Decorative outer ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-terracotta/10 dark:border-gold/10 border-t-terracotta dark:border-t-gold"
                />

                {/* Inner pulsing logo circle */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-12 h-12 bg-terracotta dark:bg-gold rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-8 h-8 border-2 border-white dark:border-midnight rounded-full" />
                    </div>
                </motion.div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-espresso/40 dark:text-ivory/40 font-bold uppercase tracking-[0.3em] text-xs"
            >
                Fetching Nature&apos;s Purest
            </motion.p>
        </div>
    );
}
