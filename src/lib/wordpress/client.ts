const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

if (!WORDPRESS_URL) {
    console.warn("NEXT_PUBLIC_WORDPRESS_URL is not defined in .env.local");
}

interface WPRequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean>;
}

export async function wpFetch<T>(endpoint: string, options: WPRequestOptions = {}): Promise<T> {
    if (!WORDPRESS_URL) {
        throw new Error("WordPress URL not configured");
    }

    const { params, ...fetchOptions } = options;
    const url = new URL(`${WORDPRESS_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    // Add consumer key/secret if they exist (for WooCommerce)
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (consumerKey && consumerSecret) {
        url.searchParams.append("consumer_key", consumerKey);
        url.searchParams.append("consumer_secret", consumerSecret);
    }

    const response = await fetch(url.toString(), {
        ...fetchOptions,
        headers: {
            "Content-Type": "application/json",
            ...fetchOptions.headers,
        },
        next: {
            revalidate: 60, // Default revalidation
            ...fetchOptions.next,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(
            `WordPress Fetch Error: ${response.status} ${response.statusText}`,
            errorBody
        );
        throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}
