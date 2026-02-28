const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Log console messages from the page to debug
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

    console.log("Navigating to localhost:3000...");
    await page.goto('http://localhost:3000', { waitUntil: 'load' });

    console.log("Waiting for network idle...");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log("Taking initial screenshot (1-initial.png)...");
    await page.screenshot({ path: '1-initial.png' });

    const shadowStatus = await page.evaluate(() => {
        const bp = document.getElementById('bp-web-widget');
        if (!bp) return "NO WIDGET";
        if (!bp.shadowRoot) return "NO SHADOW ROOT";
        return bp.shadowRoot.innerHTML ? "HAS HTML" : "EMPTY HTML";
    });
    console.log("Initial Shadow DOM status:", shadowStatus);

    console.log("Clicking trigger...");
    await page.evaluate(() => {
        const bp = document.getElementById('bp-web-widget');
        if (bp && bp.shadowRoot) {
            const trigger = bp.shadowRoot.querySelector('.bp-widget-trigger') ||
                bp.shadowRoot.querySelector('.bpTrigger') ||
                bp.shadowRoot.querySelector('button');
            if (trigger) {
                console.log("Found trigger! Clicking it...");
                trigger.click();
            } else {
                console.log("Could not find trigger inside shadow root!");
            }
        }
    });

    await page.waitForTimeout(2000);
    console.log("Taking open screenshot (2-open.png)...");
    await page.screenshot({ path: '2-open.png' });

    // Check if the custom wa button exists
    const injectedData = await page.evaluate(() => {
        const bp = document.getElementById('bp-web-widget');
        if (!bp || !bp.shadowRoot) return { wa: false, text: false };
        const wa = bp.shadowRoot.getElementById('custom-wa-btn');
        const text = bp.shadowRoot.getElementById('bp-custom-label');
        return {
            waFound: !!wa,
            textFound: !!text,
            hasHeader: !!bp.shadowRoot.querySelector('.bpContainer .bpHeader')
        };
    });
    console.log("Injected elements check:", injectedData);

    await page.waitForTimeout(3000);
    console.log("Taking later screenshot (3-later.png)...");
    await page.screenshot({ path: '3-later.png' });

    await browser.close();
    console.log("Done.");
})();
