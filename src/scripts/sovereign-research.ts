import * as fs from "fs";
import { SovereignOperator } from "../lib/sovereign-operator";

async function researchAlternatives() {
    console.log("🌌 SOVEREIGN RESEARCH: INITIATING AUTOMATION TOOLS AUDIT...");

    const operator = new SovereignOperator();
    const researchGoal =
        "Find no-code automation tools with generous free tiers and easy webhook integration.";

    try {
        await operator.init();

        const result = await operator.performTask(
            "https://www.google.com/search?q=best+no-code+automation+platforms+2025+free+tier+webhook",
            async (page) => {
                console.log("🌐 Researching market landscape...");

                // Extract top competing tools from search results
                const tools = await page.evaluate(() => {
                    const results = Array.from(document.querySelectorAll("h3"));
                    return results.slice(0, 10).map((r) => r.textContent);
                });

                console.log("🔍 Identified candidates:", tools.join(", "));

                // Targeted research on Pipedream (known for generous free tier)
                await page.goto("https://pipedream.com/pricing", { waitUntil: "networkidle" });
                const pipedreamPricing = await page.evaluate(() => {
                    return document.querySelector("body")?.innerText.substring(0, 1500);
                });

                // Targeted research on Make.com
                await page.goto("https://www.make.com/en/pricing", { waitUntil: "networkidle" });
                const makePricing = await page.evaluate(() => {
                    return document.querySelector("body")?.innerText.substring(0, 1500);
                });

                return {
                    query: "Gumloop Alternatives",
                    tools_identified: tools,
                    pipedream_audit: pipedreamPricing,
                    make_audit: makePricing,
                };
            }
        );

        const reportPath = "sovereign_research_report.json";
        fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
        console.log(`✅ Research complete. Report saved: ${reportPath}`);
    } catch (error: any) {
        console.error("❌ Research failure:", error.message);
    } finally {
        await operator.close();
    }
}

researchAlternatives();
