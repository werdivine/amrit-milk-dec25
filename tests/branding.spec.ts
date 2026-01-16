import { expect, test } from "@playwright/test";

test.describe("Amrit Website Enhancements", () => {
    test.beforeEach(async ({ page }) => {
        // Increase default timeout for slow dev server/animations
        test.setTimeout(60000);
        await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    });

    test("Hero Slider should have visible arrows and content", async ({ page }) => {
        // Check if arrows are visible
        const prevBtn = page.locator('button[aria-label="Previous slide"]');
        const nextBtn = page.locator('button[aria-label="Next slide"]');

        await expect(prevBtn).toBeVisible({ timeout: 10000 });
        await expect(nextBtn).toBeVisible({ timeout: 10000 });

        // Check for Slide 1 text with increased timeout for fade-in
        await expect(page.getByText("Vedic Bilona Ghee")).toBeVisible({ timeout: 15000 });
    });

    test("Branding: Non-dairy products prefixes", async ({ page }) => {
        await page.goto("http://localhost:3000/products", { waitUntil: "networkidle" });

        // Use toHaveText with regex for better reliability
        const body = page.locator("body");
        await expect(body).toContainText(/Amrit Organic Multiflora Honey/, { timeout: 15000 });
        await expect(body).toContainText(/Amrit Organic Turmeric/, { timeout: 15000 });
        await expect(body).toContainText(/Amrit Organic Jaggery/, { timeout: 15000 });
        await expect(body).toContainText(/Amrit Organic Cow Manure/, { timeout: 15000 });
    });

    test("Branding: Dairy products prefixes", async ({ page }) => {
        await page.goto("http://localhost:3000/products", { waitUntil: "networkidle" });
        await expect(page.locator("body")).toContainText(/Amrit Milk Organic A2 Cow Ghee/, {
            timeout: 15000,
        });
    });

    test("Product Catalog UI: Categories Layout", async ({ page }) => {
        await page.goto("http://localhost:3000/products", { waitUntil: "networkidle" });

        const categoryContainer = page.locator("section.sticky div.flex.gap-3");
        await expect(categoryContainer).toBeVisible({ timeout: 10000 });

        // Direct class checks
        const containerClasses = await categoryContainer.getAttribute("class");
        expect(containerClasses).toContain("flex-nowrap");
        expect(containerClasses).toContain("overflow-x-auto");

        const firstBtn = categoryContainer.locator("button").first();
        await expect(firstBtn).toHaveClass(/text-xs/);
    });
});
