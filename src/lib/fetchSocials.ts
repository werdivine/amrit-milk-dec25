import { instagramPosts as staticInstagramPosts } from "@/data/instagram";
import { googleReviews as staticGoogleReviews } from "@/data/reviews";
import { client } from "./sanity";

export async function getInstagramPosts() {
    try {
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return staticInstagramPosts;
        }

        const query = `*[_type == "instagramPost" && isVisible == true] | order(order asc) {
      "id": _id,
      "url": url,
      "imageUrl": image.asset->url,
      "caption": caption
    }`;

        const dynamicPosts = await client.fetch(query);
        
        // Combine dynamic with static and remove duplicates by URL
        const combined = [...(dynamicPosts || []), ...staticInstagramPosts];
        const unique = Array.from(new Map(combined.map(p => [p.url, p])).values());
        
        return unique.length > 0 ? unique : staticInstagramPosts;
    } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        return staticInstagramPosts;
    }
}

export async function getGoogleReviews() {
    try {
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return staticGoogleReviews;
        }

        const query = `*[_type == "googleReview"] | order(displayOrder asc) {
      "id": _id,
      "authorName": authorName,
      "rating": rating,
      "text": text,
      "date": date
    }`;

        const dynamicReviews = await client.fetch(query);
        
        // Combine dynamic with static and remove duplicates by authorName and text
        const combined = [...(dynamicReviews || []), ...staticGoogleReviews];
        const unique = Array.from(new Map(combined.map(r => [`${r.authorName}-${r.text.slice(0, 20)}`, r])).values());
        
        return unique.length > 0 ? unique : staticGoogleReviews;
    } catch (error) {
        console.error("Error fetching Google reviews:", error);
        return staticGoogleReviews;
    }
}
