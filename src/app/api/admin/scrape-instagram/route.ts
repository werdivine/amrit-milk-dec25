import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url || !url.includes("instagram.com")) {
            return NextResponse.json(
                { success: false, error: "Invalid Instagram URL" },
                { status: 400 }
            );
        }

        // Use mobile user agent - Instagram often serves lighter pages for mobile
        const headers = {
            "User-Agent":
                "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
        };

        const response = await fetch(url, { headers, redirect: "follow" });
        const html = await response.text();

        // Extract OG meta tags using regex
        const ogImageMatch =
            html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i);
        const ogTitleMatch =
            html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i);
        const ogDescMatch =
            html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+content="([^"]+)"\s+property="og:description"/i);

        let imageUrl = ogImageMatch?.[1] || null;
        let caption = ogDescMatch?.[1] || ogTitleMatch?.[1] || "";

        // Clean up caption (decode HTML entities and remove "X likes" patterns)
        caption = caption
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/^\d+[\d,]*\s*(likes?|comments?|Likes?|Comments?)[,\s]*/gi, "")
            .trim();

        // If we didn't find OG tags, try alternative patterns
        if (!imageUrl) {
            // Try to find image URL in JSON-LD or other script tags
            const jsonLdMatch = html.match(/"image"\s*:\s*"([^"]+)"/);
            if (jsonLdMatch) {
                imageUrl = jsonLdMatch[1];
            }
        }

        if (!imageUrl) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Could not extract image. The post may be private or Instagram is blocking the request. Try using the direct Sanity upload instead.",
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                imageUrl,
                caption,
                url,
            },
        });
    } catch (error: any) {
        console.error("Scrape Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to scrape post" },
            { status: 500 }
        );
    }
}
