"use client";

import { motion } from "framer-motion";
import { Sprout, Sun, Leaf, ShieldCheck, TreePine, Heart } from "lucide-react";
import Image from "next/image";

export function DhartiGauMataSection() {
    return (
        <section className="py-24 md:py-32 bg-gradient-to-b from-terracotta/10 via-creme to-gold/10 dark:from-midnight dark:via-midnight-mid dark:to-midnight transition-colors duration-500 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 blur-[150px] rounded-full -mr-48 -mt-24" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 blur-[150px] rounded-full -ml-48 -mb-24" />

            <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-14"
                >
                    <span className="inline-block px-5 py-2 bg-terracotta/10 dark:bg-gold/10 border border-terracotta/30 dark:border-gold/30 rounded-full text-terracotta dark:text-gold font-bold text-sm md:text-base tracking-widest uppercase mb-6">
                        हमारा संकल्प
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-espresso dark:text-ivory mb-6 leading-snug md:leading-relaxed lg:leading-relaxed">
                        धरती माता। गौ माता।
                        <br />
                        <span className="text-terracotta dark:text-gold">यही हमारी नींव है।</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-10"
                >
                    {/* The Main Quote */}
                    <blockquote className="relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl text-terracotta/20 dark:text-gold/20 font-serif leading-none">
                            &ldquo;
                        </div>
                        <p className="text-xl md:text-2xl lg:text-3xl font-serif italic text-espresso/90 dark:text-ivory/90 leading-relaxed max-w-4xl mx-auto pt-8">
                            धरती माँ की सेवा और गौ माता का संरक्षण ही हमारा असली उद्देश्य है।
                            <br />
                            जब धरती खुश होगी और गाय स्वस्थ रहेगी, तभी तो शुद्ध अमृत जैसा दूध मिलेगा।
                        </p>
                    </blockquote>

                    {/* Two Pillars */}
                    <div className="grid md:grid-cols-2 gap-8 mt-14">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/60 dark:bg-midnight/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-terracotta/20 dark:border-gold/20 text-left hover:shadow-xl transition-shadow duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src="/assets/img/dharti_mata.png?v=2"
                                    alt="Dharti Mata"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-terracotta dark:text-gold mb-4">
                                धरती माता
                            </h3>
                            <p className="text-base text-espresso/80 dark:text-ivory/80 leading-relaxed">
                                जैविक खेती, रासायनिक मुक्त ज़मीन, और पारंपरिक तरीकों से उगाए गए
                                अनाज। हम धरती को नहीं लूटते —{" "}
                                <strong className="text-espresso dark:text-ivory">
                                    हम उसकी सेवा करते हैं
                                </strong>{" "}
                                ताकि वो हमें संभाल सके।
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-espresso/70 dark:text-ivory/70">
                                <li className="flex items-center gap-2">
                                    <Leaf className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                                    100% जैविक खेती — कोई कीटनाशक नहीं
                                </li>
                                <li className="flex items-center gap-2">
                                    <Sun className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                                    पारंपरिक बीज संरक्षण
                                </li>
                                <li className="flex items-center gap-2">
                                    <TreePine className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                                    मिट्टी की उर्वरता बढ़ाने वाली गोबर खाद
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/60 dark:bg-midnight/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-terracotta/20 dark:border-gold/20 text-left hover:shadow-xl transition-shadow duration-500 group"
                        >
                            {/* Desi Gir Cow image */}
                            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                                <Image
                                    src="/assets/img/gau_mata.png?v=2"
                                    alt="Desi Gir Cow"
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-terracotta dark:text-gold mb-4">
                                गौ माता
                            </h3>
                            <p className="text-base text-espresso/80 dark:text-ivory/80 leading-relaxed">
                                देसी गिर गायों का प्राकृतिक चारा, खुली चराई, और प्यार भरी देखभाल।
                                <strong className="text-espresso dark:text-ivory">
                                    {" "}
                                    गाय की खुशी में ही A2 दूध की पवित्रता है।
                                </strong>
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-espresso/70 dark:text-ivory/70">
                                <li className="flex items-center gap-2">
                                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                    कोई ऑक्सीटोसिन नहीं — प्राकृतिक दुहाई
                                </li>
                                <li className="flex items-center gap-2">
                                    <Heart className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                    खुले चारागाह में स्वतंत्र विचरण
                                </li>
                                <li className="flex items-center gap-2">
                                    <Sun className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                    वैदिक गोशाला परंपरा
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Bottom Line */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-10 text-base md:text-lg text-espresso/70 dark:text-ivory/70"
                    >
                        हम सिर्फ दूध नहीं बेचते — हम धरती और गाय के प्रति अपनी जिम्मेदारी निभाते
                        हैं।
                        <br />
                        <span className="font-bold text-terracotta dark:text-gold text-lg md:text-xl">
                            यही है अमृत की असली ताकत।
                        </span>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
