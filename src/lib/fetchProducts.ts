import { products as staticProducts } from "./products";
import { client } from "./sanity";

const productQuery = `*[_type == "product"] {
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
  benefits,
  "longDescription": longDescription,
  howToUse,
  nutrition,
  faqs,
  certifications
}`;

function formatPrice(price: any): string {
    if (typeof price === "number") return `₹${price}`;
    if (typeof price === "string" && !price.startsWith("₹")) return `₹${price}`;
    return String(price || "₹0");
}

export async function getProducts(): Promise<any[]> {
    try {
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return staticProducts;
        }

        // const sanityProducts = await client.fetch(productQuery);

        // Force local products to ensure image fixes are applied (Sovereign Mode)
        const products = staticProducts; // (sanityProducts && sanityProducts.length > 0) ? sanityProducts : staticProducts;

        return products.map((p) => ({
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
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
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
            benefits,
            "longDescription": longDescription,
            howToUse,
            nutrition,
            faqs,
            certifications
        }`;

        const product = await client.fetch(query, { slug });
        const result = product || staticProducts.find((p) => p.slug === slug) || null;

        if (result) {
            // MERGE STRATEGY: Prioritize LOCAL data (images, prices, titles) over Sanity data
            // This ensures manual updates in products.ts take precedence immediately
            const localMatch = staticProducts.find((p) => p.slug === slug);

            if (localMatch) {
                return {
                    ...result, // Sanity data (rich content)
                    ...localMatch, // Local data overrides (Images, Price, Title)
                    // Ensure prices are formatted
                    price: formatPrice(localMatch.price),
                    regularPrice: localMatch.regularPrice
                        ? formatPrice(localMatch.regularPrice)
                        : undefined,
                };
            }

            return {
                ...result,
                price: formatPrice(result.price),
                regularPrice: result.regularPrice ? formatPrice(result.regularPrice) : undefined,
            };
        }
        return null; // Should ideally fallback to local search if Sanity fails (handled by catch block)
    } catch (error) {
        console.error(`Error fetching product ${slug} from Sanity:`, error);
        const fallback = staticProducts.find((p) => p.slug === slug) || null;
        if (fallback) {
            return {
                ...fallback,
                price: formatPrice(fallback.price),
                regularPrice: fallback.regularPrice
                    ? formatPrice(fallback.regularPrice)
                    : undefined,
            };
        }
        return null;
    }
}
