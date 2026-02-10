/**
 * Sync Products from Local products.ts to Sanity CMS
 *
 * This script reads all products from src/lib/products.ts and creates/updates
 * corresponding documents in Sanity. Images are uploaded to Sanity's asset library.
 *
 * Usage: npx ts-node scripts/sync-products-to-sanity.ts
 *
 * Requires: SANITY_WRITE_TOKEN environment variable
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { products as localProducts, Product } from "../src/lib/products";
import "dotenv/config";

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fqzgs92z";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
    console.error("❌ Error: SANITY_WRITE_TOKEN environment variable is required.");
    console.error("   Please add it to your .env.local file.");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
});

// Track statistics
let created = 0;
let updated = 0;
let skipped = 0;
let failed = 0;

/**
 * Upload a local image file to Sanity and return the asset reference
 */
async function uploadImage(imagePath: string): Promise<any | null> {
    try {
        // If it's already a URL, skip upload
        if (imagePath.startsWith("http")) {
            console.log(`  ⏭️  Skipping URL image: ${imagePath}`);
            return null;
        }

        // Convert relative path to absolute
        const absolutePath = path.join(process.cwd(), "public", imagePath);

        if (!fs.existsSync(absolutePath)) {
            console.log(`  ⚠️  Image not found: ${absolutePath}`);
            return null;
        }

        const imageBuffer = fs.readFileSync(absolutePath);
        const filename = path.basename(imagePath);

        console.log(`  📤 Uploading image: ${filename}`);

        const asset = await client.assets.upload("image", imageBuffer, {
            filename,
        });

        return {
            _type: "image",
            asset: {
                _type: "reference",
                _ref: asset._id,
            },
        };
    } catch (error) {
        console.error(`  ❌ Failed to upload image: ${imagePath}`, error);
        return null;
    }
}

/**
 * Create or update a product in Sanity
 */
async function syncProduct(product: Product): Promise<void> {
    const slug = product.slug;

    try {
        // Check if product already exists
        const existing = await client.fetch(
            `*[_type == "product" && slug.current == $slug][0]{ _id }`,
            { slug }
        );

        // Prepare the document
        const doc: any = {
            _type: "product",
            title: product.title,
            slug: { _type: "slug", current: slug },
            price: product.price.replace("₹", "").trim(),
            regularPrice: product.regularPrice?.replace("₹", "").trim() || undefined,
            description: product.description,
            category: product.category,
            sku: product.sku,
            badge: product.badge || undefined,
            subscription: product.subscription || false,
            featured: product.featured || false,
            highlights: product.highlights || [],
            ingredients: product.ingredients || [],
            benefits: product.benefits || [],
            howToUse: product.howToUse || [],
        };

        // Upload image
        if (product.image) {
            const imageRef = await uploadImage(product.image);
            if (imageRef) {
                doc.image = imageRef;
            }
        }

        if (existing) {
            // Update existing document
            await client.patch(existing._id).set(doc).commit();
            console.log(`✅ Updated: ${product.title}`);
            updated++;
        } else {
            // Create new document
            await client.create(doc);
            console.log(`🆕 Created: ${product.title}`);
            created++;
        }
    } catch (error) {
        console.error(`❌ Failed: ${product.title}`, error);
        failed++;
    }
}

/**
 * Main sync function
 */
async function main(): Promise<void> {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("  SANITY PRODUCT SYNC");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`  Project: ${projectId}`);
    console.log(`  Dataset: ${dataset}`);
    console.log(`  Products to sync: ${localProducts.length}`);
    console.log("═══════════════════════════════════════════════════════════\n");

    // Process products in batches to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < localProducts.length; i += batchSize) {
        const batch = localProducts.slice(i, i + batchSize);
        console.log(
            `\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(localProducts.length / batchSize)}...\n`
        );

        for (const product of batch) {
            await syncProduct(product);
        }

        // Small delay between batches
        if (i + batchSize < localProducts.length) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    console.log("\n═══════════════════════════════════════════════════════════");
    console.log("  SYNC COMPLETE");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`  ✅ Created: ${created}`);
    console.log(`  🔄 Updated: ${updated}`);
    console.log(`  ⏭️  Skipped: ${skipped}`);
    console.log(`  ❌ Failed: ${failed}`);
    console.log("═══════════════════════════════════════════════════════════\n");
}

main().catch(console.error);
