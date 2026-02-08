"use client";

import { Section } from "@/components/ui/section";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface InstagramPost {
    id: string;
    url: string;
    imageUrl: string;
    caption?: string;
}

interface InstagramCarouselProps {
    posts: InstagramPost[];
}

export function InstagramCarousel({ posts }: InstagramCarouselProps) {
    const allPosts = posts || [];

    // Split posts into two rows for the marquee
    const firstRow = allPosts.slice(0, Math.ceil(allPosts.length / 2));
    const secondRow = allPosts.slice(Math.ceil(allPosts.length / 2));

    const PostCard = ({ post }: { post: InstagramPost }) => (
        <motion.a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative w-[280px] md:w-[350px] aspect-square shrink-0 mx-4 overflow-hidden rounded-[2.5rem] shadow-xl border border-espresso/5 dark:border-white/5 bg-neutral-100 dark:bg-neutral-900"
        >
            <Image
                src={post.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"}
                alt={post.caption || "Instagram Post"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 280px, 350px"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center text-white">
                    <Heart className="w-8 h-8 fill-current mb-2" />
                    <span className="text-xs font-bold font-sans">Like</span>
                </div>
                <div className="flex flex-col items-center text-white">
                    <MessageCircle className="w-8 h-8 fill-current mb-2" />
                    <span className="text-xs font-bold font-sans">View</span>
                </div>
            </div>

            {/* Platform Badge */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                <Instagram className="w-5 h-5" />
            </div>
        </motion.a>
    );

    if (!allPosts || allPosts.length === 0) return null;

    return (
        <Section className="bg-white dark:bg-midnight-light py-32 overflow-hidden border-t border-espresso/5 dark:border-white/5">
            <div className="container mx-auto px-4 mb-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-pink-500/20 mb-8"
                        >
                            <Instagram className="w-3.5 h-3.5" />
                            @amritmilkorganic
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-7xl font-serif font-bold text-espresso dark:text-ivory mb-8"
                        >
                            Life at <span className="text-pink-600 dark:text-pink-400">The Farm</span>
                        </motion.h2>
                        <p className="text-xl text-espresso/60 dark:text-ivory/60 leading-relaxed">
                            Experience the purity of farm-to-table living through our lens.
                            Daily rituals, happy herds, and the journey of your milk.
                        </p>
                    </div>
                    <div>
                        <motion.a
                            href="https://www.instagram.com/amritmilkorganic"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-2xl font-black shadow-xl shadow-pink-500/20"
                        >
                            <Instagram className="w-6 h-6" />
                            Join 50k+ Followers
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-12">
                <div className="flex overflow-hidden relative">
                    <motion.div
                        className="flex py-10"
                        animate={{
                            x: [0, -1000],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...firstRow, ...firstRow, ...firstRow].map((post, i) => (
                            <PostCard key={`${post.id}-${i}`} post={post} />
                        ))}
                    </motion.div>
                </div>

                <div className="flex overflow-hidden relative">
                    <motion.div
                        className="flex py-10"
                        animate={{
                            x: [-1000, 0],
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...secondRow, ...secondRow, ...secondRow].map((post, i) => (
                            <PostCard key={`${post.id}-${i}`} post={post} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-20">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-espresso/40 dark:text-ivory/40">
                            Custom Built Feed
                        </span>
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
