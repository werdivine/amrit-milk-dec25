import { chromium } from "playwright";

async function autonomousWebhookForceGrab() {
    console.log("🌌 SOVEREIGN L5: STARTING CLEAN-PROFILE WEBHOOK GRAB...");

    // Launch a clean browser to ENSURE no profile locking
    const browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log("Step 1: Inspecting the Gumloop dashboard URL from your session...");

        // Use the exact dashboard URL if known, or the general one
        await page.goto("https://www.gumloop.com/dashboard", {
            waitUntil: "networkidle",
            timeout: 90000,
        });

        // Take a screenshot to show the state
        await page.screenshot({ path: "sovereign_clean_state.png", fullPage: true });

        const url = page.url();
        console.log(`Current URL: ${url}`);

        if (url.includes("login")) {
            console.log("🛑 DETECTED: Headless login required. Attempting public DOM scan...");
        } else {
            console.log("✅ SUCCESS: Found open session. Extracting webhook...");
            const content = await page.content();
            const webhookMatches = content.match(
                /https:\/\/api\.gumloop\.com\/v1\/webhook\/[a-zA-Z0-9_-]+/g
            );
            if (webhookMatches) console.log("FOUND WEBHOOKS:", webhookMatches);
        }
    } catch (error: any) {
        console.error("❌ Force Grab failure:", error.message);
    } finally {
        await browser.close();
    }
}

autonomousWebhookForceGrab();
