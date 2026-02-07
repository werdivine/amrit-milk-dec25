import { Section } from "@/components/ui/section";
import { getBlogPost as getWPPost } from "@/lib/wordpressBlog";
import { getSanityBlogPost } from "@/lib/fetchBlog";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BlogPage({ params }: { params: { slug: string } }) {
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

    return (
        <main className="min-h-screen bg-midnight pt-40 pb-32">
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
                    <div className="flex items-center gap-4 mb-8">
                        <span className="px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest">
                            {post.categories?.[0] || "Insight"}
                        </span>
                        <div className="h-px flex-grow bg-white/10" />
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-ivory mb-10 leading-tight">
                        {title}
                    </h1>

                    <div className="flex items-center gap-8 text-ivory/40 text-sm uppercase tracking-[0.2em] font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold/50" />
                            <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gold/50" />
                            <span>{author}</span>
                        </div>
                    </div>
                </header>

                {image && (
                    <div className="relative aspect-[16/9] w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-white/5">
                        <Image 
                            src={image} 
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-2xl prose-invert prose-gold max-w-none">
                    {Array.isArray(content) ? (
                        <PortableText value={content} />
                    ) : (
                        <div 
                            className="font-light leading-relaxed text-ivory/80 space-y-8"
                            dangerouslySetInnerHTML={{ __html: content }} 
                        />
                    )}
                </div>
            </article>

            {/* Newsletter or CTA */}
            <Section className="mt-32">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-midnight-light/50 to-midnight border border-white/10 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full" />
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 relative z-10">
                        Join the <span className="text-gold italic">Sovereign</span> Community
                    </h2>
                    <p className="text-xl text-ivory/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Get weekly insights on farm-to-table nutrition, health wisdom, and exclusive community updates.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto relative z-10">
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="flex-grow px-8 py-4 bg-white/5 border border-white/10 rounded-full text-ivory placeholder:text-ivory/20 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                        <button className="px-10 py-4 bg-gold text-midnight font-bold rounded-full hover:bg-gold/90 transition-all hover:scale-105">
                            Subscribe
                        </button>
                    </div>
                </div>
            </Section>
        </main>
    );
}
