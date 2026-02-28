import { chromium } from 'playwright';
import * as fs from 'fs';

(async () => {
    try {
        console.log("Starting browser...");
        const browser = await chromium.launch({ headless: true, args: ['--disable-web-security'] });
        const page = await browser.newPage();
        
        console.log("Loading file:// ...");
        await page.goto(`file:///C:/CLIENT-WORK/amrit-nextjs/test.html`);
        await page.waitForTimeout(5000); 

        const shadowHTML = await page.evaluate(() => {
            const bp = document.getElementById('bp-web-widget');
            if (bp && bp.shadowRoot) return bp.shadowRoot.innerHTML;
            return "NO WIDGET/NO SHADOW ROOT";
        });
        fs.writeFileSync('shadow-closed.html', shadowHTML);

        await page.evaluate(() => {
            const bp = document.getElementById('bp-web-widget');
            if (bp && bp.shadowRoot) {
                // Find ALL elements and look for button logic or just click the first button
                const btn = bp.shadowRoot.querySelector('button');
                if (btn) btn.click();
            }
        });
        
        await page.waitForTimeout(3000);

        const shadowOpenHTML = await page.evaluate(() => {
            const bp = document.getElementById('bp-web-widget');
            if (bp && bp.shadowRoot) return bp.shadowRoot.innerHTML;
            return "NO WIDGET/NO SHADOW ROOT";
        });
        fs.writeFileSync('shadow-open.html', shadowOpenHTML);
        
        await browser.close();
        console.log("Dumps complete!");
    } catch(err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
})();
