import * as path from "path";
import { chromium } from "playwright";

async function godModeSetup() {
    console.log("🌌 INITIATING GOD MODE SETUP...");

    const browser = await chromium.launch({
        channel: "chrome", // Use real Chrome engine
        headless: true, // Background execution
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--single-process",
        ],
    });

    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();

    async function safeScreenshot(name: string) {
        const screenshotPath = path.join(process.cwd(), `god_mode_${name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
    }

    try {
        // 1. Vercel Project Check
        console.log("Step 1: Inspecting Vercel Projects...");
        await page.goto("https://vercel.com/dashboard", {
            waitUntil: "networkidle",
            timeout: 60000,
        });
        await safeScreenshot("vercel_dashboard");

        // 2. Gumloop Workflow Check
        console.log("Step 2: Inspecting Gumloop Dashboard...");
        await page.goto("https://www.gumloop.com/dashboard", {
            waitUntil: "networkidle",
            timeout: 60000,
        });
        await safeScreenshot("gumloop_dashboard");

        // 3. ntfy.sh Verification
        console.log("Step 3: Checking ntfy.sh topic status...");
        await page.goto("https://ntfy.sh/amrit-milk-orders-test-123", { waitUntil: "networkidle" });
        await safeScreenshot("ntfy_status");

        console.log("\n✨ GOD MODE AUDIT COMPLETE. Reviewing screenshots for action...");
    } catch (error) {
        console.error("❌ God Mode failure:", error);
    } finally {
        await browser.close();
    }
}

godModeSetup();
