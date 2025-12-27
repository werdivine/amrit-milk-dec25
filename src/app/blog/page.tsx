import { getBlogPosts, getBlogCategories } from '@/lib/wordpressBlog';
import { Section } from "@/components/ui/section";
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';

export default async function BlogPage() {
    const data = await getBlogPosts({ perPage: 12 });
    const categories = await getBlogCategories();

    // If no WordPress data, show placeholder
    if (!data) {
        return <BlogPlaceholder />;
    }

    const { posts, total } = data;

    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero */}
            <section className="pt-32 pb-20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="inline-block px-8 py-3 bg-midnight/80 backdrop-blur-md border border-gold rounded-full text-gold font-bold tracking-[0.25em] text-xs uppercase shadow-2xl mb-6">
                        Knowledge Hub
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-gold to-ivory">Sovereign</span> Blog
                    </h1>
                    <p className="text-xl text-ivory/70">
                        Health wisdom, recipes, farm stories, and the science of real food.
                    </p>
                </div>
            </section>

            {/* Categories */}
            {categories.length > 0 && (
                <Section>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex gap-3 flex-wrap justify-center mb-12">
                            <Link href="/blog" className="px-6 py-2 bg-gold text-midnight rounded-full font-bold text-sm hover:bg-gold/90 transition-colors">
                                All Posts
                            </Link>
                            {categories.map((cat: any) => (
                                <Link
                                    key={cat.slug}
                                    href={`/blog/category/${cat.slug}`}
                                    className="px-6 py-2 bg-glass-bg border border-glass-border rounded-full font-medium text-sm hover:border-gold/30 transition-colors"
                                >
                                    {cat.name} <span className="text-gold">({cat.count})</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* Blog Posts Grid */}
            <Section>
                <div className="max-w-7xl mx-auto">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post: any) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-xl text-ivory/60">
                                No blog posts yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}

function BlogCard({ post }: { post: any }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group bg-glass-bg border border-glass-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all hover:-translate-y-2"
        >
            {/* Featured Image */}
            {post.featured_image && (
                <div className="aspect-video overflow-hidden bg-midnight-mid">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-6">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex gap-2 mb-3">
                        {post.categories.map((cat: string, i: number) => (
                            <span key={i} className="text-xs text-gold uppercase tracking-widest">
                                {cat}
                            </span>
                        ))}
                    </div>
                )}

                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-sm text-ivory/60 mb-4 line-clamp-3">
                    {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-ivory/50">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                    </div>
                    {post.reading_time && (
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.reading_time} min read
                        </div>
                    )}
                </div>
            </div>
        </Link>
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
