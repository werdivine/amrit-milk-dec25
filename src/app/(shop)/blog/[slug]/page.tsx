import { Section } from "@/components/ui/section";
import { blogPosts } from "@/lib/blog-content";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return Object.keys(blogPosts).map((slug) => ({
        slug,
    }));
}

export const dynamicParams = false;

export default function BlogPage({ params }: { params: { slug: string } }) {
    const post = blogPosts[params.slug];

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-creme dark:bg-midnight pt-32 pb-20">
            <article className="max-w-3xl mx-auto px-6">
                <header className="mb-12 text-center">
                    <span className="text-terracotta dark:text-gold font-bold uppercase tracking-widest text-sm mb-4 block">
                        Our Journal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-espresso/60 dark:text-ivory/60 text-sm">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>By {post.author}</span>
                    </div>
                </header>

                <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-theme-light">
                    <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div 
                    className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-headings:text-espresso dark:prose-headings:text-gold prose-p:text-espresso/80 dark:prose-p:text-ivory/80 max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            {/* Read Next */}
            <Section className="border-t border-theme-light mt-20 pt-20">
                <div className="text-center">
                    <h3 className="text-2xl font-serif font-bold mb-8 text-espresso dark:text-ivory">More from our Farm</h3>
                    <div className="flex justify-center gap-4">
                        {Object.entries(blogPosts).map(([slug, p]: [string, any]) => (
                            slug !== params.slug && (
                                <a 
                                    key={slug} 
                                    href={`/blog/${slug}`}
                                    className="block p-6 rounded-2xl bg-white dark:bg-white/5 border border-theme-light hover:border-terracotta transition-all max-w-sm text-left"
                                >
                                    <h4 className="font-bold text-lg mb-2 text-espresso dark:text-ivory">{p.title}</h4>
                                    <p className="text-sm text-espresso/60 dark:text-ivory/60 line-clamp-2">{p.excerpt}</p>
                                </a>
                            )
                        ))}
                    </div>
                </div>
            </Section>
        </main>
    );
}
