"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, Instagram } from "lucide-react";

import { InstagramPost } from "@/data/instagram";

interface InstagramFeedProps {
    posts: InstagramPost[];
}

export function InstagramFeed({ posts }: InstagramFeedProps) {
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

                {/* Instagram curated feed */}
                <div className="bg-white dark:bg-midnight-mid rounded-2xl border border-espresso/10 dark:border-white/10 p-8 shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {posts.map((post) => (
                            <a
                                key={post.id}
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                            >
                                {/* We use basic img tag here since we might map external URLs later, or use Next Image if local */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.imageUrl}
                                    alt={post.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                    <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-xs font-medium truncate">
                                        {post.caption}
                                    </p>
                                </div>
                            </a>
                        ))}
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
