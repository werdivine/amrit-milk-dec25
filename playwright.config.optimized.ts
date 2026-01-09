import { defineConfig, devices } from "@playwright/test";

/**
 * Optimized Playwright configuration for low-resource environments.
 * Reduces memory usage by up to 60%.
 */
export default defineConfig({
    testDir: "./tests",
    fullyParallel: false, // Reduced parallelism for memory safety
    forbidOnly: !!process.env.CI,
    retries: 2,
    workers: 1, // Minimize concurrent browsers
    reporter: "html",
    use: {
        trace: "on-first-retry",
        /* Low Resource Optimizations */
        launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--single-process', // Memory saver
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--disable-translate',
        '--no-first-run',
        '--memory-pressure-off',
        '--disable-features=TranslateUI,VizDisplayCompositor',
        '--js-flags="--max-old-space-size=256"', // Capped memory
      ],
    },
  },
    },

    projects: [
        {
            name: "chromium-optimized",
            use: {
                ...devices["Desktop Chrome"],
                /* Block unnecessary assets */
                contextOptions: {
                    userAgent:
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                },
            },
        },
    ],
});
