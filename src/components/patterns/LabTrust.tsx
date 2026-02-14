"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Beaker, Leaf, Heart } from "lucide-react";

const trustBadges = [
    {
        icon: ShieldCheck,
        label: "NABL Accredited",
        desc: "Lab Tested for 23+ Parameters",
        color: "text-blue-500 bg-blue-500/10",
    },
    {
        icon: Beaker,
        label: "Zero Hormones",
        desc: "No Oxytocin or Antibiotics",
        color: "text-rose-500 bg-rose-500/10",
    },
    {
        icon: Leaf,
        label: "100% Organic Fodder",
        desc: "Hydroponic Greens & Herbs",
        color: "text-emerald-500 bg-emerald-500/10",
    },
    {
        icon: Heart,
        label: "Cruelty Free",
        desc: "Calves fed first, always",
        color: "text-amber-500 bg-amber-500/10",
    },
];

export function LabTrust() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trustBadges.map((badge, i) => (
                <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-espresso/10 dark:border-white/10 hover:border-gold/30 hover:shadow-lg transition-all group"
                >
                    <div className={`p-4 rounded-full mb-4 ${badge.color} group-hover:scale-110 transition-transform duration-300`}>
                        <badge.icon className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif font-bold text-lg text-espresso dark:text-ivory mb-2">
                        {badge.label}
                    </h4>
                    <p className="text-sm text-espresso/60 dark:text-ivory/60">
                        {badge.desc}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
