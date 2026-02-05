"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, MapPin, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

import { GoogleReview, googleReviews as staticGoogleReviews } from "@/data/reviews";

interface GoogleReviewsProps {
    reviews: GoogleReview[];
}

export function GoogleReviews({ reviews }: GoogleReviewsProps) {
    // Combine dynamic reviews with static ones to ensure we always have a rich set
    // This avoids showing only 1 review if Sanity only returns 1
    const displayReviews = [
        ...(reviews || []),
        ...staticGoogleReviews.filter(sr => !(reviews || []).some(r => r.id === sr.id))
    ].slice(0, 6);

    return (
        <Section className="bg-[#FDFBF7] dark:bg-midnight py-32 border-t border-espresso/5 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20 mb-8"
                    >
                        <Star className="w-3 h-3 fill-current" />
                        5.0 Rating on Google
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory mb-6"
                    >
                        Trusted by 20,000+ <br className="hidden md:block" /> Happy Families
                    </motion.h2>
                    <p className="text-lg text-espresso/60 dark:text-ivory/60 max-w-2xl mx-auto">
                        We take pride in our purity. Here is what our community in Lucknow and across India has to say about Amrit Milk.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {displayReviews.map((review, index) => (
                        <motion.div
                            key={review.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white dark:bg-midnight-light p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-espresso/5 dark:border-white/5 flex flex-col h-full relative"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} 
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-neutral-100">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <p className="text-espresso dark:text-ivory/90 text-xl leading-relaxed mb-10 font-serif italic">
                                    &quot;{review.text}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-auto pt-8 border-t border-espresso/5 dark:border-white/5">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    {review.authorName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-espresso dark:text-white text-lg">
                                        {review.authorName}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-espresso/40 dark:text-ivory/40 text-sm">
                                            {review.date || "Verified Customer"}
                                        </p>
                                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                                        <span className="text-blue-500 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Verified Review</span>
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
