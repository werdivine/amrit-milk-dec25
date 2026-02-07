import { client } from "./sanity";

export interface SanityBlogPost {
    id: string;
    title: string;
    slug: string;
    featuredImage?: string;
    excerpt?: string;
    content?: any[];
    author?: string;
    publishedAt: string;
    categories?: string[];
}

export async function getSanityBlogPosts(params: {
    page?: number;
    perPage?: number;
    category?: string;
} = {}) {
    try {
        const { page = 1, perPage = 12, category } = params;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        let filter = '*[_type == "blog"]';
        if (category) {
            filter += ` && "${category}" in categories`;
        }

        const query = `${filter} | order(publishedAt desc) [${start}...${end}] {
            "id": _id,
            title,
            "slug": slug.current,
            "featuredImage": featuredImage.asset->url,
            excerpt,
            author,
            publishedAt,
            categories
        }`;

        const posts = await client.fetch(query, {}, {
            next: { 
                revalidate: 60,
                tags: ["blog", "all"]
            }
        });

        // Get total count
        const countQuery = `count(${filter})`;
        const total = await client.fetch(countQuery, {}, {
            next: { tags: ["blog", "all"] }
        });

        return {
            posts: posts || [],
            total: total || 0
        };
    } catch (error) {
        console.error('Error fetching blog posts from Sanity:', error);
        return { posts: [], total: 0 };
    }
}

export async function getSanityBlogPost(slug: string): Promise<SanityBlogPost | null> {
    try {
        const query = `*[_type == "blog" && slug.current == $slug][0] {
            "id": _id,
            title,
            "slug": slug.current,
            "featuredImage": featuredImage.asset->url,
            excerpt,
            content,
            author,
            publishedAt,
            categories
        }`;

        const post = await client.fetch(query, { slug }, {
            next: { 
                revalidate: 60,
                tags: ["blog", `blog:${slug}`, "all"]
            }
        });

        return post || null;
    } catch (error) {
        console.error(`Error fetching blog post ${slug} from Sanity:`, error);
        return null;
    }
}

export async function getSanityBlogCategories() {
    try {
        const query = `*[_type == "blog"] { categories }`;
        const results = await client.fetch(query, {}, {
            next: { tags: ["blog"] }
        });
        
        const categoriesMap = new Map();
        results.forEach((post: any) => {
            if (post.categories) {
                post.categories.forEach((cat: string) => {
                    const existing = categoriesMap.get(cat) || 0;
                    categoriesMap.set(cat, existing + 1);
                });
            }
        });

        return Array.from(categoriesMap.entries()).map(([name, count]) => ({
            name,
            slug: name.toLowerCase().replace(/ /g, '-'),
            count
        }));
    } catch (error) {
        console.error('Error fetching blog categories from Sanity:', error);
        return [];
    }
}
