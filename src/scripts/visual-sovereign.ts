import { chromium } from "playwright";

/**
 * Visual Sovereign - NON-HEADLESS Demo
 * Run this to see the browser setup in action!
 */
async function openVisualBrowser() {
    console.log("🚀 SOVEREIGN VISUAL: LIFTING THE VEIL...");
    console.log("Opening Pipedream for your manual setup...");

    const browser = await chromium.launch({
        headless: false, // HERE IS THE MAGIC: Visually see the browser!
        channel: "chrome", // Use your actual Chrome engine
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
    });

    const page = await context.newPage();

    try {
        // Navigate to the dashboard setup
        await page.goto("https://pipedream.com/auth/login", { waitUntil: "networkidle" });

        console.log("\n✅ BROWSER OPEN!");
        console.log("You can now see the Sovereign Engine working.");
        console.log("Please sign up or log in to Pipedream to get your webhook URL.");

        // We keep it open for a while so you can interact
        console.log("Waiting 5 minutes for your interaction... (Press Ctrl+C to stop)");
        await page.waitForTimeout(300000);
    } catch (error: any) {
        console.error("❌ Visual session error:", error.message);
    } finally {
        await browser.close();
    }
}

openVisualBrowser();
