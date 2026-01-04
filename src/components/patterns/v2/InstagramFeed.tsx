"use client";

import { Section } from "@/components/ui/section";
import { Instagram, ExternalLink } from "lucide-react";

export function InstagramFeed() {
    return (
        <Section className="bg-gradient-to-b from-white to-creme dark:from-midnight-light to-midnight py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-terracotta/10 text-terracotta dark:bg-gold/10 dark:text-gold rounded-full text-xs font-bold uppercase tracking-widest border border-terracotta/20 dark:border-gold/20 mb-6">
                        <Instagram className="w-3 h-3 inline mr-2" />
                        Follow Our Journey
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        Life at Amrit Farm
                    </h2>
                    <p className="text-lg text-espresso/70 dark:text-ivory/70 max-w-2xl mx-auto mb-8">
                        See behind the scenes - our cows, our team, the daily rituals that bring pure food to your table.
                    </p>
                    <Button
                        href="https://www.instagram.com/amritmilk"
                        target="_blank"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                    >
                        <Instagram className="w-5 h-5 mr-2" />
                        Follow @amritmilk on Instagram
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                {/* Instagram embed placeholder */}
                <div className="bg-white dark:bg-midnight-mid rounded-2xl border border-espresso/10 dark:border-white/10 p-8 shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                                key={i}
                                className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                            >
                                <Instagram className="w-8 h-8 text-pink-500 dark:text-pink-400 opacity-40" />
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-espresso/50 dark:text-ivory/50 mt-6">
                        Live Instagram feed - Click to visit our Instagram page
                    </p>
                </div>
            </div>
        </Section>
    );
}
