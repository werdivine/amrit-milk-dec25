const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

/**
 * Fetch data from WordPress GraphQL API
 */
async function wpFetch(query: string, variables = {}) {
    if (!WORDPRESS_API_URL) {
        throw new Error("WORDPRESS_API_URL not configured");
    }

    const headers = { "Content-Type": "application/json" };

    const res = await fetch(WORDPRESS_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 }, // Cache for 60 seconds
    });

    const json = await res.json();

    if (json.errors) {
        console.error("WPGraphQL Errors:", json.errors);
        throw new Error("Failed to fetch API");
    }

    return json.data;
}

/**
 * Get all products for the catalog
 */
export async function getAllProductsWP() {
    const query = `
    query GetAllProducts {
      products(first: 20, where: { status: "PUBLISH" }) {
        nodes {
          id
          slug
          name
          description(format: RAW)
          shortDescription(format: RAW)
          image {
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            price(format: RAW)
            regularPrice(format: RAW)
            stockStatus
          }
        }
      }
    }
    `;

    const data = await wpFetch(query);
    return data.products.nodes;
}

/**
 * Get single product by Slug
 */
export async function getProductBySlugWP(slug: string) {
    const query = `
    query GetProductBySlug($id: ID!) {
      product(id: $id, idType: SLUG) {
        id
        slug
        name
        description
        shortDescription
        image {
            sourceUrl
            altText
        }
        galleryImages {
            nodes {
                sourceUrl
            }
        }
        ... on SimpleProduct {
            price
            regularPrice
            stockStatus
        }
      }
    }
    `;

    const data = await wpFetch(query, { id: slug });
    return data.product;
}
