/**
 * Amrit Interactive Browser Launcher
 * Enhanced Playwright browser with persistent sessions and error handling.
 *
 * Usage:
 *   node launch_browser.js              # Default: localhost:3000
 *   node launch_browser.js <url>        # Custom URL
 *   node launch_browser.js --persist    # Enable persistent login sessions
 */

const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

const CONFIG = {
    defaultUrl: "http://localhost:3000",
    userDataDir: path.join(__dirname, "..", "browser-data"),
    viewport: { width: 1280, height: 800 },
    slowMo: 30,
};

const OPTIMIZATION_ARGS = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--single-process",
    "--disable-background-networking",
    "--disable-default-apps",
    "--disable-sync",
    "--disable-translate",
    "--no-first-run",
    "--memory-pressure-off",
    "--disable-features=TranslateUI,VizDisplayCompositor",
    "--disable-extensions",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--js-flags=--max-old-space-size=256",
];

async function launchBrowser(options = {}) {
    const { url = CONFIG.defaultUrl, persist = false, headless = false } = options;

    console.log("\n" + "=".repeat(60));
    console.log("🚀 Amrit Interactive Browser (Low Resource Mode)");
    console.log("=".repeat(60));
    console.log("✅ GPU: Disabled");
    console.log("✅ Memory: Capped at 256MB");
    console.log("✅ Background Networking: Disabled");
    console.log(`✅ Persistent Sessions: ${persist ? "Enabled" : "Disabled"}`);
    console.log("=".repeat(60) + "\n");

    let context;

    try {
        if (persist) {
            // Persistent context - saves cookies and login sessions
            if (!fs.existsSync(CONFIG.userDataDir)) {
                fs.mkdirSync(CONFIG.userDataDir, { recursive: true });
            }

            context = await chromium.launchPersistentContext(CONFIG.userDataDir, {
                headless,
                slowMo: CONFIG.slowMo,
                viewport: CONFIG.viewport,
                args: OPTIMIZATION_ARGS,
                ignoreHTTPSErrors: true,
            });

            console.log(`📁 Session data stored at: ${CONFIG.userDataDir}`);
        } else {
            // Standard context - no persistence
            const browser = await chromium.launch({
                headless,
                slowMo: CONFIG.slowMo,
                args: OPTIMIZATION_ARGS,
            });

            context = await browser.newContext({
                viewport: CONFIG.viewport,
                ignoreHTTPSErrors: true,
            });
        }

        // Get or create page
        const page = context.pages()[0] || (await context.newPage());

        // Navigate to URL
        console.log(`🌐 Navigating to: ${url}`);

        try {
            await page.goto(url, {
                waitUntil: "domcontentloaded",
                timeout: 30000,
            });
            console.log("✅ Page loaded successfully!");
        } catch (navError) {
            console.warn(`⚠️ Navigation warning: ${navError.message}`);
            console.log(
                "💡 Tip: If localhost:3000 isn't running, navigate manually in the browser."
            );
        }

        console.log("\n📋 Browser is ready for interaction.");
        console.log("💡 Press Ctrl+C in this terminal to close.\n");

        // Handle graceful shutdown
        const cleanup = async () => {
            console.log("\n👋 Shutting down browser...");
            try {
                await context.close();
                console.log("✅ Browser closed cleanly.");
            } catch (e) {
                console.log("⚠️ Browser was already closed.");
            }
            process.exit(0);
        };

        process.on("SIGINT", cleanup);
        process.on("SIGTERM", cleanup);

        // Keep process alive
        await new Promise(() => {});
    } catch (error) {
        console.error("\n❌ Browser launch failed:");
        console.error(error.message);

        if (error.message.includes("Executable doesn't exist")) {
            console.log("\n💡 Fix: Run 'npx playwright install chromium' to install the browser.");
        }

        process.exit(1);
    }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {
    url: CONFIG.defaultUrl,
    persist: false,
};

for (const arg of args) {
    if (arg === "--persist" || arg === "-p") {
        options.persist = true;
    } else if (arg === "--headless") {
        options.headless = true;
    } else if (!arg.startsWith("-")) {
        options.url = arg;
    }
}

launchBrowser(options);
