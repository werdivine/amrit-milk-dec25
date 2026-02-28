import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 });

    // Check if fab-root or bp-web-widget exists
    const result = await page.evaluate(async () => {
        // give botpress 5 seconds
        await new Promise(r => setTimeout(r, 5000));

        let fabRoot = document.getElementById('fab-root');
        let bpWebWidget = document.getElementById('bp-web-widget');

        let report = "";
        if (fabRoot) report += "fab-root found (shadow: " + !!fabRoot.shadowRoot + ")\n";
        else report += "fab-root NOT found\n";

        if (bpWebWidget) report += "bp-web-widget found (shadow: " + !!bpWebWidget.shadowRoot + ")\n";
        else report += "bp-web-widget NOT found\n";

        // try looking for anything with shadowRoot
        const allEle = Array.from(document.body.querySelectorAll('*'));
        report += "Other shadow hosts: " + allEle.filter(e => e.shadowRoot).map(e => e.id || e.tagName).join(', ') + "\n";

        return report;
    });

    console.log(result);
    await browser.close();
})();
