import fs from "fs";
import path from "path";

// Manually verify and load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading env from:", envPath);

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    const lines = envConfig.split(/\r?\n|\r/);
    lines.forEach((line) => {
        // Basic parsing, handling comments and empty lines
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("#")) return;

        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1);
            }
            console.log(`Setting env var: [${key}]`);
            process.env[key] = value;
        }
    });
} else {
    console.error(".env.local file not found!");
}

async function testBlueDartAuth() {
    console.log("Importing BlueDart service...");
    // Dynamic import to ensure env vars are loaded first
    try {
        const { blueDartService } = await import("../src/lib/services/bluedart");

        console.log("Testing BlueDart Authentication...");
        console.log("Using API URL:", process.env.BLUEDART_API_URL);
        console.log("Client ID Present:", !!process.env.BLUEDART_CLIENT_ID);

        try {
            const token = await blueDartService.authenticate();
            console.log("Successfully authenticated!");
            console.log("Token:", token.substring(0, 20) + "...");
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    } catch (err) {
        console.error("Error importing service:", err);
    }
}

testBlueDartAuth();
