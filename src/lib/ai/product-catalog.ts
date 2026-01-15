/**
 * Amrit AI - Product Catalog Integration
 * Fetches product info with PUBLIC pricing for AI responses
 */

import { Product, products } from "@/lib/products";
import { ProductPricingContext } from "@/types/chat";

// Product name aliases for fuzzy matching
const PRODUCT_ALIASES: Record<string, string[]> = {
    ghee: ["ghee", "ghī", "घी", "desi ghee", "cow ghee", "bilona"],
    milk: ["milk", "doodh", "dudh", "दूध", "a2 milk"],
    honey: ["honey", "shahad", "शहद", "madhu"],
    mustard: ["mustard", "sarson", "सरसों", "sarso"],
    groundnut: ["groundnut", "mungfali", "मूंगफली", "peanut"],
    coconut: ["coconut", "nariyal", "नारियल"],
    sesame: ["sesame", "til", "तिल"],
    tulsi: ["tulsi", "तुलसी", "basil"],
    paneer: ["paneer", "पनीर", "cheese"],
    curd: ["curd", "dahi", "दही", "yogurt"],
    atta: ["atta", "आटा", "flour", "wheat"],
};

/**
 * Find products matching a query
 */
export function findProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();

    // Direct category match
    const categoryMatch = products.filter(
        (p) =>
            p.category.toLowerCase().includes(lowerQuery) ||
            lowerQuery.includes(p.category.toLowerCase())
    );

    if (categoryMatch.length > 0) return categoryMatch;

    // Title match
    const titleMatch = products.filter(
        (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            lowerQuery.includes(p.title.toLowerCase().split(" ")[0])
    );

    if (titleMatch.length > 0) return titleMatch;

    // Alias-based match
    for (const [key, aliases] of Object.entries(PRODUCT_ALIASES)) {
        if (aliases.some((alias) => lowerQuery.includes(alias.toLowerCase()))) {
            return products.filter(
                (p) =>
                    p.title.toLowerCase().includes(key) ||
                    p.category.toLowerCase().includes(key) ||
                    p.description.toLowerCase().includes(key)
            );
        }
    }

    // Fuzzy match on all fields
    return products.filter(
        (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get product pricing context for AI
 */
export function getProductPricingContext(query: string): ProductPricingContext[] {
    const matchedProducts = findProducts(query);

    return matchedProducts.map((product) => ({
        productId: product.id,
        title: product.title,
        price: product.price,
        regularPrice: product.regularPrice,
        category: product.category,
        description: product.description,
        availability: "in_stock" as const, // TODO: Integrate with inventory
        isSubscriptionProduct: product.subscription || false,
        slug: product.slug,
    }));
}

/**
 * Format product info for AI response (Hindi-first)
 */
export function formatProductResponse(products: ProductPricingContext[]): string {
    if (products.length === 0) {
        return "Is product ki information abhi available nahi hai.";
    }

    if (products.length === 1) {
        const p = products[0];
        let response = `${p.title} ka price **${p.price}** hai।\n\n`;
        response += `${p.description}\n\n`;
        response += `🛒 Order karne ke liye website par "Add to Cart" karein ya WhatsApp par message karein।`;
        return response;
    }

    // Multiple products
    let response = "Yeh products available hain:\n\n";
    for (const p of products.slice(0, 5)) {
        // Limit to 5
        response += `• **${p.title}** - ${p.price}\n`;
    }
    response += "\n🛒 Order ke liye website dekhein ya WhatsApp karein।";
    return response;
}

/**
 * Check if a product exists in catalog
 */
export function productExists(productName: string): boolean {
    return findProducts(productName).length > 0;
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

/**
 * Extract product mentions from message
 */
export function extractProductMentions(message: string): string[] {
    const mentions: string[] = [];
    const lowerMessage = message.toLowerCase();

    for (const [key, aliases] of Object.entries(PRODUCT_ALIASES)) {
        if (aliases.some((alias) => lowerMessage.includes(alias.toLowerCase()))) {
            mentions.push(key);
        }
    }

    return Array.from(new Set(mentions));
}

/**
 * Get product catalog summary for context
 */
export function getProductCatalogSummary(): string {
    const categories = Array.from(new Set(products.map((p) => p.category)));

    let summary = "Amrit Milk Organic Products:\n\n";

    for (const cat of categories) {
        const catProducts = getProductsByCategory(cat);
        const priceRange = getPriceRange(catProducts);
        summary += `**${cat}** (${catProducts.length} items): ${priceRange}\n`;
    }

    return summary;
}

function getPriceRange(products: Product[]): string {
    const prices = products
        .map((p) => {
            const match = p.price.match(/₹(\d+)/);
            return match ? parseInt(match[1]) : 0;
        })
        .filter((p) => p > 0);

    if (prices.length === 0) return "Price varies";

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    if (min === max) return `₹${min}`;
    return `₹${min} - ₹${max}`;
}
