import { client } from "../sanity";

const INSTAGRAM_API_URL = "https://graph.instagram.com/me/media";

interface InstagramMedia {
    id: string;
    caption: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    permalink: string;
    thumbnail_url?: string; // For videos
}

export async function fetchInstagramMedia(accessToken: string): Promise<InstagramMedia[]> {
    const url = `${INSTAGRAM_API_URL}?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}&limit=20`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Instagram API Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Failed to fetch Instagram media:", error);
        throw error;
    }
}

export async function syncInstagramToSanity() {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
        throw new Error("Missing INSTAGRAM_ACCESS_TOKEN in environment variables");
    }

    const mediaList = await fetchInstagramMedia(accessToken);
    const results = {
        total: mediaList.length,
        created: 0,
        updated: 0,
        skipped: 0,
    };

    for (const media of mediaList) {
        // Check if post already exists
        const existing = await client.fetch(
            `*[_type == "instagramPost" && instagramId == $id][0]`,
            { id: media.id }
        );

        if (existing) {
            results.skipped++;
            continue;
        }

        // Create new post (Hidden by default)
        const imageUrl = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;

        if (!imageUrl) continue;

        // Use a simple fetch to get the image blob and upload it to Sanity if we want to host it ourselves
        // For now, we'll store the URL. But typically Sanity wants an asset.
        // To keep it simple and robust, we will try to upload the image to Sanity's asset store.

        let imageAsset;
        try {
            const imageRes = await fetch(imageUrl);
            if (imageRes.ok) {
                const blob = await imageRes.blob();
                imageAsset = await client.assets.upload("image", blob, {
                    filename: `instagram-${media.id}.jpg`,
                });
            }
        } catch (e) {
            console.warn(`Failed to upload image for ${media.id}`, e);
        }

        const doc = {
            _type: "instagramPost",
            instagramId: media.id,
            caption: media.caption || "",
            url: media.permalink,
            mediaType: media.media_type,
            isVisible: false, // User must manually approve
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

        await client.create(doc);
        results.created++;
    }

    return results;
}
