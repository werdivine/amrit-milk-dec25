import { Section } from "@/components/ui/section";
import {
    getBlogCategories as getWPCategories,
    getBlogPosts as getWPPosts,
} from "@/lib/wordpressBlog";
import { getSanityBlogCategories, getSanityBlogPosts } from "@/lib/fetchBlog";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Sovereign Blog | Amrit Milk — A2 Dairy, Ayurveda & Farm Wisdom",
    description:
        "Explore Amrit Milk's blog for expert articles on A2 Gir Cow Milk, Bilona Ghee, Ayurvedic living, farm-to-table transparency, and organic dairy science.",
    alternates: {
        canonical: "https://amritmilkorganic.com/blog",
    },
    openGraph: {
        title: "The Sovereign Blog | Amrit Milk",
        description:
            "Insights on A2 dairy, Bilona Ghee, Ayurveda, farm life, and organic nutrition from Amrit Milk's experts.",
        type: "website",
        siteName: "Amrit Milk Organic",
        locale: "en_IN",
        images: [
            {
                url: "https://amritmilkorganic.com/assets/img/products/amrit_ghee_premium.png",
                width: 1200,
                height: 630,
                alt: "Amrit Milk Sovereign Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "The Sovereign Blog | Amrit Milk",
        description: "Expert insights on A2 dairy, Bilona Ghee, and Ayurvedic living.",
        images: ["https://amritmilkorganic.com/assets/img/products/amrit_ghee_premium.png"],
    },
};

// Blog list JSON-LD
const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "The Sovereign Journal — Amrit Milk",
    "description": "Articles about A2 dairy, Bilona Ghee, Ayurveda, and farm-fresh nutrition.",
    "url": "https://amritmilkorganic.com/blog",
    "publisher": {
        "@type": "Organization",
        "name": "Amrit Milk Organic",
        "url": "https://amritmilkorganic.com",
    },
};

export default async function BlogPage({
    searchParams,
}: {
    searchParams?: { category?: string };
}) {
    const activeCategory = searchParams?.category || "";

    const sanityData = await getSanityBlogPosts({
        perPage: 24,
        category: activeCategory || undefined,
    });
    const sanityCategories = await getSanityBlogCategories();

    // Fetch from WordPress as fallback or additional data
    const wpData = await getWPPosts({ perPage: 12 });
    const wpCategories = await getWPCategories();

    // Merge or prioritize Sanity
    const posts = sanityData.posts.length > 0 ? sanityData.posts : wpData?.posts || [];
    const categories = sanityCategories.length > 0 ? sanityCategories : wpCategories || [];

    // If no data at all, show placeholder
    if (posts.length === 0 && !wpData) {
        return <div className="text-center py-40">No posts found.</div>;
    }

    return (
        <main className="bg-midnight min-h-screen">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
            />

            {/* Hero */}
            <section className="pt-40 pb-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-gold/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 blur-[180px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="inline-block px-8 py-3 bg-midnight/80 backdrop-blur-md border border-gold/30 rounded-full text-gold font-bold tracking-[0.25em] text-xs uppercase shadow-2xl mb-6">
                        Knowledge Hub
                    </span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight">
                        The{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-gold to-ivory">
                            Sovereign
                        </span>{" "}
                        Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-ivory/60 max-w-2xl mx-auto font-light leading-relaxed">
                        Discover the wisdom of nature, traditional recipes, and the science of
                        farm-fresh nutrition.
                    </p>
                </div>
            </section>

            {/* Category Filters */}
            <Section className="py-0">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex gap-3 flex-wrap justify-center mb-16">
                        <Link
                            href="/blog"
                            className={`px-7 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 ${!activeCategory
                                ? "bg-gold text-midnight shadow-xl shadow-gold/20"
                                : "bg-white/5 backdrop-blur-md border border-white/10 text-ivory/80 hover:border-gold/40"
                                }`}
                        >
                            All Insights
                        </Link>
                        {categories.map((cat: any) => (
                            <Link
                                key={cat.slug}
                                href={`/blog?category=${cat.slug}`}
                                className={`px-7 py-3 rounded-full font-medium text-sm transition-all ${activeCategory === cat.slug
                                    ? "bg-gold text-midnight font-bold shadow-xl shadow-gold/20"
                                    : "bg-white/5 backdrop-blur-md border border-white/10 text-ivory/80 hover:border-gold/40 hover:text-gold"
                                    }`}
                            >
                                {cat.name}{" "}
                                <span
                                    className={`ml-1.5 ${activeCategory === cat.slug ? "text-midnight/50" : "text-gold/40"}`}
                                >
                                    {cat.count}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Blog Posts Grid */}
            <Section className="pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post: any, idx: number) => (
                                <BlogCard key={post.id || post.slug} post={post} index={idx} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-white/3 rounded-[3rem] border border-white/8">
                            <p className="text-2xl text-ivory/30 font-serif italic mb-4">
                                {activeCategory ? `No articles in "${activeCategory}" yet.` : "Our scribes are crafting new wisdom. Check back soon!"}
                            </p>
                            {activeCategory && (
                                <Link href="/blog" className="text-gold hover:underline font-bold text-sm uppercase tracking-widest">
                                    View All Articles →
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}

function estimateReadTime(excerpt?: string): number {
    if (!excerpt) return 5;
    const words = excerpt.split(/\s+/).length;
    // Assume excerpt is ~10% of article
    return Math.max(3, Math.ceil((words * 10) / 200));
}

function BlogCard({ post, index }: { post: any; index: number }) {
    const title = post.title;
    const slug = post.slug;
    const image = post.featuredImage || post.featured_image;
    const excerpt = post.excerpt;
    const author = post.author || "Amrit Milk";
    const date = post.publishedAt || post.date;
    const readTime = estimateReadTime(excerpt);

    return (
        <div>
            <Link
                href={`/blog/${slug}`}
                className="group block bg-midnight-light/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-gold/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-gold/5"
            >
                {/* Featured Image */}
                <div className="aspect-[16/10] overflow-hidden bg-midnight-mid relative">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-midnight-mid to-midnight">
                            <span className="text-gold/20 font-serif text-4xl">AM</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent" />
                    {/* Category Badge */}
                    {post.categories?.[0] && (
                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-midnight/80 backdrop-blur-md border border-gold/20 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest">
                            {typeof post.categories[0] === "string"
                                ? post.categories[0]
                                : post.categories[0].name}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-10">
                    <div className="flex items-center gap-5 mb-6 text-ivory/40 text-xs font-medium uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gold/50" />
                            <span>
                                {date
                                    ? new Date(date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                    : "Recent"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gold/50" />
                            <span>{readTime} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-gold/50" />
                            <span>{author}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold mb-6 text-ivory group-hover:text-gold transition-colors leading-tight line-clamp-2">
                        {title}
                    </h3>

                    {excerpt && (
                        <p
                            className="text-ivory/55 leading-relaxed mb-8 line-clamp-3 font-light text-base"
                            dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                    )}

                    <div className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                        Read Article
                        <span className="text-xl">→</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
