"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "What makes A2 milk different from regular milk?",
        answer: "A2 milk comes from cows that only produce the A2 type of beta-casein protein. Regular milk contains both A1 and A2 proteins. Many people who experience digestive discomfort with regular milk find A2 milk easier to digest because it doesn't contain the A1 protein."
    },
    {
        question: "Why is Gir cow milk considered superior?",
        answer: "Gir cows are an indigenous Indian breed that naturally produce only A2 milk. They also have a unique hump (Suryaketu Nadi) that is believed to absorb beneficial solar energy. Their milk is richer in beta-carotene, giving it a natural golden color, and contains higher levels of omega fatty acids."
    },
    {
        question: "How is the milk delivered so quickly?",
        answer: "We milk our cows between 3:30-4:00 AM, immediately chill the milk to 4°C using solar-powered chillers, bottle it in sterilized glass by 5:30 AM, and dispatch using our electric delivery fleet. Your milk reaches you before 7:00 AM - within 4 hours of milking."
    },
    {
        question: "Why glass bottles instead of plastic pouches?",
        answer: "Glass is inert and doesn't leach chemicals into the milk. Plastic pouches, especially when exposed to heat, can release BPA and microplastics. Glass also preserves the taste and freshness better. Plus, our bottles are returnable and reusable, reducing environmental impact."
    },
    {
        question: "Is the milk pasteurized or raw?",
        answer: "Our milk is gently pasteurized at low temperatures (63°C for 30 minutes - the LTLT method) to ensure safety while preserving maximum nutrients and beneficial enzymes. This is different from UHT or high-heat pasteurization that destroys most nutrients."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-creme dark:bg-midnight relative overflow-hidden transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block transition-colors duration-300">
                        Got Questions?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory transition-colors duration-300">
                        Frequently Asked
                    </h2>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="glass rounded-2xl border border-espresso/5 dark:border-glass-border overflow-hidden bg-white/50 dark:bg-transparent transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-medium text-espresso dark:text-ivory pr-4 transition-colors duration-300">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-terracotta dark:text-gold flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="px-6 pb-5 text-ivory/70 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
