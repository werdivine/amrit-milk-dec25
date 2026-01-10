import * as os from "os";
import * as path from "path";
import { chromium } from "playwright";

async function sovereignBridge() {
    console.log("🌌 INITIATING SOVEREIGN BRIDGE (L5 AUTONOMY)...");

    // Path to your local Chrome profile
    const userDataDir = path.join(
        os.homedir(),
        "AppData",
        "Local",
        "Google",
        "Chrome",
        "User Data"
    );

    console.log(`📂 Using Profile: ${userDataDir}`);

    const browser = await chromium.launchPersistentContext(userDataDir, {
        channel: "chrome",
        headless: true, // Run in background to avoid bothering you
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });

    const page = await browser.newPage();

    try {
        // 1. Get Gumloop Webhook
        console.log("Step 1: Navigating to Gumloop to find Webhook...");
        await page.goto("https://www.gumloop.com/dashboard", {
            waitUntil: "networkidle",
            timeout: 60000,
        });

        // Take a screenshot to confirm we are logged in
        await page.screenshot({ path: "gumloop_session_test.png" });

        const gumloopUrl = await page.url();
        console.log(`Gumloop URL: ${gumloopUrl}`);

        if (gumloopUrl.includes("login")) {
            console.error(
                "❌ ERROR: Not logged into Gumloop. Please log in in your Chrome browser."
            );
        } else {
            // Logic to find first flow and copy webhook
            console.log("🔍 Scanning for active flows...");
        }

        // 2. Vercel Configuration
        console.log("Step 2: Navigating to Vercel Settings...");
        const vercelEnvUrl =
            "https://vercel.com/praveen-pathaks-projects/amrit-milk-dec25/settings/environment-variables";
        await page.goto(vercelEnvUrl, { waitUntil: "networkidle", timeout: 60000 });

        await page.screenshot({ path: "vercel_session_test.png" });

        if (page.url().includes("login")) {
            console.error(
                "❌ ERROR: Not logged into Vercel. Please log in in your Chrome browser."
            );
        } else {
            console.log("✅ Vercel Session Active. Ready to inject keys.");
        }
    } catch (error) {
        console.error("❌ Sovereign Bridge failure:", error);
    } finally {
        await browser.close();
        console.log("Sovereign Bridge instance closed.");
    }
}

sovereignBridge();
