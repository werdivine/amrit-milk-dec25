const { chromium } = require("@playwright/test");

(async () => {
    console.log("Launching Amrit Interactive Browser (Low Resource Mode)...");
    console.log(
        "Optimizations Enabled: GPU Disabled, Memory Capped, Background Networking Disabled"
    );

    const browser = await chromium.launch({
        headless: false, // Keeping visible for interaction, but heavily optimized
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu", // Critical for low resource
            "--disable-dev-shm-usage",
            "--single-process",
            "--disable-background-networking",
            "--disable-default-apps",
            "--disable-sync",
            "--disable-translate",
            "--no-first-run",
            "--memory-pressure-off",
            "--disable-features=TranslateUI,VizDisplayCompositor",
            '--js-flags="--max-old-space-size=256"', // Hard memory cap
        ],
    });
    const context = await browser.newContext({
        viewport: null,
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000");

    console.log("Browser is open. Close this terminal to exit.");

    // Keep the process alive
    await new Promise(() => {});
})();
