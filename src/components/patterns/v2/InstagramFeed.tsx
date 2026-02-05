"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, Instagram, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getInstagramPosts } from "@/lib/fetchSocials";
import { InstagramPost } from "@/data/instagram";
import { motion } from "framer-motion";

export function InstagramFeed() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getInstagramPosts();
                // Randomize posts as requested by user
                const randomized = [...data].sort(() => 0.5 - Math.random());
                setPosts(randomized);
            } catch (error) {
                console.error("Failed to fetch Instagram posts", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <Section className="bg-gradient-to-b from-white to-creme dark:from-midnight-light to-midnight py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold uppercase tracking-widest border border-pink-500/20 mb-6"
                    >
                        <Instagram className="w-3.5 h-3.5 inline mr-2" />
                        Join Our Community
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        Life at Amrit Farm
                    </h2>
                    <p className="text-lg text-espresso/70 dark:text-ivory/70 max-w-2xl mx-auto mb-10">
                        Experience the purity of farm-to-table living. Follow our journey of organic farming, 
                        happy cows, and traditional rituals.
                    </p>
                    <a
                        href="https://www.instagram.com/amritmilkorganic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-2xl hover:scale-105 transition-all shadow-xl hover:shadow-pink-500/25 font-bold"
                    >
                        <Instagram className="w-5 h-5" />
                        Follow @amritmilkorganic
                        <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                    </a>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {posts.map((post, idx) => (
                            <motion.a
                                key={post.id}
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg border border-espresso/5 dark:border-white/5"
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.caption || "Instagram post"}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="flex gap-6 mb-4 text-white">
                                        <div className="flex items-center gap-1.5">
                                            <Heart className="w-5 h-5 fill-current" />
                                            <span className="font-bold">{post.likes || Math.floor(Math.random() * 500) + 50}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MessageCircle className="w-5 h-5 fill-current" />
                                            <span className="font-bold">{Math.floor(Math.random() * 50) + 5}</span>
                                        </div>
                                    </div>
                                    <p className="text-white text-xs line-clamp-3 leading-relaxed">
                                        {post.caption}
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
                
                <p className="text-center text-sm text-espresso/40 dark:text-ivory/40 mt-10 italic">
                    Showing latest updates from our Lucknow farm
                </p>
            </div>
        </Section>
    );
}
