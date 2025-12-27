const WP_URL = process.env.NEXT_PUBLIC_WP_URL || '';

/**
 * Fetch blog posts from WordPress
 */
export async function getBlogPosts(params: {
    page?: number;
    perPage?: number;
    category?: string;
    tag?: string;
} = {}) {
    if (!WP_URL) return null;

    try {
        const queryParams = new URLSearchParams({
            page: (params.page || 1).toString(),
            per_page: (params.perPage || 10).toString(),
            ...(params.category && { category: params.category }),
            ...(params.tag && { tag: params.tag })
        });

        const response = await fetch(`${WP_URL}/wp-json/amrit/v1/blog/posts?${queryParams}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return null;
    }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPost(slug: string) {
    if (!WP_URL) return null;

    try {
        const response = await fetch(`${WP_URL}/wp-json/amrit/v1/blog/posts/${slug}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error(`Error fetching blog post ${slug}:`, error);
        return null;
    }
}

/**
 * Fetch blog categories
 */
export async function getBlogCategories() {
    if (!WP_URL) return [];

    try {
        const response = await fetch(`${WP_URL}/wp-json/amrit/v1/blog/categories`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        return [];
    }
}

/**
 * Fetch blog tags
 */
export async function getBlogTags() {
    if (!WP_URL) return [];

    try {
        const response = await fetch(`${WP_URL}/wp-json/amrit/v1/blog/tags`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Error fetching blog tags:', error);
        return [];
    }
}
