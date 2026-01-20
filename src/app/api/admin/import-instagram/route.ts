import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
        }

        // 1. Get Access Token
        const settings = await client.fetch(`*[_type == "siteSettings"][0]{instagramAccessToken}`);
        const accessToken = settings?.instagramAccessToken || process.env.INSTAGRAM_ACCESS_TOKEN;

        if (!accessToken) {
            return NextResponse.json(
                { success: false, error: "Instagram not connected" },
                { status: 400 }
            );
        }

        // 2. Fetch OEmbed Data
        const oembedUrl = `https://graph.facebook.com/v22.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${accessToken}&omitscript=true`;
        const res = await fetch(oembedUrl);
        const data = await res.json();

        if (data.error) {
            throw new Error(data.error.message || "Failed to fetch Instagram data");
        }

        // 3. Upload Image to Sanity
        let imageAsset;
        if (data.thumbnail_url) {
            const imageRes = await fetch(data.thumbnail_url);
            if (imageRes.ok) {
                const blob = await imageRes.blob();
                imageAsset = await client.assets.upload("image", blob, {
                    filename: `instagram-import-${Date.now()}.jpg`,
                });
            }
        }

        // 4. Create Document
        const newPost = {
            _type: "instagramPost",
            instagramId: data.media_id || `manual-${Date.now()}`, // OEmbed sometimes doesn't return media_id, fallback
            caption: data.title || data.caption || "Imported from Instagram", // OEmbed uses title
            url: url,
            mediaType: "IMAGE", // OEmbed doesn't always specify, assume image/video defaults
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

        const doc = await client.create(newPost);

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
