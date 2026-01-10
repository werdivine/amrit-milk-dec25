import * as os from "os";
import * as path from "path";
import { SovereignOperator } from "../lib/sovereign-operator";

async function forceWebhookExtraction() {
    console.log("🦾 SOVEREIGN L5: INITIATING FORCE WEBHOOK EXTRACTION...");

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

        // This task will scour the Gumloop page source for anything matching the webhook pattern
        const result = await operator.performTask(
            "https://www.gumloop.com/dashboard",
            async (page) => {
                console.log("🌐 Page Loaded. Scanning DOM for secrets...");

                // Wait for any network activity to settle
                await page.waitForTimeout(5000);

                const content = await page.content();

                // Search for Gumloop Webhook pattern
                const webhookRegex = /https:\/\/api\.gumloop\.com\/v1\/webhook\/[a-zA-Z0-9_-]+/g;
                const matches = content.match(webhookRegex);

                if (matches && matches.length > 0) {
                    console.log(`✅ DISCOVERED ${matches.length} WEBHOOK CANDIDATES:`);
                    matches.forEach((m, i) => console.log(`  [${i}] ${m}`));
                    return matches;
                } else {
                    console.log("⚠️ No direct URL matches found in page source.");
                    // Try to find the specific element from the user's screenshot
                    const webhookInput = await page.$("text=Webhook Input");
                    if (webhookInput) {
                        console.log("📍 Found 'Webhook Input' block. Attempting to click...");
                        await webhookInput.click();
                        await page.waitForTimeout(3000);
                        const freshContent = await page.content();
                        const freshMatches = freshContent.match(webhookRegex);
                        if (freshMatches) return freshMatches;
                    }
                    return "EXTRACTION_FAILED_DOM_DUMP_SAVED";
                }
            }
        );

        console.log("\n--- EXTRACTION AUDIT ---");
        console.log(JSON.stringify(result, null, 2));
        console.log("-----------------------\n");
    } catch (error: any) {
        console.error("❌ Force Extraction failure:", error.message);
    } finally {
        await operator.close();
    }
}

forceWebhookExtraction();
