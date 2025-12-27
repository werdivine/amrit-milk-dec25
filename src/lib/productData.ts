import { getWooCommerceProducts, transformWooProduct, wordpress } from '@/lib/wordpress';
import { products } from '@/lib/products';

/**
 * Get all products - from WordPress if configured, otherwise use static data
 */
export async function getAllProducts() {
    if (wordpress.isConfigured) {
        const wooProducts = await getWooCommerceProducts();
        if (wooProducts) {
            return wooProducts.map((p: any) => transformWooProduct(p));
        }
    }

    // Fallback to static products
    return products;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string) {
    const allProducts = await getAllProducts();
    if (category === 'all') return allProducts;
    return allProducts.filter((p: any) => p.category === category);
}
