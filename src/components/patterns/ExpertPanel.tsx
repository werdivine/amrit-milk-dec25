"use client";

import { motion } from "framer-motion";

const experts = [
    {
        name: "Dr. Amit Verma",
        title: "Gastroenterologist",
        quote: "The A2 protein structure in Amrit Milk is significantly easier on the human gut compared to commercial A1 milk. I recommend it for patients with mild lactose sensitivity.",
        initials: "AV"
    },
    {
        name: "Suman Rao",
        title: "Lead Nutritionist",
        quote: "The micronutrient profile of raw, chilled Gir milk is superior. The presence of Beta-carotene and Omega-3 is noticeably higher due to their hydroponic fodder diet.",
        initials: "SR"
    },
    {
        name: "Dr. Priya Sharma",
        title: "Pediatric Specialist",
        quote: "For growing children, A2 milk provides essential nutrients without the digestive discomfort often associated with regular dairy. It's what I recommend to parents.",
        initials: "PS"
    }
];

export function ExpertPanel() {
    return (
        <section className="py-32 bg-midnight-mid relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                        Verified Intelligence
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-ivory">
                        Expert Endorsements
                    </h2>
                </motion.div>

                {/* Experts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {experts.map((expert, index) => (
                        <motion.div
                            key={expert.name}
                            className="text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            {/* Avatar */}
                            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-midnight text-3xl font-bold shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                {expert.initials}
                            </div>

                            {/* Name & Title */}
                            <h4 className="text-xl font-bold text-gold mb-2">
                                {expert.name}
                            </h4>
                            <p className="text-ivory/50 text-sm mb-6">
                                {expert.title}
                            </p>

                            {/* Quote */}
                            <p className="text-ivory/80 italic leading-relaxed">
                                "{expert.quote}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
