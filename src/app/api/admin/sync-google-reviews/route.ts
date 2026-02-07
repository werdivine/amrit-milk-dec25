import { syncGoogleReviewsToSanity } from "@/lib/services/google";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const results = await syncGoogleReviewsToSanity();

        // Trigger revalidation for the UI
        revalidateTag("googleReview");

        return NextResponse.json({
            success: true,
            message: "Google Reviews sync completed successfully",
            stats: results,
        });
    } catch (error: any) {
        console.error("Google Sync failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
