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
  "longDescription": longDescription
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
            return sanityProducts.map((p: any) => ({
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
            "longDescription": longDescription
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
                    ...result, // Sanity data overrides (The latest info)
                    // Ensure prices are formatted correctly from whichever source we use
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
