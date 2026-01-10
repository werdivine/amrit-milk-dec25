import { SovereignBrowser } from "../lib/autonomous-browser-driver";

async function runTask() {
    const url = process.argv[2] || "https://amritmilkorganic.com";
    const task = process.argv[3] || "General Audit";

    console.log(`🚀 Sovereign Task Runner Initialized.`);
    console.log(`Target: ${url}`);
    console.log(`Goal: ${task}`);

    const driver = new SovereignBrowser();
    try {
        const result = await driver.execute(url, task);
        console.log("\n--- TASK RESULT ---");
        console.log(JSON.stringify(result, null, 2));
        console.log("-------------------\n");
    } catch (error) {
        console.error("❌ Task failed:", error);
    } finally {
        await driver.close();
    }
}

runTask();
