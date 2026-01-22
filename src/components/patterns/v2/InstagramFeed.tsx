"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, Instagram } from "lucide-react";

// Using SociableKit widget instead of Sanity Instagram import
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
                        See behind the scenes - our cows, our team, the daily rituals that bring
                        pure food to your table.
                    </p>
                    <a
                        href="https://www.instagram.com/amritmilk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Instagram className="w-5 h-5" />
                        Follow @amritmilk on Instagram
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* SociableKit Instagram Widget */}
                <div className="bg-white dark:bg-midnight-mid rounded-2xl border border-espresso/10 dark:border-white/10 p-4 md:p-8 shadow-lg overflow-hidden">
                    <div className="w-full flex justify-center">
                        <iframe
                            src="https://widgets.sociablekit.com/instagram-hashtag-feed/iframe/25646019"
                            frameBorder="0"
                            width="100%"
                            height="600"
                            className="max-w-full rounded-lg"
                            title="Amrit Milk Instagram Feed"
                            loading="lazy"
                        />
                    </div>
                    <p className="text-center text-sm text-espresso/50 dark:text-ivory/50 mt-6">
                        Follow us{" "}
                        <span className="font-semibold text-terracotta dark:text-gold">
                            @amritmilk
                        </span>{" "}
                        for daily farm stories
                    </p>
                </div>
            </div>
        </Section>
    );
}
