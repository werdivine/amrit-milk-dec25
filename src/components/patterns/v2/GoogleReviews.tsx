"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, MapPin, Quote, Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

import { GoogleReview, googleReviews as staticGoogleReviews } from "@/data/reviews";

interface GoogleReviewsProps {
    reviews: GoogleReview[];
}

// Fisher-Yates shuffle algorithm removed to prevent hydration mismatch

export function GoogleReviews({ reviews }: GoogleReviewsProps) {
    // Use reviews directly from props to avoid hydration mismatch (shuffling must happen on server or inside useEffect)
    const allReviews = reviews || [];

    // Split reviews into two rows for the marquee
    const firstRow = allReviews.slice(0, Math.ceil(allReviews.length / 2));
    const secondRow = allReviews.slice(Math.ceil(allReviews.length / 2));

    const ReviewCard = ({ review, index }: { review: GoogleReview, index: number }) => (
        <motion.div
            whileHover={{ y: -10 }}
            className="w-[350px] md:w-[450px] shrink-0 bg-white dark:bg-midnight-light p-8 md:p-10 rounded-[3rem] shadow-2xl border border-espresso/5 dark:border-white/5 flex flex-col h-full mx-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-blue-500/30 group relative"
        >
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 md:w-6 md:h-6 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-lg border border-neutral-50 group-hover:scale-110 transition-transform duration-500">
                    <svg viewBox="0 0 24 24" className="w-7 h-7">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                </div>
            </div>

            <div className="flex-grow">
                <Quote className="w-12 h-12 text-blue-500/10 mb-6 group-hover:text-blue-500/20 transition-colors" />
                <p className="text-espresso dark:text-ivory/90 text-lg md:text-xl leading-relaxed mb-10 font-serif italic line-clamp-4">
                    &quot;{review?.text || ""}&quot;
                </p>
            </div>

            <div className="flex items-center gap-5 mt-auto pt-10 border-t border-espresso/5 dark:border-white/5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-xl transform -rotate-3 group-hover:rotate-0 transition-all duration-500">
                    {review?.authorName ? review.authorName.charAt(0) : "A"}
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-espresso dark:text-white text-xl">
                            {review?.authorName || "Anonymous"}
                        </p>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-espresso/40 dark:text-ivory/40 text-xs font-bold uppercase tracking-wider">
                            {review?.date || "Verified Customer"}
                        </p>
                        <div className="px-2 py-0.5 bg-green-500/10 rounded-full">
                            <span className="text-green-600 dark:text-green-400 text-[9px] font-black uppercase tracking-widest">Verified Purchase</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (!allReviews || allReviews.length === 0) return null;

    return (
        <Section className="bg-[#FDFBF7] dark:bg-midnight py-32 border-t border-espresso/5 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 mb-24">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20 mb-8"
                    >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        5.0 Excellence Rating
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-serif font-bold text-espresso dark:text-ivory mb-8"
                    >
                        Trusted by <span className="text-blue-600 dark:text-blue-400">20,000+</span> Families
                    </motion.h2>
                    <p className="text-xl text-espresso/60 dark:text-ivory/60 max-w-2xl mx-auto leading-relaxed">
                        Authentic experiences from real families who have made Amrit Milk a part of their daily rituals.
                    </p>
                </div>
            </div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-12">
                <div className="flex overflow-hidden relative">
                    <motion.div
                        className="flex py-10"
                        animate={{
                            x: [0, -1035],
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...firstRow, ...firstRow].map((review, i) => (
                            <ReviewCard key={`${review.id}-${i}`} review={review} index={i} />
                        ))}
                    </motion.div>
                </div>

                <div className="flex overflow-hidden relative">
                    <motion.div
                        className="flex py-10"
                        animate={{
                            x: [-1035, 0],
                        }}
                        transition={{
                            duration: 45,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...secondRow, ...secondRow].map((review, i) => (
                            <ReviewCard key={`${review.id}-${i}`} review={review} index={i} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex flex-col items-center mt-24"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px w-16 bg-blue-500/20" />
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500/40">
                        100% Real Reviews
                    </span>
                    <div className="h-px w-16 bg-blue-500/20" />
                </div>
                <a
                    href="https://share.google/0qteuIjm84bSxZWD7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-espresso/40 dark:text-ivory/40 text-xs font-medium hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                    View all reviews on Google Maps <ExternalLink className="w-3 h-3" />
                </a>
            </motion.div>
        </Section>
    );
}
