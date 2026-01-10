import { Browser, BrowserContext, chromium, Page } from "playwright";

/**
 * Sovereign Browser L5 - The Apex Autonomous Operator
 */
export class SovereignOperator {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;

    async init(userDataDir?: string) {
        if (userDataDir) {
            console.log(`📂 Booting with existing profile: ${userDataDir}`);
            this.context = await chromium.launchPersistentContext(userDataDir, {
                channel: "chrome",
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
            });
        } else {
            this.browser = await chromium.launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
            });
            this.context = await this.browser.newContext({
                viewport: { width: 1440, height: 900 },
                userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            });
        }
    }

    async performTask(url: string, selectorTask: (page: Page) => Promise<any>): Promise<any> {
        if (!this.context) await this.init();
        const page = await this.context!.newPage();

        try {
            console.log(`🚀 Sovereign navigating to ${url}...`);
            await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });

            const result = await selectorTask(page);

            const screenshotPath = `sovereign_action_${Date.now()}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });

            return {
                result,
                screenshot: screenshotPath,
                status: "TASK_COMPLETE",
            };
        } catch (error: any) {
            console.error("❌ Sovereign Task Failure:", error.message);
            throw error;
        } finally {
            await page.close();
        }
    }

    async close() {
        if (this.browser) await this.browser.close();
        else if (this.context) await (this.context as any).close();
    }
}
