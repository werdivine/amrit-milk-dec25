import axios from 'axios';

// WordPress/WooCommerce Configuration
const WP_URL = process.env.NEXT_PUBLIC_WP_URL || '';
const WC_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || '';

// Check if WordPress is configured
export const isWordPressConfigured = () => {
    return !!(WP_URL && WC_KEY && WC_SECRET);
};

// WooCommerce API Client
const wooApi = axios.create({
    baseURL: `${WP_URL}/wp-json/wc/v3`,
    auth: {
        username: WC_KEY,
        password: WC_SECRET
    },
    headers: {
        'Content-Type': 'application/json'
    }
});

// WordPress REST API Client
const wpApi = axios.create({
    baseURL: `${WP_URL}/wp-json/wp/v2`,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Fetch all products from WooCommerce
 */
export async function getWooCommerceProducts() {
    if (!isWordPressConfigured()) {
        console.warn('WordPress not configured. Using static product data.');
        return null;
    }

    try {
        const response = await wooApi.get('/products', {
            params: {
                per_page: 100,
                status: 'publish'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching WooCommerce products:', error);
        return null;
    }
}

/**
 * Fetch single product by slug
 */
export async function getWooCommerceProduct(slug: string) {
    if (!isWordPressConfigured()) {
        return null;
    }

    try {
        const response = await wooApi.get('/products', {
            params: {
                slug: slug
            }
        });
        return response.data[0] || null;
    } catch (error) {
        console.error(`Error fetching product ${slug}:`, error);
        return null;
    }
}

/**
 * Fetch ACF (Advanced Custom Fields) data for a product
 */
export async function getProductACF(productId: number) {
    if (!isWordPressConfigured()) {
        return null;
    }

    try {
        const response = await axios.get(
            `${WP_URL}/wp-json/acf/v3/products/${productId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching ACF for product ${productId}:`, error);
        return null;
    }
}

/**
 * Transform WooCommerce product to our format
 */
export function transformWooProduct(wooProduct: any, acfData?: any) {
    return {
        id: wooProduct.id.toString(),
        title: wooProduct.name,
        price: `₹${wooProduct.price}`,
        regularPrice: wooProduct.regular_price ? `₹${wooProduct.regular_price}` : undefined,
        image: wooProduct.images[0]?.src || '/assets/img/placeholder.png',
        category: wooProduct.categories[0]?.name || 'Other',
        description: stripHtml(wooProduct.short_description || wooProduct.description),
        slug: wooProduct.slug,
        badge: wooProduct.featured ? 'Featured' : undefined,
        subscription: wooProduct.meta_data?.find((m: any) => m.key === 'subscription')?.value === 'yes',
        sku: wooProduct.sku,

        // Rich content from ACF
        longDescription: acfData?.acf?.long_description || '',
        benefits: acfData?.acf?.benefits || [],
        nutrition: acfData?.acf?.nutrition || [],
        howToUse: acfData?.acf?.how_to_use || [],
        recipes: acfData?.acf?.recipes || [],
        faqs: acfData?.acf?.faqs || [],
        certifications: acfData?.acf?.certifications || [],
        research: acfData?.acf?.research || []
    };
}

/**
 * Create WooCommerce order (for checkout)
 */
export async function createWooCommerceOrder(orderData: {
    line_items: Array<{ product_id: string; quantity: number }>;
    billing: any;
    shipping?: any;
    payment_method?: string;
}) {
    if (!isWordPressConfigured()) {
        throw new Error('WordPress not configured');
    }

    try {
        const response = await wooApi.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

/**
 * Get WooCommerce categories
 */
export async function getWooCommerceCategories() {
    if (!isWordPressConfigured()) {
        return null;
    }

    try {
        const response = await wooApi.get('/products/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}

// Helper: Strip HTML tags
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
}

// Export WordPress status
export const wordpress = {
    isConfigured: isWordPressConfigured(),
    url: WP_URL
};
