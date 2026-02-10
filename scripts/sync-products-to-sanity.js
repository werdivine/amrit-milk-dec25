/**
 * Sync Products from Local products.ts to Sanity CMS
 *
 * Usage: node scripts/sync-products-to-sanity.js
 *
 * Requires: SANITY_WRITE_TOKEN environment variable
 */

const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

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

// Import products from JSON (we'll generate this first)
let localProducts = [];

try {
    // Read products from a generated JSON file
    const productsJsonPath = path.join(__dirname, "products-export.json");
    if (fs.existsSync(productsJsonPath)) {
        localProducts = JSON.parse(fs.readFileSync(productsJsonPath, "utf8"));
        console.log(`📦 Loaded ${localProducts.length} products from products-export.json`);
    } else {
        console.error("❌ products-export.json not found. Run the export first.");
        console.log("   Generate it by running: npx tsx scripts/export-products.ts");
        process.exit(1);
    }
} catch (error) {
    console.error("❌ Failed to load products:", error.message);
    process.exit(1);
}

// Track statistics
let created = 0;
let updated = 0;
let failed = 0;

/**
 * Upload a local image file to Sanity and return the asset reference
 */
async function uploadImage(imagePath) {
    try {
        if (!imagePath) return null;

        // If it's already a URL, skip upload
        if (imagePath.startsWith("http")) {
            console.log(`  ⏭️  Skipping URL image: ${imagePath.substring(0, 50)}...`);
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
        console.error(`  ❌ Failed to upload image: ${imagePath}`, error.message);
        return null;
    }
}

/**
 * Create or update a product in Sanity
 */
async function syncProduct(product) {
    const slug = product.slug;

    try {
        // Check if product already exists
        const existing = await client.fetch(
            `*[_type == "product" && slug.current == $slug][0]{ _id }`,
            { slug }
        );

        // Clean price (remove ₹ symbol)
        const cleanPrice = (price) => {
            if (!price) return null;
            return String(price).replace("₹", "").replace(",", "").trim();
        };

        // Prepare the document
        const doc = {
            _type: "product",
            title: product.title,
            slug: { _type: "slug", current: slug },
            price: cleanPrice(product.price),
            regularPrice: cleanPrice(product.regularPrice) || undefined,
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
        console.error(`❌ Failed: ${product.title}`, error.message);
        failed++;
    }
}

/**
 * Main sync function
 */
async function main() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("  SANITY PRODUCT SYNC");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`  Project: ${projectId}`);
    console.log(`  Dataset: ${dataset}`);
    console.log(`  Products to sync: ${localProducts.length}`);
    console.log("═══════════════════════════════════════════════════════════\n");

    // Process products in batches to avoid rate limiting
    const batchSize = 3;
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
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }

    console.log("\n═══════════════════════════════════════════════════════════");
    console.log("  SYNC COMPLETE");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`  ✅ Created: ${created}`);
    console.log(`  🔄 Updated: ${updated}`);
    console.log(`  ❌ Failed: ${failed}`);
    console.log("═══════════════════════════════════════════════════════════\n");
}

main().catch(console.error);
