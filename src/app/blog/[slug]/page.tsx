import { getBlogPost, getBlogPosts } from '@/lib/wordpressBlog';
import { Section } from "@/components/ui/section";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
    const data = await getBlogPosts({ perPage: 100 });
    if (!data) return [];

    return data.posts.map((post: any) => ({
        slug: post.slug
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="bg-midnight min-h-screen">
            {/* Back Button */}
            <Section className="pt-32 pb-0">
                <div className="max-w-4xl mx-auto">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>
            </Section>

            {/* Article Header */}
            <Section>
                <article className="max-w-4xl mx-auto">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-3 mb-6">
                            {post.categories.map((cat: string, i: number) => (
                                <span key={i} className="px-4 py-1 bg-gold/20 text-gold rounded-full text-xs font-bold uppercase tracking-widest">
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        {post.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 pb-8 mb-8 border-b border-glass-border">
                        <div className="flex items-center gap-3">
                            {post.author.avatar && (
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-12 h-12 rounded-full"
                                />
                            )}
                            <div>
                                <div className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4 text-gold" />
                                    <span className="font-medium">{post.author.name}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-ivory/60 mt-1">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    {post.reading_time && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.reading_time} min read
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="aspect-video overflow-hidden rounded-2xl mb-12">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-serif prose-headings:text-ivory
                            prose-p:text-ivory/80 prose-p:leading-relaxed
                            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-ivory prose-strong:font-bold
                            prose-img:rounded-xl prose-img:shadow-2xl
                            prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:italic
                            prose-code:text-gold prose-code:bg-midnight-mid prose-code:px-2 prose-code:py-1 prose-code:rounded"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-glass-border">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Tag className="w-4 h-4 text-gold" />
                                {post.tags.map((tag: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-glass-bg border border-glass-border rounded-full text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    {post.cta && post.cta.text && (
                        <div className="mt-12 bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-serif font-bold mb-4">{post.cta.text}</h3>
                            <Button href={post.cta.link} size="lg" icon>
                                Learn More
                            </Button>
                        </div>
                    )}
                </article>
            </Section>
        </main>
    );
}
