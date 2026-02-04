import { getProducts } from "@/lib/fetchProducts";
import { MetadataRoute } from "next";

const BASE_URL = "https://amritmilkorganic.com";

// Static pages with their priorities and change frequencies
const staticPages = [
    { path: "", priority: 1.0, changefreq: "daily" },
    { path: "/products", priority: 0.9, changefreq: "daily" },
    { path: "/blog", priority: 0.8, changefreq: "weekly" },
    { path: "/the-farm", priority: 0.8, changefreq: "monthly" },
    { path: "/sustainability", priority: 0.7, changefreq: "monthly" },
    { path: "/manifesto", priority: 0.7, changefreq: "monthly" },
    { path: "/lab-reports", priority: 0.7, changefreq: "weekly" },
    { path: "/faq", priority: 0.6, changefreq: "monthly" },
    { path: "/contact", priority: 0.6, changefreq: "monthly" },
    { path: "/calculator", priority: 0.6, changefreq: "monthly" },
    { path: "/quiz", priority: 0.6, changefreq: "monthly" },
    { path: "/genetic-library", priority: 0.6, changefreq: "monthly" },
    { path: "/subscription-hub", priority: 0.8, changefreq: "weekly" },
    { path: "/ghee", priority: 0.8, changefreq: "weekly" },
    { path: "/csr", priority: 0.5, changefreq: "monthly" },
    { path: "/privacy", priority: 0.3, changefreq: "yearly" },
    { path: "/terms", priority: 0.3, changefreq: "yearly" },
    { path: "/refund", priority: 0.3, changefreq: "yearly" },
];

// SEO landing pages
const landingPages = [
    { path: "/lp/a2-milk-lucknow", priority: 0.9, changefreq: "weekly" },
    { path: "/lp/bilona-ghee-lucknow", priority: 0.9, changefreq: "weekly" },
    { path: "/lp/farm-fresh-milk-lucknow", priority: 0.9, changefreq: "weekly" },
    { path: "/lp/why-families-choose-amrit", priority: 0.8, changefreq: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date();

    // Static pages sitemap entries
    const staticEntries = staticPages.map((page) => ({
        url: `${BASE_URL}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changefreq as
            | "daily"
            | "weekly"
            | "monthly"
            | "yearly",
        priority: page.priority,
    }));

    // Landing pages sitemap entries
    const landingEntries = landingPages.map((page) => ({
        url: `${BASE_URL}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changefreq as
            | "daily"
            | "weekly"
            | "monthly"
            | "yearly",
        priority: page.priority,
    }));

    // Dynamic product pages
    let productEntries: MetadataRoute.Sitemap = [];
    try {
        const products = await getProducts();
        productEntries = products.map((product) => ({
            url: `${BASE_URL}/products/${product.slug}`,
            lastModified: product.updatedAt
                ? new Date(product.updatedAt)
                : currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.8,
            images: product.image
                ? [
                      {
                          loc: product.image.startsWith("http")
                              ? product.image
                              : `${BASE_URL}${product.image}`,
                          caption: product.title,
                          title: product.title,
                      },
                  ]
                : undefined,
        }));
    } catch (error) {
        console.error("Error fetching products for sitemap:", error);
    }

    // Blog posts (if available)
    let blogEntries: MetadataRoute.Sitemap = [];
    try {
        // Import dynamically to avoid issues if the module doesn't exist
        const { getAllBlogs } = await import("@/lib/wordpressBlog");
        const blogs = await getAllBlogs();
        blogEntries = blogs.map((blog: any) => ({
            url: `${BASE_URL}/blog/${blog.slug}`,
            lastModified: blog.modified
                ? new Date(blog.modified)
                : currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.7,
            images: blog.featuredImage
                ? [
                      {
                          loc: blog.featuredImage,
                          caption: blog.title.rendered,
                          title: blog.title.rendered,
                      },
                  ]
                : undefined,
        }));
    } catch {
        // Blog fetching is optional
        console.log("Blog posts not available for sitemap");
    }

    return [...staticEntries, ...landingEntries, ...productEntries, ...blogEntries];
}
