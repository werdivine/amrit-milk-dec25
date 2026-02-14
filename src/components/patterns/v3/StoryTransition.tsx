"use client";

import { motion } from "framer-motion";

interface StoryTransitionProps {
    text: string;
    theme?: "light" | "dark" | "gradient" | "dramatic";
    size?: "normal" | "large";
}

/**
 * Narrative transition between homepage sections.
 * Bridges the story arc with elegant, scroll-animated text.
 */
export function StoryTransition({ text, theme = "light", size = "normal" }: StoryTransitionProps) {
    // The first transition (dramatic) needs to be bold and arresting
    if (theme === "dramatic") {
        return (
            <div className="bg-gradient-to-b from-creme via-creme-light to-creme-light dark:from-midnight dark:via-[#0a0a0a]/90 dark:to-[#0a0a0a] py-20 md:py-28 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "3rem" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-px bg-terracotta/60 dark:bg-red-500/60"
                    />
                    <p className="text-2xl md:text-4xl font-serif italic text-espresso/90 dark:text-white/90 text-center px-6 max-w-3xl leading-relaxed">
                        {text}
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "3rem" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-px bg-terracotta/60 dark:bg-red-500/60"
                    />
                </motion.div>
            </div>
        );
    }

    const bgClass =
        theme === "dark"
            ? "bg-espresso dark:bg-midnight"
            : theme === "gradient"
                ? "bg-gradient-to-b from-creme to-white dark:from-midnight dark:to-midnight-mid"
                : "bg-creme dark:bg-midnight";

    const textClass =
        theme === "dark"
            ? "text-ivory/60"
            : "text-espresso/50 dark:text-ivory/40";

    const lineClass =
        theme === "dark"
            ? "bg-gold/30"
            : "bg-terracotta/20 dark:bg-gold/20";

    const textSize = size === "large"
        ? "text-xl md:text-3xl"
        : "text-lg md:text-xl";

    return (
        <div className={`${bgClass} py-12 md:py-16 overflow-hidden transition-colors duration-500`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-4"
            >
                <div className={`w-px h-8 ${lineClass}`} />
                <p className={`${textSize} font-serif italic ${textClass} text-center px-6 max-w-2xl leading-relaxed`}>
                    {text}
                </p>
                <div className={`w-px h-8 ${lineClass}`} />
            </motion.div>
        </div>
    );
}
