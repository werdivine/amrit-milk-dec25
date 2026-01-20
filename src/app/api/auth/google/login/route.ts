import { NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`;
const SCOPES = ["https://www.googleapis.com/auth/business.manage", "email", "profile"].join(" ");

export async function GET() {
    if (!GOOGLE_CLIENT_ID) {
        return NextResponse.json({ error: "Missing GOOGLE_CLIENT_ID" }, { status: 500 });
    }

    // access_type=offline is required to get a refresh token
    // prompt=consent forces the consent screen to ensure we get a refresh token every time
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}&access_type=offline&prompt=consent`;

    return NextResponse.redirect(authUrl);
}
