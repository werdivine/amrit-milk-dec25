"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisonData = [
    {
        feature: "Source",
        commercial: "Mixed breeds, fed hormones/antibiotics",
        sovereign: "Pure Gir Cows, free-grazing on herbs",
    },
    {
        feature: "Processing",
        commercial: "UHT (Ultra High Temp) - Kills enzymes",
        sovereign: "Raw & Chilled - Enzymes intact",
    },
    {
        feature: "Packaging",
        commercial: "Plastic Pouches (Microplastics)",
        sovereign: "Sterilized Glass Bottles (Pure)",
    },
    {
        feature: "Protein Type",
        commercial: "A1 (Often causes bloating/inflammation)",
        sovereign: "A2 (Easy to digest, non-inflammatory)",
    },
    {
        feature: "Cream (Malai)",
        commercial: "Thin, watery layer",
        sovereign: "Thick, golden, aromatic layer",
    },
];

export function ComparisonTable() {
    return (
        <div className="overflow-hidden rounded-3xl border border-espresso/10 dark:border-white/10 shadow-xl bg-white dark:bg-white/5">
            <div className="grid grid-cols-3 bg-espresso/5 dark:bg-white/5 p-6 md:p-8 text-center border-b border-espresso/10 dark:border-white/10">
                <div className="font-serif font-bold text-lg md:text-xl text-espresso/50 dark:text-ivory/50 self-end pb-2">
                    Attribute
                </div>
                <div className="font-serif font-bold text-xl md:text-2xl text-terracotta tracking-tight">
                    Commercial <br /><span className="text-sm font-sans font-normal opacity-70 uppercase tracking-widest">Milk</span>
                </div>
                <div className="font-serif font-bold text-xl md:text-2xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                    Amrit <br /><span className="text-sm font-sans font-normal opacity-70 uppercase tracking-widest">Sovereign</span>
                </div>
            </div>

            {comparisonData.map((row, i) => (
                <motion.div
                    key={row.feature}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`grid grid-cols-3 p-6 md:p-8 items-center text-center hover:bg-espresso/5 dark:hover:bg-white/5 transition-colors border-b border-espresso/5 dark:border-white/5 last:border-0`}
                >
                    <div className="font-serif font-bold text-espresso dark:text-ivory text-sm md:text-lg text-left md:text-center pl-2 md:pl-0">
                        {row.feature}
                    </div>

                    <div className="text-sm md:text-base text-espresso/70 dark:text-ivory/70 relative">
                        <div className="md:hidden absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10">
                            <X className="w-12 h-12 text-terracotta" />
                        </div>
                        {row.commercial}
                    </div>

                    <div className="text-sm md:text-lg font-medium text-emerald-700 dark:text-emerald-300 relative">
                        <div className="md:hidden absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10">
                            <Check className="w-12 h-12 text-emerald-500" />
                        </div>
                        {row.sovereign}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
