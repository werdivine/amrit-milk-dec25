import { wpFetch } from "./client";

// Define the shape of a WooCommerce Product (partial)
interface WooProduct {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    price_html: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    stock_status: string;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    sold_individually: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    tags: any[];
    images: {
        id: number;
        date_created: string;
        date_created_gmt: string;
        date_modified: string;
        date_modified_gmt: string;
        src: string;
        name: string;
        alt: string;
    }[];
    attributes: {
        id: number;
        name: string;
        position: number;
        visible: boolean;
        variation: boolean;
        options?: string[];
        option?: string;
    }[];
    default_attributes: any[];
    variations: number[];
    grouped_products: number[];
    menu_order: number;
    meta_data: any[];
}

// Internal Variant Interface matching src/lib/products.ts
interface ProductVariant {
    id: string;
    title: string;
    size: string;
    weight: string;
    price: number;
    originalPrice?: number;
    inStock: boolean;
    inventory?: number;
}

// Map WooCommerce product to our internal Product interface
function mapWooProductToProduct(p: WooProduct, variations: WooProduct[] = []): any {
    // Parse HTML description to clean text if needed
    const cleanDescription = p.short_description ? p.short_description.replace(/<[^>]+>/g, "") : "";
    const cleanLongDescription = p.description; // We might want HTML here for rich text

    const product: any = {
        id: String(p.id),
        title: p.name,
        price: `₹${p.price || p.regular_price || 0}`, // Display price
        regularPrice: p.regular_price ? `₹${p.regular_price}` : undefined,
        image: p.images[0]?.src || "",
        category: p.categories[0]?.name || "Uncategorized",
        description: cleanDescription,
        slug: p.slug,
        sku: p.sku,
        subscription: false, // Default, override from meta if possible
        featured: p.featured,
        badge: p.on_sale ? "Sale" : undefined,
        highlights: [], // TODO: Map from ACF or Attributes
        ingredients: [],
        benefits: [],
        howToUse: [],
        longDescription: cleanLongDescription,
        variants: [],
    };

    // Handle Variable Products
    if (p.type === "variable" && variations.length > 0) {
        product.variants = variations.map((v) => {
            // Try to find size/weight from attributes
            const sizeAttr = v.attributes.find(
                (a) => a.name.toLowerCase() === "size" || a.name.toLowerCase() === "weight"
            );
            const sizeVal = sizeAttr
                ? sizeAttr.option || (sizeAttr.options && sizeAttr.options[0]) || "Standard"
                : "Standard";

            return {
                id: String(v.id),
                title: sizeVal, // e.g. "1kg" or "500ml"
                size: sizeVal,
                weight: v.weight || "0",
                price: parseFloat(v.price || "0"),
                originalPrice: v.regular_price ? parseFloat(v.regular_price) : undefined,
                inStock: v.stock_status === "instock",
                inventory: v.stock_quantity || 0,
            };
        });

        // Update main product price to show range or starting price if needed
        // Logic: If we have variants, usually we show the lowest price 'Starting at...'
        // but purely strictly for this app, string "₹2500" is expected.
        const prices = product.variants
            .map((v: any) => v.price)
            .sort((a: number, b: number) => a - b);
        if (prices.length > 0) {
            product.price = `₹${prices[0]}`;
            if (prices.length > 1) {
                // Optional: indicate "From ₹..." if UI supports it, currently strict number/string
            }
        }
    }

    return product;
}

export async function getWordPressProducts() {
    try {
        const products = await wpFetch<WooProduct[]>("/wp-json/wc/v3/products", {
            params: {
                status: "publish",
                per_page: 100,
            },
            next: { tags: ["products"] },
        });

        return products.map((p) => mapWooProductToProduct(p));
    } catch (error) {
        console.error("Error fetching WooCommerce products:", error);
        return [];
    }
}

export async function getWordPressProductBySlug(slug: string) {
    try {
        const products = await wpFetch<WooProduct[]>("/wp-json/wc/v3/products", {
            params: {
                slug: slug,
                status: "publish",
            },
            next: { tags: [`product:${slug}`] },
        });

        if (products.length > 0) {
            const p = products[0];
            let variations: WooProduct[] = [];

            // If variable, fetch variations
            if (p.type === "variable" && p.variations.length > 0) {
                // We need to fetch variations.
                // Standard Woo endpoint: /products/{id}/variations
                try {
                    variations = await wpFetch<WooProduct[]>(
                        `/wp-json/wc/v3/products/${p.id}/variations`,
                        {
                            params: { per_page: 100 },
                            next: { tags: [`product:${p.id}:variations`] },
                        }
                    );
                } catch (e) {
                    console.warn(`Failed to fetch variations for ${slug}`, e);
                }
            }

            return mapWooProductToProduct(p, variations);
        }
        return null;
    } catch (error) {
        console.error(`Error fetching WooCommerce product ${slug}:`, error);
        return null;
    }
}
