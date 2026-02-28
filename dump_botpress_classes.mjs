import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 });

    const result = await page.evaluate(async () => {
        await new Promise(r => setTimeout(r, 5000)); // wait for botpress

        let fabRoot = document.getElementById('fab-root');
        if (!fabRoot || !fabRoot.shadowRoot) return "NO FAB ROOT";

        const shadow = fabRoot.shadowRoot;

        // Find trigger inside shadow
        const trigger = shadow.querySelector('.bpFab');
        if (!trigger) return "FAB FOUND BUT NO .bpFab TRIGGER: " + shadow.innerHTML.substring(0, 500);

        // We will return class names to be sure
        return "Trigger class: " + trigger.className + "\nTrigger html: " + trigger.outerHTML;
    });

    console.log(result);
    // Click it and find header
    const headerResult = await page.evaluate(async () => {
        let fabRoot = document.getElementById('fab-root');
        const shadow = fabRoot.shadowRoot;
        const trigger = shadow.querySelector('.bpFab');
        trigger.click(); // OPEN it!

        await new Promise(r => setTimeout(r, 2000)); // wait open animation

        const header = shadow.querySelector('.bpHeaderContainer') || shadow.querySelector('[class*="Header"]');
        if (!header) return "NO HEADER FOUND: " + shadow.innerHTML.substring(0, 1000);

        return "Header html: " + header.outerHTML;
    });
    console.log(headerResult);

    await browser.close();
})();
