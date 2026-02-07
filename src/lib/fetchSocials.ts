import { instagramPosts as staticInstagramPosts } from "@/data/instagram";
import { googleReviews as staticGoogleReviews } from "@/data/reviews";
import { client, projectId } from "./sanity";

export async function getInstagramPosts() {
    try {
        if (!projectId) {
            return staticInstagramPosts;
        }

        // Fetch a larger pool of posts to allow for randomization
        const query = `*[_type == "instagramPost" && isVisible == true] | order(_createdAt desc) [0...100] {
      "id": _id,
      "url": url,
      "imageUrl": image.asset->url,
      "caption": caption,
      "mediaType": mediaType
    }`;

        const dynamicPosts = await client.fetch(query, {}, {
            next: { 
                revalidate: 60,
                tags: ["instagramPost", "all"]
            }
        });
        
        // Combine dynamic with static
        // Prioritize dynamic posts (real content from Sanity)
        const dynamicPostsList = dynamicPosts || [];
        
        // Remove duplicates by URL
        const combined = [...dynamicPostsList, ...staticInstagramPosts];
        const unique = Array.from(new Map(combined.map(p => [p.url, p])).values());
        
        // If we have dynamic posts, show them first
        if (dynamicPostsList.length > 0) {
            // Return unique posts, prioritizing dynamic ones
            // We take the latest 12 dynamic posts for a nice grid
            return unique.slice(0, 12);
        }
        
        // Fallback to static, maybe slightly randomized but keep latest first if possible
        return unique.slice(0, 12);
    } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        return staticInstagramPosts.slice(0, 12);
    }
}

export async function getGoogleReviews() {
    try {
        if (!projectId) {
            return staticGoogleReviews;
        }

        // Fetch more reviews
        const query = `*[_type == "googleReview"] | order(date desc) [0...50] {
      "id": _id,
      "authorName": authorName,
      "rating": rating,
      "text": text,
      "date": date
    }`;

        const dynamicReviews = await client.fetch(query, {}, {
            next: { 
                revalidate: 60,
                tags: ["googleReview", "all"]
            }
        });
        
        // Combine dynamic with static
        const dynamicReviewsList = dynamicReviews || [];
        const combined = [...dynamicReviewsList, ...staticGoogleReviews];
        const unique = Array.from(new Map(combined.map(r => [`${r.authorName}-${r.text.slice(0, 20)}`, r])).values());
        
        // Return latest reviews
        return unique.slice(0, 20);
    } catch (error) {
        console.error("Error fetching Google reviews:", error);
        return staticGoogleReviews.slice(0, 20);
    }
}
