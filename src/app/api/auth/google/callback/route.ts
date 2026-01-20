import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`;

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
        // 1. Exchange Code for Tokens
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code: code,
                client_id: GOOGLE_CLIENT_ID!,
                client_secret: GOOGLE_CLIENT_SECRET!,
                redirect_uri: REDIRECT_URI,
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenRes.json();

        if (tokenData.error) {
            throw new Error(tokenData.error_description || "Failed to get Google tokens");
        }

        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token;
        const expiresInSeconds = tokenData.expires_in;
        const expiryDate = new Date(Date.now() + expiresInSeconds * 1000).toISOString();

        // 2. Store in Sanity
        const patch = client
            .patch("siteSettings")
            .set({
                googleAccessToken: accessToken,
                googleTokenExpiry: expiryDate,
            })
            .setIfMissing({ title: "Site Settings" });

        // Only update refresh token if we got one (we might not if the user didn't re-consent)
        if (refreshToken) {
            patch.set({ googleRefreshToken: refreshToken });
        }

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
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/socials?success=google_connected`
        );
    } catch (err: any) {
        console.error("Google Auth Error:", err);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/socials?error=${encodeURIComponent(err.message)}`
        );
    }
}
