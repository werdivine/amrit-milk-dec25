import { chromium } from "playwright";

async function completeSetup() {
    console.log("🚀 STARTING COMPLETION TASK (AUTONOMOUS)...");

    const browser = await chromium.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--single-process",
        ],
    });

    // We try to use the persistent context if available, but for now standard
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
    });

    const page = await context.newPage();

    try {
        // 1. Check Vercel
        console.log("Checking Vercel Login Status...");
        await page.goto("https://vercel.com/dashboard", {
            waitUntil: "networkidle",
            timeout: 60000,
        });
        const vercelLogged = (await page.url().includes("login"))
            ? "NO (Redirected to Login)"
            : "YES (In Dashboard)";
        console.log("Vercel Status:", vercelLogged);

        if (vercelLogged === "YES (In Dashboard)") {
            console.log("Searching for amrit-milk project...");
            await page.goto(
                "https://vercel.com/praveen-pathaks-projects/amrit-milk-dec25/settings/environment-variables",
                { waitUntil: "networkidle" }
            );
            console.log("Arrived at Env Var page.");
            // Take screenshot to metadata directory (if I had one for this session)
        }

        // 2. Check Gumloop
        console.log("Checking Gumloop Status...");
        await page.goto("https://www.gumloop.com/dashboard", {
            waitUntil: "networkidle",
            timeout: 60000,
        });
        const gumloopLogged = (await page.url().includes("login")) ? "NO" : "YES";
        console.log("Gumloop Status:", gumloopLogged);

        if (gumloopLogged === "YES") {
            console.log("Extracting Webhook info...");
            // Logic to find first flow and its webhook
        }
    } catch (error) {
        console.error("Setup Completion error:", error);
    } finally {
        await browser.close();
    }
}

completeSetup();
