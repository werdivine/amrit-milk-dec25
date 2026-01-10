import { execSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { chromium } from "playwright";

async function forceBridge() {
    console.log("🦾 INITIATING FORCE BRIDGE (COPY PROTOCOL)...");

    const sourceDir = path.join(os.homedir(), "AppData", "Local", "Google", "Chrome", "User Data");
    const destDir = path.join(os.tmpdir(), "chrome_profile_bridge");

    try {
        if (fs.existsSync(destDir)) {
            console.log("Cleaning old bridge profile...");
            fs.rmSync(destDir, { recursive: true, force: true });
        }

        console.log("🔄 Copying active profile (this bypasses the lock)...");
        // Using robocopy for fast, reliable copy on Windows
        try {
            execSync(
                `robocopy "${sourceDir}" "${destDir}" /E /MT /R:0 /W:0 /XF "Parent.lock" "lockfile"`,
                { stdio: "ignore" }
            );
        } catch (e) {
            // Robocopy returns non-zero codes for success (e.g. 1 means files copied)
        }

        console.log("🚀 Launching Sovereign Browser with Bridged Profile...");
        const browser = await chromium.launchPersistentContext(destDir, {
            channel: "chrome",
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
        });

        const page = await browser.newPage();

        console.log("Step 1: Inspecting Gumloop Dashboard...");
        await page.goto("https://www.gumloop.com/dashboard", {
            waitUntil: "networkidle",
            timeout: 90000,
        });

        const url = page.url();
        console.log(`Current URL: ${url}`);

        await page.screenshot({ path: "force_bridge_gumloop.png" });

        if (url.includes("login")) {
            console.log(
                "🛑 Still hit login. This means the session isn't in the copied profile or requires re-auth."
            );
        } else {
            console.log("✅ SUCCESS: Bridged into Gumloop session!");
            // Extract webhook logic here
        }

        await browser.close();
    } catch (error) {
        console.error("❌ Force Bridge failure:", error);
    }
}

forceBridge();
