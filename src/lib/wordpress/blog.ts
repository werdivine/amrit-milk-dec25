import { wpFetch } from "./client";
import { SanityBlogPost } from "../fetchBlog";

interface WPPost {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    content: { rendered: string; protected: boolean };
    excerpt: { rendered: string; protected: boolean };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[];
    categories: number[];
    tags: number[];
    _embedded?: {
        "wp:featuredmedia"?: Array<{ source_url: string }>;
        author?: Array<{ name: string }>;
    };
}

function mapWPPostToBlog(post: WPPost): SanityBlogPost {
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
    const authorName = post._embedded?.["author"]?.[0]?.name || "Admin";

    return {
        id: String(post.id),
        title: post.title.rendered,
        slug: post.slug,
        featuredImage: featuredImage,
        excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
        content: [], // Rich text content handling is complex, leaving empty for now or raw
        author: authorName,
        publishedAt: post.date,
        categories: [], // Need to fetch categories separately to map IDs to names
    };
}

export async function getWordPressPosts(page = 1, perPage = 12) {
    try {
        const posts = await wpFetch<WPPost[]>("/wp-json/wp/v2/posts", {
            params: {
                page,
                per_page: perPage,
                _embed: true, // Important for images and author
            },
            next: { tags: ["posts"] },
        });

        // We also need headers for total pages, which fetch generic return type doesn't give easily
        // For now just return posts

        return {
            posts: posts.map(mapWPPostToBlog),
            total: 0, // TODO: Need to expose response headers in client.ts to get X-WP-Total
        };
    } catch (e) {
        console.error("Error fetching WP posts:", e);
        return { posts: [], total: 0 };
    }
}
