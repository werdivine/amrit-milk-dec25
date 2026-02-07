import { client, writeClient } from "../sanity";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

async function refreshGoogleToken(refreshToken: string) {
    console.log("Refreshing Google Access Token...");
    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID!,
            client_secret: GOOGLE_CLIENT_SECRET!,
            refresh_token: refreshToken,
            grant_type: "refresh_token",
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to refresh token: ${data.error_description || data.error}`);
    }

    const newAccessToken = data.access_token;
    const expiresInSeconds = data.expires_in;
    const expiryDate = new Date(Date.now() + expiresInSeconds * 1000).toISOString();

    // Update Sanity
    await writeClient
        .patch("siteSettings")
        .set({
            googleAccessToken: newAccessToken,
            googleTokenExpiry: expiryDate,
        })
        .commit();

    return newAccessToken;
}

async function getValidGoogleToken() {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]{
        googleAccessToken,
        googleRefreshToken,
        googleTokenExpiry
    }`, {}, {
        next: { tags: ["siteSettings"] }
    });

    if (!settings?.googleAccessToken || !settings?.googleRefreshToken) {
        throw new Error("Google is not connected. Please connect in Admin Settings.");
    }

    const expiry = new Date(settings.googleTokenExpiry);
    const now = new Date();

    // If token expires in less than 5 minutes, refresh it
    if (expiry.getTime() - now.getTime() < 5 * 60 * 1000) {
        return refreshGoogleToken(settings.googleRefreshToken);
    }

    return settings.googleAccessToken;
}

export async function fetchGoogleReviews() {
    const accessToken = await getValidGoogleToken();

    // 1. Get Account ID
    const accountsRes = await fetch(
        "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    const accountsData = await accountsRes.json();

    if (!accountsData.accounts || accountsData.accounts.length === 0) {
        throw new Error("No Google Business accounts found.");
    }

    const accountName = accountsData.accounts[0].name; // "accounts/12345"

    // 2. Get Location ID
    const locationsRes = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title`,
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    const locationsData = await locationsRes.json();

    if (!locationsData.locations || locationsData.locations.length === 0) {
        throw new Error("No locations found for this account.");
    }

    // Use the first location for now
    const locationName = locationsData.locations[0].name; // "locations/67890"

    // 3. Get Reviews
    const reviewsRes = await fetch(
        `https://mybusiness.googleapis.com/v4/${accountName}/${locationName}/reviews?pageSize=10`,
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    const reviewsData = await reviewsRes.json();

    return reviewsData.reviews || [];
}

export async function syncGoogleReviewsToSanity() {
    const reviews = await fetchGoogleReviews();
    const results = { total: reviews.length, created: 0, skipped: 0 };

    for (const review of reviews) {
        // review.name is the unique ID, e.g. "accounts/X/locations/Y/reviews/Z"
        // We can use the last part as ID or the whole thing

        // Filter: only 5 star reviews? Or sync all? Let's sync 4+ stars
        const rating = ["FIVE", "FOUR", "5", "4"].includes(review.starRating)
            ? review.starRating === "FIVE"
                ? 5
                : 4
            : 0;

        if (rating < 4) continue;

        const existing = await client.fetch(`*[_type == "googleReview" && reviewId == $id][0]`, {
            id: review.reviewId,
        });

        if (existing) {
            results.skipped++;
            continue;
        }

        const doc = {
            _type: "googleReview",
            reviewId: review.reviewId,
            authorName: review.reviewer.displayName,
            rating: rating,
            text: review.comment || "",
            date: review.createTime,
            displayOrder: 0,
            originalJson: JSON.stringify(review),
        };

        await writeClient.create(doc);
        results.created++;
    }

    return results;
}
