import * as os from "os";
import * as path from "path";
import { SovereignOperator } from "../lib/sovereign-operator";

async function scrapeGumloop() {
    console.log("🌌 SOVEREIGN SCRAPER: INITIATING GUMLOOP WEBHOOK RETRIEVAL...");

    const userDataDir = path.join(
        os.homedir(),
        "AppData",
        "Local",
        "Google",
        "Chrome",
        "User Data"
    );
    const operator = new SovereignOperator();

    try {
        await operator.init(userDataDir);

        const result = await operator.performTask(
            "https://www.gumloop.com/dashboard",
            async (page) => {
                console.log("🔍 Looking for Webhook Trigger/Input...");

                // Wait for the dashboard to load
                await page.waitForSelector("text=Webhook", { timeout: 30000 }).catch(() => null);

                // Try to find the webhook URL in the DOM
                const webhookUrl = await page.evaluate(() => {
                    const elements = Array.from(document.querySelectorAll("*"));
                    const webhookMatch = elements.find((el) =>
                        el.textContent?.includes("https://api.gumloop.com/v1/webhook/")
                    );
                    return webhookMatch
                        ? webhookMatch.textContent?.match(
                              /https:\/\/api\.gumloop\.com\/v1\/webhook\/[a-zA-Z0-9_-]+/
                          )?.[0]
                        : null;
                });

                if (webhookUrl) {
                    console.log(`✅ FOUND WEBHOOK URL: ${webhookUrl}`);
                    return webhookUrl;
                } else {
                    console.log(
                        "⚠️ Webhook URL not immediately visible. Attempting to click 'Add Trigger'..."
                    );
                    // Attempt to click 'Add Trigger' if visible
                    const addTrigger = await page.$("text=Add Trigger");
                    if (addTrigger) {
                        await addTrigger.click();
                        await page.waitForTimeout(2000);
                        // Check for Webhook option
                        const webhookOption = await page.$("text=Webhook");
                        if (webhookOption) await webhookOption.click();
                    }
                    return "MANUAL_CHECK_REQUIRED_SEE_SCREENSHOT";
                }
            }
        );

        console.log("\n--- SCRAPE RESULT ---");
        console.log(JSON.stringify(result, null, 2));
        console.log("---------------------\n");
    } catch (error: any) {
        console.error("❌ Scraper failed:", error.message);
    } finally {
        await operator.close();
    }
}

scrapeGumloop();
