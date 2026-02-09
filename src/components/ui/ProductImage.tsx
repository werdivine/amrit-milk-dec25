"use client";

import { motion } from "framer-motion";
import { CircleDot, Droplet, Flame, Leaf, Milk as MilkIcon, Sparkles } from "lucide-react";
import Image from "next/image";

interface ProductImageProps {
    src: string;
    alt: string;
    category?: string;
    className?: string;
    id?: string;
}

const productThemeMap: Record<string, { gradient: string; icon: any; glow: string }> = {
    Dairy: {
        gradient: "from-ivory via-creme to-ivory/50",
        icon: MilkIcon,
        glow: "rgba(255, 255, 255, 0.4)",
    },
    Curd: {
        gradient: "from-white via-creme to-white",
        icon: CircleDot,
        glow: "rgba(255, 255, 255, 0.6)",
    },
    Oils: {
        gradient: "from-amber-200 via-amber-400 to-amber-600",
        icon: Droplet,
        glow: "rgba(212, 175, 55, 0.4)",
    },
    "Mustard Oil": {
        gradient: "from-amber-400 via-amber-600 to-amber-800",
        icon: Flame,
        glow: "rgba(212, 175, 55, 0.5)",
    },
    "Coconut Oil": {
        gradient: "from-white via-blue-50 to-white",
        icon: Sparkles,
        glow: "rgba(255, 255, 255, 0.5)",
    },
    Other: {
        gradient: "from-terracotta/20 via-terracotta/40 to-terracotta/60",
        icon: Leaf,
        glow: "rgba(199, 91, 57, 0.3)",
    },
};

export function ProductImage({ src, alt, category, className, id }: ProductImageProps) {
    // Ensure src is never null/undefined
    const safeSrc = src || "";

    // Determine the visual theme based on ID or category
    let theme = productThemeMap["Other"];

    if (id?.includes("curd")) theme = productThemeMap["Curd"];
    else if (id?.includes("oil-mustard")) theme = productThemeMap["Mustard Oil"];
    else if (id?.includes("oil-coconut")) theme = productThemeMap["Coconut Oil"];
    else if (category === "Oils") theme = productThemeMap["Oils"];
    else if (category === "Dairy") theme = productThemeMap["Dairy"];

    const Icon = theme.icon;

    // Use actual image if it's not a known duplicate/placeholder
    const isPlaceholder =
        (safeSrc.includes("paneer.png") && id?.includes("curd")) ||
        (safeSrc.includes("oil-bottle.png") && !id?.includes("mustard")) ||
        (safeSrc.includes("sweets.png") &&
            (id?.includes("jaggery") || id?.includes("turmeric") || id?.includes("balm")));

    if (!isPlaceholder && src) {
        return (
            <div className={`relative group ${className}`}>
                <div
                    className="absolute inset-x-4 inset-y-10 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                    style={{ backgroundColor: theme.glow }}
                ></div>
                <Image
                    src={src}
                    alt={alt}
                    width={500}
                    height={500}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl scale-115 group-hover:scale-130 transition-transform duration-700"
                />
            </div>
        );
    }

    return (
        <div
            className={`relative group aspect-square flex items-center justify-center p-12 ${className}`}
        >
            {/* Background Sphere */}
            <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${theme.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-700`}
            ></div>

            {/* Glass Container Component */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full h-full rounded-3xl border border-white/20 dark:border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Internal Glow */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-10`}
                ></div>

                {/* Abstract Product Representation */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    <Icon className="w-24 h-24 text-terracotta/40 dark:text-gold/40" />
                    <div className="absolute inset-0 blur-xl opacity-50 bg-current"></div>
                </motion.div>

                {/* Lighting effects */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-terracotta/20 blur-3xl rounded-full"></div>

                <div className="absolute bottom-6 px-4 text-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-espresso/40 dark:text-ivory/40">
                        Sovereign Collection
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
