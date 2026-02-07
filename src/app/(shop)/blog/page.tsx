import { Section } from "@/components/ui/section";
import { getBlogCategories as getWPCategories, getBlogPosts as getWPPosts } from "@/lib/wordpressBlog";
import { getSanityBlogCategories, getSanityBlogPosts } from "@/lib/fetchBlog";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
    // Fetch from Sanity first
    const sanityData = await getSanityBlogPosts({ perPage: 12 });
    const sanityCategories = await getSanityBlogCategories();

    // Fetch from WordPress as fallback or additional data
    const wpData = await getWPPosts({ perPage: 12 });
    const wpCategories = await getWPCategories();

    // Merge or prioritize Sanity
    const posts = sanityData.posts.length > 0 ? sanityData.posts : (wpData?.posts || []);
    const categories = sanityCategories.length > 0 ? sanityCategories : (wpCategories || []);

    // If no data at all, show placeholder
    if (posts.length === 0 && !wpData) {
        return <BlogPlaceholder />;
    }

    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero */}
            <section className="pt-40 pb-20 text-center relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-gold/10 via-transparent to-transparent pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <div>
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
                            Discover the wisdom of nature, traditional recipes, and the science of farm-fresh nutrition.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            {categories.length > 0 && (
                <Section className="py-0">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex gap-4 flex-wrap justify-center mb-16">
                            <Link
                                href="/blog"
                                className="px-8 py-3 bg-gold text-midnight rounded-full font-bold text-sm hover:bg-gold/90 transition-all hover:scale-105 shadow-xl shadow-gold/20"
                            >
                                All Insights
                            </Link>
                            {categories.map((cat: any) => (
                                <Link
                                    key={cat.slug}
                                    href={`/blog/category/${cat.slug}`}
                                    className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-medium text-sm text-ivory/80 hover:border-gold/50 hover:text-gold transition-all"
                                >
                                    {cat.name} <span className="text-gold/50 ml-2">{cat.count}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

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
                        <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-white/10">
                            <p className="text-2xl text-ivory/40 font-serif italic">
                                Our scribes are currently crafting new wisdom. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}

function BlogCard({ post, index }: { post: any, index: number }) {
    // Handle both Sanity and WP field names
    const title = post.title;
    const slug = post.slug;
    const image = post.featuredImage || post.featured_image;
    const excerpt = post.excerpt;
    const author = post.author || "Amrit Milk";
    const date = post.publishedAt || post.date;

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
                    {/* Category Badge if exists */}
                    {post.categories?.[0] && (
                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-midnight/80 backdrop-blur-md border border-gold/20 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest">
                            {typeof post.categories[0] === 'string' ? post.categories[0] : post.categories[0].name}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-10">
                    <div className="flex items-center gap-6 mb-6 text-ivory/40 text-xs font-medium uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold/50" />
                            <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gold/50" />
                            <span>{author}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold mb-6 text-ivory group-hover:text-gold transition-colors leading-tight line-clamp-2">
                        {title}
                    </h3>
                    
                    <p className="text-ivory/60 leading-relaxed mb-8 line-clamp-3 font-light text-lg" dangerouslySetInnerHTML={{ __html: excerpt || '' }} />

                    <div className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                        Read Article
                        <span className="text-xl">→</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

function BlogPlaceholder() {
    return (
        <main className="bg-midnight min-h-screen pt-32">
            <Section>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-serif font-bold mb-4">Blog Coming Soon</h1>
                    <p className="text-xl text-ivory/70 mb-8">
                        Configure WordPress to enable blog posts.
                    </p>
                    <Link href="/" className="text-gold hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </Section>
        </main>
    );
}
