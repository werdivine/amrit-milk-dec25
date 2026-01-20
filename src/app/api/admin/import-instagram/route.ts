import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { url, imageUrl, caption } = await request.json();

        if (!url) {
            return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
        }

        // Use a client with write token for mutations
        const writeClient = client.withConfig({
            token: process.env.SANITY_WRITE_TOKEN,
            useCdn: false, // Always use fresh data for writes
        });

        if (!process.env.SANITY_WRITE_TOKEN) {
            console.error("Missing SANITY_WRITE_TOKEN env var");
            return NextResponse.json(
                { success: false, error: "Server configuration error: Missing write token" },
                { status: 500 }
            );
        }

        // If imageUrl is provided (from scraper), use it directly
        if (!imageUrl) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Image URL is required. Use the Fetch button first to scrape the post.",
                },
                { status: 400 }
            );
        }

        // Upload Image to Sanity from the provided URL
        let imageAsset;
        try {
            const imageRes = await fetch(imageUrl);
            if (imageRes.ok) {
                const blob = await imageRes.blob();
                imageAsset = await writeClient.assets.upload("image", blob, {
                    filename: `instagram-import-${Date.now()}.jpg`,
                });
            }
        } catch (e) {
            console.warn("Failed to upload image:", e);
        }

        // Create Document
        const newPost = {
            _type: "instagramPost",
            instagramId: `manual-${Date.now()}`,
            caption: caption || "Imported from Instagram",
            url: url,
            mediaType: "IMAGE",
            isVisible: true,
            order: 0,
            image: imageAsset
                ? {
                      _type: "image",
                      asset: {
                          _type: "reference",
                          _ref: imageAsset._id,
                      },
                  }
                : undefined,
        };

        const doc = await writeClient.create(newPost);

        return NextResponse.json({
            success: true,
            message: "Post imported successfully",
            post: doc,
        });
    } catch (error: any) {
        console.error("Import Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
