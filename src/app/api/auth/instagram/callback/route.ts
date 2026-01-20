import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID;
const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/instagram/callback`;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/socials?error=${error}`
        );
    }

    if (!code) {
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/socials?error=no_code`
        );
    }

    try {
        // 1. Exchange Code for Short-Lived Token
        const form = new FormData();
        form.append("client_id", INSTAGRAM_APP_ID!);
        form.append("client_secret", INSTAGRAM_APP_SECRET!);
        form.append("grant_type", "authorization_code");
        form.append("redirect_uri", REDIRECT_URI);
        form.append("code", code);

        const shortRes = await fetch("https://api.instagram.com/oauth/access_token", {
            method: "POST",
            body: form,
        });

        const shortData = await shortRes.json();

        if (shortData.error_message || !shortData.access_token) {
            throw new Error(shortData.error_message || "Failed to get short-lived token");
        }

        const shortToken = shortData.access_token;
        const userId = shortData.user_id;

        // 2. Exchange Short-Lived Token for Long-Lived Token (60 days)
        const longRes = await fetch(
            `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_APP_SECRET}&access_token=${shortToken}`
        );
        const longData = await longRes.json();

        if (longData.error || !longData.access_token) {
            throw new Error(longData.error?.message || "Failed to get long-lived token");
        }

        const longToken = longData.access_token;
        const expiresInSeconds = longData.expires_in || 5184000; // 60 days default
        const expiryDate = new Date(Date.now() + expiresInSeconds * 1000).toISOString();

        // 3. Store in Sanity
        // Check if settings doc exists, if not create it with specific ID 'siteSettings'
        const patch = client
            .patch("siteSettings")
            .set({
                instagramAccessToken: longToken,
                instagramTokenExpiry: expiryDate,
                instagramUserId: userId.toString(),
            })
            .setIfMissing({ title: "Site Settings" });

        await client
            .transaction()
            .createIfNotExists({
                _id: "siteSettings",
                _type: "siteSettings",
                title: "Site Settings",
            })
            .patch(patch)
            .commit();

        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/socials?success=instagram_connected`
        );
    } catch (err: any) {
        console.error("Instagram Auth Error:", err);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/socials?error=${encodeURIComponent(err.message)}`
        );
    }
}
