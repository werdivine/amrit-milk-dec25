import { products as staticProducts } from "./products";
import { client, projectId } from "./sanity";

const productQuery = `*[_type == "product"] | order(_createdAt desc) {
  "id": _id,
  title,
  "price": price,
  "regularPrice": regularPrice,
  "image": image.asset->url,
  category,
  description,
  "slug": slug.current,
  sku,
  subscription,
  featured,
  badge,
  highlights,
  ingredients,
  benefits,
  howToUse,
  "longDescription": longDescription,
  variants
}`;

function formatPrice(price: any): string {
    if (typeof price === "number") return `₹${price}`;
    if (typeof price === "string" && !price.startsWith("₹")) return `₹${price}`;
    return String(price || "₹0");
}

export async function getProducts(): Promise<any[]> {
    try {
        if (!projectId) {
            console.log("[fetchProducts] No Sanity project ID, using static products");
            return staticProducts;
        }

        const sanityProducts = await client.fetch(
            productQuery,
            {},
            {
                next: {
                    revalidate: 60,
                    tags: ["product", "all"],
                },
            }
        );

        // PRIORITY: Sanity products take precedence
        // Only use static products as fallback if Sanity has ZERO products
        if (sanityProducts && sanityProducts.length > 0) {
            console.log(`[fetchProducts] Loaded ${sanityProducts.length} products from Sanity`);

            // Merge Strategy: Add static products that are NOT in Sanity (by slug)
            // This ensures new local-only products (like Dals) appear immediately
            const sanitySlugs = new Set(sanityProducts.map((p: any) => p.slug));
            const missingStaticProducts = staticProducts.filter((p) => !sanitySlugs.has(p.slug));
            const allProducts = [...sanityProducts, ...missingStaticProducts];

            return allProducts.map((p: any) => ({
                ...p,
                price: formatPrice(p.price),
                regularPrice: p.regularPrice ? formatPrice(p.regularPrice) : undefined,
            }));
        }

        // Fallback to static products only if Sanity is empty
        console.log("[fetchProducts] Sanity empty, using static products as fallback");
        return staticProducts.map((p: any) => ({
            ...p,
            price: formatPrice(p.price),
            regularPrice: p.regularPrice ? formatPrice(p.regularPrice) : undefined,
        }));
    } catch (error) {
        console.error("Error fetching products from Sanity:", error);
        return staticProducts;
    }
}

export async function getProductBySlug(slug: string): Promise<any | null> {
    try {
        if (!projectId) {
            return staticProducts.find((p) => p.slug === slug) || null;
        }

        const query = `*[_type == "product" && slug.current == $slug][0] {
            "id": _id,
            title,
            "price": price,
            "regularPrice": regularPrice,
            "image": image.asset->url,
            category,
            description,
            "slug": slug.current,
            sku,
            subscription,
            featured,
            badge,
            highlights,
            ingredients,
            benefits,
            howToUse,
            "longDescription": longDescription,
            variants
        }`;

        const product = await client.fetch(
            query,
            { slug },
            {
                next: {
                    revalidate: 60,
                    tags: ["product", `product:${slug}`, "all"],
                },
            }
        );
        const result = product || staticProducts.find((p) => p.slug === slug) || null;

        if (result) {
            // MERGE STRATEGY: Prioritize SANITY data (rich content) over LOCAL data
            const localMatch = staticProducts.find((p) => p.slug === slug);

            if (localMatch) {
                return {
                    ...localMatch, // Local data defaults
                    ...result, // Sanity data overrides basic fields
                    // FORCE Title from local if available (to remove "500ml" etc.)
                    title: localMatch.title || result.title,
                    // Preserved Rich Content: Use local data if Sanity data is missing
                    highlights: result.highlights || localMatch.highlights || [],
                    ingredients: result.ingredients || localMatch.ingredients || [],
                    benefits: result.benefits || localMatch.benefits || [],
                    howToUse: result.howToUse || localMatch.howToUse || [],
                    // Variants: PRIORITIZE LOCAL if available to ensure correct structure/titles
                    variants:
                        localMatch.variants && localMatch.variants.length > 0
                            ? localMatch.variants
                            : result.variants || [],
                    // Ensure prices are formatted correctly
                    price: formatPrice(result.price || localMatch.price),
                    regularPrice:
                        result.regularPrice || localMatch.regularPrice
                            ? formatPrice(result.regularPrice || localMatch.regularPrice)
                            : undefined,
                };
            }
            return {
                ...result,
                price: formatPrice(result.price),
                regularPrice: result.regularPrice ? formatPrice(result.regularPrice) : undefined,
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching product ${slug} from Sanity:`, error);
        return staticProducts.find((p) => p.slug === slug) || null;
    }
}
