/**
 * Seed Coupons to Sanity
 * Run: npx tsx scripts/seed-sanity-coupons.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fqzgs92z",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
});

const coupons = [
    { code: "IBS20", type: "percentage", value: 20, description: "IBS Special 20% Off" },
    { code: "CMS25", type: "percentage", value: 25, description: "CMS Special 25% Off" },
    { code: "FRIENDS30", type: "percentage", value: 30, description: "Friends 30% Off" },
    { code: "AMRIT5", type: "percentage", value: 5, description: "Amrit 5% Off" },
    { code: "AMRIT10", type: "percentage", value: 10, description: "Amrit 10% Off" },
    { code: "AMRIT15", type: "percentage", value: 15, description: "Amrit 15% Off" },
    { code: "AMRIT20", type: "percentage", value: 20, description: "Amrit 20% Off" },
    { code: "GAGAN30", type: "percentage", value: 30, description: "Gagan 30% Off" },
    { code: "WELCOME10", type: "percentage", value: 10, description: "Welcome 10% Off" },
];

async function main() {
    if (!process.env.SANITY_WRITE_TOKEN) {
        console.error("Error: SANITY_WRITE_TOKEN is required");
        console.log("Set it in your .env file or run:");
        console.log(
            "$env:SANITY_WRITE_TOKEN='your-token-here'; npx tsx scripts/seed-sanity-coupons.ts"
        );
        process.exit(1);
    }

    console.log("Seeding coupons to Sanity...\n");

    for (const c of coupons) {
        try {
            // Check if coupon already exists
            const existing = await client.fetch(`*[_type == "coupon" && code == $code][0]`, {
                code: c.code,
            });

            if (existing) {
                console.log(`⏭️  ${c.code} already exists, skipping`);
                continue;
            }

            await client.create({
                _type: "coupon",
                code: c.code,
                type: c.type,
                value: c.value,
                minOrderValue: 0,
                isActive: true,
                description: c.description,
                usageCount: 0,
            });
            console.log(`✅ Created ${c.code}`);
        } catch (e: any) {
            console.error(`❌ Error creating ${c.code}:`, e.message);
        }
    }

    console.log("\nDone! You can now manage coupons in Sanity Studio.");
}

main();
