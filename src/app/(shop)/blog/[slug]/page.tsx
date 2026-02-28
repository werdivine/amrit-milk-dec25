import { Section } from "@/components/ui/section";
import { getBlogPost as getWPPost } from "@/lib/wordpressBlog";
import { getSanityBlogPost, getSanityBlogPosts } from "@/lib/fetchBlog";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Generate static params for all blog posts
export async function generateStaticParams() {
    const { posts } = await getSanityBlogPosts({ perPage: 100 });
    return posts.map((p: any) => ({ slug: p.slug }));
}

// Dynamic SEO metadata per article
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getSanityBlogPost(params.slug);
    if (!post) return { title: "Article Not Found" };

    const title = `${post.title} | Amrit Milk Blog`;
    const description =
        post.excerpt ||
        `Read about ${post.title} on the Amrit Milk Sovereign Journal — India's most authentic A2 dairy blog.`;
    const image =
        post.featuredImage ||
        "https://amritmilkorganic.com/assets/img/products/amrit_ghee_premium.png";

    return {
        title,
        description,
        alternates: {
            canonical: `https://amritmilkorganic.com/blog/${params.slug}`,
        },
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author || "Amrit Milk"],
            tags: post.categories,
            images: [{ url: image, width: 1200, height: 630, alt: post.title }],
            siteName: "Amrit Milk Organic",
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

// PortableText custom components for rich rendering
const ptComponents = {
    block: {
        h2: ({ children }: any) => (
            <h2 className="text-4xl font-serif font-bold text-ivory mt-16 mb-6 leading-tight">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-serif font-bold text-ivory/90 mt-12 mb-4 leading-tight">
                {children}
            </h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-xl font-serif font-semibold text-gold mt-8 mb-3">{children}</h4>
        ),
        normal: ({ children }: any) => (
            <p className="text-ivory/75 leading-relaxed text-lg font-light mb-6">{children}</p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-gold pl-6 my-8 italic text-ivory/60 text-xl font-serif">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-none space-y-3 my-6 ml-4">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-inside space-y-3 my-6 ml-4 text-ivory/75">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="flex items-start gap-3 text-ivory/75 text-lg font-light">
                <span className="text-gold mt-1.5 shrink-0">✦</span>
                <span>{children}</span>
            </li>
        ),
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold text-ivory">{children}</strong>,
        em: ({ children }: any) => <em className="italic text-ivory/90">{children}</em>,
        link: ({ value, children }: any) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }: any) => (
            <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden my-12 shadow-2xl border border-white/5">
                <Image
                    src={value?.asset?.url || ""}
                    alt={value?.alt || ""}
                    fill
                    className="object-cover"
                />
            </div>
        ),
    },
};

function estimateReadTime(content: any[]): number {
    let text = "";
    if (Array.isArray(content)) {
        content.forEach((block: any) => {
            if (block._type === "block" && block.children) {
                block.children.forEach((child: any) => {
                    text += child.text || "";
                });
            }
        });
    }
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    // Try Sanity first
    const sanityPost = await getSanityBlogPost(params.slug);

    // Try WordPress if not in Sanity
    const wpPost = !sanityPost ? await getWPPost(params.slug) : null;

    const post = sanityPost || wpPost;

    if (!post) {
        notFound();
    }

    const title = post.title;
    const image = post.featuredImage || post.featured_image || post.image;
    const date = post.publishedAt || post.date;
    const author = post.author || "Amrit Milk";
    const content = post.content;
    const readTime = Array.isArray(content) ? estimateReadTime(content) : 5;

    // Article JSON-LD schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: post.excerpt || "",
        image: image || "",
        author: {
            "@type": "Organization",
            name: author,
            url: "https://amritmilkorganic.com",
        },
        publisher: {
            "@type": "Organization",
            name: "Amrit Milk Organic",
            logo: {
                "@type": "ImageObject",
                url: "https://amritmilkorganic.com/assets/img/logos/amrit_logo.png",
            },
        },
        datePublished: date || new Date().toISOString(),
        dateModified: date || new Date().toISOString(),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://amritmilkorganic.com/blog/${params.slug}`,
        },
        articleSection: post.categories?.[0] || "Health",
        keywords: (post.categories || []).join(", ") || "A2 milk, organic dairy, Amrit Milk",
    };

    return (
        <main className="min-h-screen bg-midnight pt-40 pb-32">
            {/* Article JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <article className="max-w-4xl mx-auto px-6">
                {/* Back to Blog */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-widest mb-12 hover:gap-4 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Journal
                </Link>

                <header className="mb-16">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-8">
                            {post.categories.map((cat: string) => (
                                <Link
                                    key={cat}
                                    href={`/blog?category=${cat.toLowerCase().replace(/ /g, "-")}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest hover:bg-gold/20 transition-colors"
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-ivory mb-10 leading-tight">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 md:gap-8 text-ivory/40 text-sm uppercase tracking-[0.2em] font-medium pb-10 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold/50" />
                            <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gold/50" />
                            <span>{author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gold/50" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </header>

                {image && (
                    <div className="relative aspect-[16/9] w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-white/5">
                        <Image src={image} alt={title} fill className="object-cover" priority />
                        {/* Subtle gradient overlay at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent" />
                    </div>
                )}

                {/* Excerpt / Lead */}
                {post.excerpt && (
                    <div className="bg-white/3 border border-white/8 rounded-3xl p-8 md:p-10 mb-12">
                        <p className="text-xl md:text-2xl text-ivory/80 font-light leading-relaxed italic font-serif">
                            {post.excerpt}
                        </p>
                    </div>
                )}

                {/* Article Body */}
                <div className="prose prose-invert max-w-none">
                    {Array.isArray(content) ? (
                        <PortableText value={content} components={ptComponents} />
                    ) : (
                        <div
                            className="font-light leading-relaxed text-ivory/80 space-y-8 text-lg"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </div>

                {/* Category Tags Footer */}
                {post.categories && post.categories.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap gap-3">
                        <span className="text-ivory/30 text-sm uppercase tracking-widest font-medium mr-2">
                            Tags:
                        </span>
                        {post.categories.map((cat: string) => (
                            <Link
                                key={cat}
                                href={`/blog?category=${cat.toLowerCase().replace(/ /g, "-")}`}
                                className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-ivory/60 hover:border-gold/30 hover:text-gold transition-all"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                )}
            </article>

            {/* CTA Section */}
            <Section className="mt-32">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-midnight-light/50 to-midnight border border-white/10 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/3 blur-[80px] rounded-full" />
                    <p className="text-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 relative z-10">
                        The Sovereign Community
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 relative z-10">
                        Experience the <span className="text-gold italic">Amrit</span> Difference
                    </h2>
                    <p className="text-xl text-ivory/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
                        Pure A2 Gir Cow Milk, traditional Bilona Ghee, and farm-fresh products —
                        delivered to your door.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/products"
                            className="px-10 py-4 bg-gold text-midnight font-bold rounded-full hover:bg-gold/90 transition-all hover:scale-105 shadow-xl shadow-gold/20"
                        >
                            Shop Now
                        </Link>
                        <Link
                            href="/blog"
                            className="px-10 py-4 bg-white/5 border border-white/10 text-ivory font-medium rounded-full hover:border-gold/30 hover:text-gold transition-all"
                        >
                            Read More Articles
                        </Link>
                    </div>
                </div>
            </Section>
        </main>
    );
}
