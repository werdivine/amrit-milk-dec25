"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    featuredImage?: string;
    excerpt?: string;
    author?: string;
    publishedAt?: string;
    categories?: string[];
}

interface RecentArticlesProps {
    posts: BlogPost[];
}

export function RecentArticles({ posts }: RecentArticlesProps) {
    if (!posts || posts.length === 0) return null;

    const [featured, ...rest] = posts.slice(0, 3);

    return (
        <section className="py-32 bg-midnight relative overflow-hidden">
            {/* Ambient background effects */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/3 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <span className="inline-block px-6 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold font-bold tracking-[0.3em] text-xs uppercase mb-6">
                        The Sovereign Journal
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-ivory mb-6 leading-tight">
                        From{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-ivory to-gold">
                            the Farm
                        </span>
                        , to You
                    </h2>
                    <p className="text-xl text-ivory/50 max-w-2xl mx-auto font-light leading-relaxed">
                        Wisdom on A2 dairy, Ayurvedic living, and the science behind our farm —
                        written by our experts.
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Featured (large) Article */}
                    <div className="lg:col-span-7">
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group block bg-midnight-light/30 backdrop-blur-xl border border-white/5 rounded-[3rem] overflow-hidden hover:border-gold/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/5 h-full"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-midnight-mid relative">
                                {featured.featuredImage ? (
                                    <Image
                                        src={featured.featuredImage}
                                        alt={featured.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-midnight-mid to-midnight">
                                        <span className="text-gold/20 font-serif text-6xl">AM</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                                {featured.categories?.[0] && (
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-midnight/80 backdrop-blur-md border border-gold/20 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest">
                                        {featured.categories[0]}
                                    </div>
                                )}
                            </div>
                            <div className="p-10">
                                <div className="flex items-center gap-6 mb-5 text-ivory/35 text-xs font-medium uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-gold/40" />
                                        <span>
                                            {featured.publishedAt
                                                ? new Date(featured.publishedAt).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                          month: "short",
                                                          day: "numeric",
                                                          year: "numeric",
                                                      }
                                                  )
                                                : "Recent"}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-ivory mb-5 leading-tight group-hover:text-gold transition-colors line-clamp-2">
                                    {featured.title}
                                </h3>
                                {featured.excerpt && (
                                    <p className="text-ivory/55 leading-relaxed mb-8 line-clamp-3 font-light text-lg">
                                        {featured.excerpt}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                    Read Full Article
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Smaller Articles Stack */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {rest.map((post, idx) => (
                            <Link
                                key={post.id || post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex bg-midnight-light/30 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-gold/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 flex-1"
                            >
                                {/* Thumbnail */}
                                <div className="w-44 shrink-0 overflow-hidden bg-midnight-mid relative">
                                    {post.featuredImage ? (
                                        <Image
                                            src={post.featuredImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-midnight-mid to-midnight">
                                            <span className="text-gold/20 font-serif text-3xl">
                                                AM
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-7 flex flex-col justify-between flex-1">
                                    {post.categories?.[0] && (
                                        <span className="inline-block mb-3 text-[9px] font-bold text-gold uppercase tracking-widest">
                                            {post.categories[0]}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-serif font-bold text-ivory mb-3 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-ivory/30 text-xs uppercase tracking-widest">
                                        <Clock className="w-3 h-3 text-gold/30" />
                                        <span>5 min read</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* View All CTA */}
                <div className="text-center mt-16">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-ivory font-bold uppercase tracking-[0.2em] text-sm hover:border-gold/40 hover:text-gold hover:gap-5 transition-all duration-300"
                    >
                        View All Articles
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        </section>
    );
}
