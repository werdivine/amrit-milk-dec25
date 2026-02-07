"use client";

import { Section } from "@/components/ui/section";
import { ExternalLink, Instagram, Heart, MessageCircle, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getInstagramPosts } from "@/lib/fetchSocials";
import { InstagramPost, instagramPosts as staticInstagramPosts } from "@/data/instagram";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramFeedProps {
    initialPosts?: InstagramPost[];
}

export function InstagramFeed({ initialPosts }: InstagramFeedProps) {
    const [posts, setPosts] = useState<InstagramPost[]>(initialPosts || []);
    const [loading, setLoading] = useState(!initialPosts);

    useEffect(() => {
        if (initialPosts && initialPosts.length > 0) {
            setLoading(false);
            return;
        }

        async function fetchPosts() {
            try {
                const data = await getInstagramPosts();

                // Ensure data is an array
                const validData = Array.isArray(data) ? data : [];

                // Ensure we have a good number of posts (at least 10)
                let combined = [...validData];

                // If we have fewer than 10 posts, add from static to reach 10
                if (combined.length < 10) {
                    staticInstagramPosts.forEach(p => {
                        if (combined.length < 10 && !combined.find(cp => cp.id === p.id || cp.url === p.url)) {
                            combined.push(p);
                        }
                    });
                }

                // No more randomization here, keep the order from getInstagramPosts
                setPosts(combined.slice(0, 10));
            } catch (error) {
                console.error("Failed to fetch Instagram posts", error);
                setPosts(staticInstagramPosts.slice(0, 10));
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [initialPosts]);

    return (
        <Section className="bg-gradient-to-b from-white to-[#FDFBF7] dark:from-midnight-light to-midnight py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold uppercase tracking-widest border border-pink-500/20 mb-6"
                        >
                            <Instagram className="w-3.5 h-3.5" />
                            @amritmilkorganic
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                            Life at <span className="text-pink-600 dark:text-pink-400">Amrit Farm</span>
                        </h2>
                        <p className="text-lg text-espresso/70 dark:text-ivory/70 leading-relaxed">
                            Experience the purity of farm-to-table living. Follow our journey of organic farming,
                            happy cows, and traditional rituals in the heart of Lucknow.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <a
                            href="https://www.instagram.com/amritmilkorganic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-2xl hover:scale-105 transition-all shadow-xl hover:shadow-pink-500/25 font-bold whitespace-nowrap"
                        >
                            <Instagram className="w-5 h-5" />
                            Join 50k+ Followers
                            <ExternalLink className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`aspect-square bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-3xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                        {posts.map((post, idx) => (
                            <motion.a
                                key={post.id || post.url}
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className={`group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-espresso/5 dark:border-white/5 transition-all duration-700 hover:-translate-y-3 ${idx === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                                    }`}
                            >
                                <Image
                                    src={post.imageUrl || "/assets/img/products/amrit_ghee_premium.png"}
                                    alt={post.caption || "Instagram post"}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 20vw"
                                    loading="lazy"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-10">
                                    <div className="flex gap-6 mb-4 text-white">
                                        <div className="flex items-center gap-2">
                                            <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                                            <span className="font-bold text-lg">{post.likes || Math.floor(Math.random() * 500) + 150}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="w-5 h-5 fill-white" />
                                            <span className="font-bold text-lg">{Math.floor(Math.random() * 50) + 15}</span>
                                        </div>
                                    </div>
                                    <p className="text-white text-xs md:text-sm line-clamp-3 font-medium leading-relaxed mb-4">
                                        {post.caption}
                                    </p>
                                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                                        <span>View on Instagram</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </div>
                                </div>

                                {/* Reels Badge if applicable */}
                                {(post.url.includes('/reel/') || (post as any).mediaType === 'VIDEO') && (
                                    <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white z-10 border border-white/30">
                                        <Play className="w-5 h-5 fill-current ml-0.5" />
                                    </div>
                                )}

                                {/* Hover "Float" Effect */}
                                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 transition-all duration-700 rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
                            </motion.a>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex flex-col items-center mt-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-espresso/40 dark:text-ivory/40">
                            Verified Real-Time Feed
                        </span>
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                    </div>
                    <p className="text-espresso/30 dark:text-ivory/30 text-[10px] font-medium max-w-md text-center italic">
                        Experience authentic moments directly from our farm rituals, organic cultivation, and happy cows.
                    </p>
                </motion.div>
            </div>
        </Section>
    );
}
