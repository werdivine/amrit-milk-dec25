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

        const posts = await client.fetch(query);
        return posts && posts.length > 0 ? posts : staticInstagramPosts;
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

        const reviews = await client.fetch(query);
        return reviews && reviews.length > 0 ? reviews : staticGoogleReviews;
    } catch (error) {
        console.error("Error fetching Google reviews:", error);
        return staticGoogleReviews;
    }
}
