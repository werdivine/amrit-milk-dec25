import { chromium } from "playwright";

async function verifySite() {
    console.log("Launching optimized headless browser...");
    const browser = await chromium.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--single-process",
            '--js-flags="--max-old-space-size=256"',
        ],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log("Navigating to Success Page...");
        await page.goto(
            "https://amrit-milk-dec25.vercel.app/checkout/success?order_id=VERIFY-TEST",
            {
                waitUntil: "networkidle",
            }
        );

        const title = await page.title();
        console.log("Page Title:", title);

        const isConfirmedVisible = await page.isVisible("text=Order Confirmed!");
        console.log("Success Message Visible:", isConfirmedVisible);

        const continueShoppingLink = page.locator("text=Continue Shopping");
        console.log("Continue Shopping Link exists:", (await continueShoppingLink.count()) > 0);

        // Test a product page slug
        console.log("Testing Product Slug...");
        await page.goto("https://amrit-milk-dec25.vercel.app/products/a2-gir-cow-milk-1l", {
            waitUntil: "networkidle",
        });
        console.log("Product Page Status:", page.url().includes("404") ? "404 Error" : "Success");
    } catch (error) {
        console.error("Verification failed:", error);
    } finally {
        await browser.close();
        console.log("Browser closed.");
    }
}

verifySite();
