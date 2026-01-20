import { NextResponse } from "next/server";

const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/instagram/callback`;
const SCOPES = "user_profile,user_media";

export async function GET() {
    if (!INSTAGRAM_APP_ID) {
        return NextResponse.json({ error: "Missing INSTAGRAM_APP_ID" }, { status: 500 });
    }

    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code`;

    return NextResponse.redirect(authUrl);
}
