import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const query = `*[_type == "siteSettings"][0]{
            instagramAccessToken,
            instagramTokenExpiry,
            googleAccessToken,
            googleTokenExpiry
        }`;

        const settings = await client.fetch(query);

        const status = {
            instagram: !!settings?.instagramAccessToken,
            google: !!settings?.googleAccessToken,
            instagramExpiry: settings?.instagramTokenExpiry || null,
            googleExpiry: settings?.googleTokenExpiry || null,
        };

        return NextResponse.json({ success: true, status });
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}
