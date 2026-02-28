import { chromium } from 'playwright';
import * as fs from 'fs';

(async () => {
    console.log("Starting browser...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log("Loading http://localhost:3000 ...");
    await page.goto(`http://localhost:3000`, { timeout: 120000 }); // 2 minutes stringently
    await page.waitForLoadState("networkidle", { timeout: 120000 });
    await page.waitForTimeout(5000);

    let shadowHTML = await page.evaluate(() => {
        const bp = document.getElementById('bp-web-widget');
        if (bp && bp.shadowRoot) return bp.shadowRoot.innerHTML;
        return "NO WIDGET/NO SHADOW ROOT";
    });
    fs.writeFileSync('shadow-closed.html', shadowHTML);
    console.log("Wrote shadow-closed.html");

    await page.evaluate(() => {
        const bp = document.getElementById('bp-web-widget');
        if (bp && bp.shadowRoot) {
            // Find ALL elements and look for button logic or just click the first button
            const btn = bp.shadowRoot.querySelector('button');
            if (btn) btn.click();
        }
    });

    await page.waitForTimeout(3000);

    let shadowOpenHTML = await page.evaluate(() => {
        const bp = document.getElementById('bp-web-widget');
        if (bp && bp.shadowRoot) return bp.shadowRoot.innerHTML;
        return "NO WIDGET/NO SHADOW ROOT";
    });
    fs.writeFileSync('shadow-open.html', shadowOpenHTML);
    console.log("Wrote shadow-open.html");

    // Also capture full page HTML to debug
    fs.writeFileSync('full-page.html', await page.content());

    await browser.close();
    console.log("Dumps complete!");
})();
