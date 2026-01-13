"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, MapPin, Quote, Star } from "lucide-react";

import { GoogleReview } from "@/data/reviews";

interface GoogleReviewsProps {
    reviews: GoogleReview[];
}

export function GoogleReviews({ reviews }: GoogleReviewsProps) {
    return (
        <Section className="bg-creme dark:bg-midnight-light py-20 border-t border-espresso/5 dark:border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20 mb-6">
                        <MapPin className="w-3 h-3 inline mr-2" />
                        Community Love
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        Words from our Family
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-yellow-500 mb-6">
                        <span className="text-2xl font-bold text-espresso dark:text-white mr-2">
                            4.9
                        </span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-6 h-6 fill-current" />
                            ))}
                        </div>
                        <span className="text-espresso/60 dark:text-ivory/60 ml-2">
                            (150+ Reviews)
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-midnight-mid p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-espresso/5 dark:border-white/5 flex flex-col h-full"
                        >
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <div className="flex-grow">
                                <Quote className="w-8 h-8 text-terracotta/20 dark:text-gold/20 mb-3" />
                                <p className="text-espresso/80 dark:text-ivory/80 text-sm leading-relaxed mb-6">
                                    &quot;{review.text}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mt-auto border-t border-gray-100 dark:border-gray-800 pt-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm">
                                    {review.authorName.charAt(0)}
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-espresso dark:text-white">
                                        {review.authorName}
                                    </p>
                                    <p className="text-espresso/40 dark:text-ivory/40">
                                        {review.date}
                                    </p>
                                </div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/assets/icons/google-g.svg"
                                    alt="Google"
                                    className="w-5 h-5 ml-auto opacity-50"
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://g.page/r/YOUR_GMB_LINK_HERE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-transparent border-2 border-espresso/10 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-400 text-espresso dark:text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                        <MapPin className="w-5 h-5 text-blue-500" />
                        See all reviews on Google
                        <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                </div>
            </div>
        </Section>
    );
}
