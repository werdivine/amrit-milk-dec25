import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST(request: Request) {
    let browser;
    try {
        const { url } = await request.json();

        if (!url || !url.includes("instagram.com")) {
            return NextResponse.json(
                { success: false, error: "Invalid Instagram URL" },
                { status: 400 }
            );
        }

        // Launch headless browser
        browser = await chromium.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const context = await browser.newContext({
            userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        });

        const page = await context.newPage();

        // Navigate to the post
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

        // Wait for content to load
        await page.waitForTimeout(2000);

        // Extract OG meta tags (these are usually present even without login)
        const ogImage = await page
            .$eval('meta[property="og:image"]', (el) => el.getAttribute("content"))
            .catch(() => null);
        const ogTitle = await page
            .$eval('meta[property="og:title"]', (el) => el.getAttribute("content"))
            .catch(() => null);
        const ogDescription = await page
            .$eval('meta[property="og:description"]', (el) => el.getAttribute("content"))
            .catch(() => null);

        // Fallback: try to get image from the page directly if OG tags fail
        let imageUrl = ogImage;
        if (!imageUrl) {
            imageUrl = await page
                .$eval("article img", (el) => el.getAttribute("src"))
                .catch(() => null);
        }

        // Extract caption from description or page
        let caption = ogDescription || ogTitle || "";

        // Clean up caption (remove "X likes, Y comments" patterns)
        caption = caption
            .replace(/^\d+[\d,]*\s*(likes?|comments?|Likes?|Comments?)[,\s]*/g, "")
            .trim();

        await browser.close();
        browser = null;

        if (!imageUrl) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Could not extract image. The post may be private or Instagram blocked the request.",
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
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
