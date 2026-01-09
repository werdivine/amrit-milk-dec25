import { products } from "@/lib/products";
import fs from "fs";
import mime from "mime";
import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN, // Match user's Vercel env var
    useCdn: false,
});

export async function GET() {
    const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
    if (!token) {
        return NextResponse.json(
            { error: "Missing SANITY_WRITE_TOKEN or SANITY_API_TOKEN" },
            { status: 500 }
        );
    }

    const log: string[] = [];

    try {
        for (const product of products) {
            const documentId = `product-${product.slug}`;

            // Upload Image if present
            let imageAssetId = null;
            if (product.image && product.image.startsWith("/")) {
                const imagePath = path.join(process.cwd(), "public", product.image);
                if (fs.existsSync(imagePath)) {
                    const fileBuffer = fs.readFileSync(imagePath);
                    const asset = await client.assets.upload("image", fileBuffer, {
                        filename: path.basename(imagePath),
                        contentType: mime.getType(imagePath) || "image/png",
                    });
                    imageAssetId = asset._id;
                }
            }

            const doc = {
                _id: documentId,
                _type: "product",
                title: product.title,
                slug: { _type: "slug", current: product.slug },
                price: parseFloat(product.price.toString().replace(/[^0-9.]/g, "")),
                description: product.description,
                category: product.category,
                sku: product.sku,
                image: imageAssetId
                    ? {
                          _type: "image",
                          asset: { _type: "reference", _ref: imageAssetId },
                      }
                    : undefined,
            };

            await client.createOrReplace(doc);
            log.push(`Synced: ${product.title}`);
        }

        return NextResponse.json({ success: true, count: products.length, log });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
