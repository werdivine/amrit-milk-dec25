import { client } from './sanity';
import { products as staticProducts, Product } from './products';

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

export async function getProducts(): Promise<any[]> {
    try {
        // Only attempt to fetch if projectId is set
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            console.warn('Sanity Project ID not found. Using static products.');
            return staticProducts;
        }

        const sanityProducts = await client.fetch(productQuery);

        if (!sanityProducts || sanityProducts.length === 0) {
            return staticProducts;
        }

        // Merge or transform if necessary. 
        // For now, assume Sanity is the source of truth if available.
        return sanityProducts && sanityProducts.length > 0 ? sanityProducts : staticProducts;
    } catch (error) {
        console.error('Error fetching products from Sanity:', error);
        return staticProducts;
    }
}

export async function getProductBySlug(slug: string): Promise<any | null> {
    try {
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return staticProducts.find(p => p.slug === slug) || null;
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
        return product || staticProducts.find(p => p.slug === slug) || null;
    } catch (error) {
        console.error(`Error fetching product ${slug} from Sanity:`, error);
        return staticProducts.find(p => p.slug === slug) || null;
    }
}
