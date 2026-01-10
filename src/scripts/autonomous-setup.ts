import { chromium } from "playwright";

async function autonomousSetupTest() {
    console.log("🚀 INITIATING AUTONOMOUS BROWSER (GOD MODE)...");

    const browser = await chromium.launch({
        headless: true, // Headless means no UI prompts for you
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--single-process",
        ],
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();

    try {
        // Task 1: Research Gumloop Automation Nodes
        console.log("Step 1: Researching Gumloop Webhook Nodes...");
        await page.goto("https://docs.gumloop.com", { waitUntil: "networkidle", timeout: 60000 });
        const gumloopInfo = await page.evaluate(() => {
            return {
                title: document.title,
                description: document.querySelector("p")?.innerText || "No description found",
            };
        });
        console.log("✅ Gumloop Research Complete:", gumloopInfo);

        // Task 2: Check Vercel Environment Configuration
        console.log("Step 2: Checking Vercel Environment Docs...");
        await page.goto("https://vercel.com/docs/projects/environment-variables", {
            waitUntil: "networkidle",
        });
        const vercelInfo = await page.evaluate(() => {
            return {
                title: document.title,
                header: document.querySelector("h1")?.innerText || "No header found",
            };
        });
        console.log("✅ Vercel Research Complete:", vercelInfo);

        console.log(
            "\n✨ AUTONOMOUS TEST SUCCESSFUL. I can browse and extract data without ANY prompts."
        );
    } catch (error) {
        console.error("❌ Automation failure:", error);
    } finally {
        await browser.close();
        console.log("Browser instance destroyed.");
    }
}

autonomousSetupTest();
