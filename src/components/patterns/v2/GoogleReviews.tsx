"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, MapPin, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

import { GoogleReview, googleReviews as staticGoogleReviews } from "@/data/reviews";

interface GoogleReviewsProps {
    reviews: GoogleReview[];
}

export function GoogleReviews({ reviews }: GoogleReviewsProps) {
    // If no reviews are provided, use static ones as a safety fallback
    const displayReviews = reviews && reviews.length > 0 ? reviews : staticGoogleReviews;

    return (
        <Section className="bg-[#FDFBF7] dark:bg-midnight-light py-24 border-t border-espresso/5 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20 mb-6"
                    >
                        <MapPin className="w-3 h-3 inline mr-2" />
                        Community Love
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-espresso dark:text-ivory mb-8"
                    >
                        Words from our Family
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center justify-center gap-4 mb-12"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-4xl font-bold text-espresso dark:text-white">
                                4.9
                            </span>
                            <div className="flex gap-1 text-yellow-500">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-6 h-6 fill-current" />
                                ))}
                            </div>
                        </div>
                        <span className="text-espresso/60 dark:text-ivory/60 font-medium">
                            Based on 150+ verified Google Reviews
                        </span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {displayReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white dark:bg-midnight-mid p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-espresso/5 dark:border-white/5 flex flex-col h-full relative"
                        >
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Quote className="w-16 h-16 text-espresso dark:text-ivory" />
                            </div>

                            <div className="flex items-center gap-1 text-yellow-500 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200 dark:text-gray-700'}`} 
                                    />
                                ))}
                            </div>

                            <div className="flex-grow">
                                <p className="text-espresso/90 dark:text-ivory/90 text-lg leading-relaxed mb-8 italic font-serif">
                                    &quot;{review.text}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50 dark:border-gray-800">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg border border-blue-100 dark:border-blue-800">
                                        {review.authorName.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-midnight-mid rounded-full flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-espresso dark:text-white text-base">
                                        {review.authorName}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-espresso/40 dark:text-ivory/40 text-sm">
                                            {review.date}
                                        </p>
                                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                        <span className="text-blue-500 dark:text-blue-400 text-xs font-semibold">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <a
                        href="https://www.google.com/search?q=Amrit+Milk+Organic+Reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-espresso dark:bg-ivory text-white dark:text-espresso rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-lg transform hover:-translate-y-1"
                    >
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        Write a Review on Google
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </Section>
    );
}
