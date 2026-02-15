const { createClient } = require("@sanity/client");

const client = createClient({
    projectId: "fqzgs92z",
    dataset: "production",
    token: "skhtazg6LKVr87QfX1Nh1SCBvcUOBRIHoAqAhdMuWQD6Q3ogT8UVpon0Dxw1bsYdbw6r3MP110BiC869qlT095HGNzEMddCXRBuSiwqLIat1ENE3mSQBXH9SczRPUjEvhybRo47CmJWp72Ax2y8wNhVutXBV7Vtka2LkDXkd1tIefOYqBK8m",
    useCdn: false,
    apiVersion: "2023-05-03",
});

async function migrate() {
    try {
        console.log("Starting migration...");

        // 1. CONSOLIDATE GHEE
        // We will use the 1kg product as the base and add 500ml variant to it.
        console.log("Migrating Ghee...");
        await client
            .patch("product-a2-cow-ghee-1kg")
            .set({
                title: "Amrit Milk Organic A2 Cow Ghee", // Generalized title
                variants: [
                    {
                        title: "500 ml",
                        price: 1350,
                        regularPrice: 1500, // Estimated/Placeholder
                        sku: "GHEE-500",
                        subscription: true,
                        _key: "var-500ml",
                    },
                    {
                        title: "1 L", // Using 1 L label for consistency or 1 kg
                        price: 2500,
                        regularPrice: 2800,
                        sku: "GHEE-1KG",
                        subscription: true,
                        _key: "var-1kg",
                    },
                ],
            })
            .commit();
        console.log("Ghee migrated.");

        // 2. MIGRATE ALL OTHER CATEGORIES
        // Define patterns for default variants
        const rules = [
            { type: "Milk", unit: "1 L", keywords: ["milk", "dairy", "buttermilk"] },
            { type: "Oil", unit: "1 L", keywords: ["oil"] }, // 1L oils
            {
                type: "Small Oil",
                unit: "10 ml",
                keywords: ["oil-10ml", "dropper", "roll-on", "spray"],
            }, // Essential oils/wellness
            {
                type: "KG Items",
                unit: "1 kg",
                keywords: [
                    "ghee",
                    "atta",
                    "rice",
                    "flour",
                    "honey",
                    "jaggery",
                    "grains",
                    "pulses",
                    "turmeric",
                ],
            },
            {
                type: "Pieces",
                unit: "1 Pack",
                keywords: ["combo", "pack", "duo", "trio", "cake", "upla", "manure"],
            },
        ];

        const allProducts = await client.fetch(`*[_type == "product" && !defined(variants)]`);
        console.log(`Found ${allProducts.length} pending products to migrate.`);

        for (const p of allProducts) {
            const lowerTitle = p.title.toLowerCase();
            const lowerCat = (p.category || "").toLowerCase();

            let unit = "1 Unit"; // Default

            // Determine unit based on rules
            if (
                lowerTitle.includes("10ml") ||
                lowerTitle.includes("roll-on") ||
                lowerTitle.includes("dropper") ||
                lowerTitle.includes("spray")
            ) {
                unit = "10 ml";
            } else if (
                lowerTitle.includes("1l") ||
                lowerCat.includes("oil") ||
                lowerCat.includes("dairy")
            ) {
                unit = "1 L";
            } else if (lowerTitle.includes("500g")) {
                unit = "500 g";
            } else if (
                lowerTitle.includes("1kg") ||
                lowerCat.includes("atta") ||
                lowerCat.includes("rice") ||
                lowerCat.includes("honey") ||
                lowerCat.includes("sweets")
            ) {
                unit = "1 kg";
            } else if (lowerTitle.includes("pcs")) {
                unit = "Pack";
            } else if (lowerCat.includes("combo")) {
                unit = "1 Pack";
            }

            console.log(`Migrating ${p.title} -> ${unit}`);

            await client
                .patch(p._id)
                .set({
                    variants: [
                        {
                            title: unit,
                            price: p.price,
                            sku: p.sku || `${p.slug}-${unit.replace(/\s+/g, "")}`,
                            subscription: true,
                            _key: `var-${unit.replace(/\s+/g, "").toLowerCase()}`,
                        },
                    ],
                })
                .commit();
        }

        console.log("Global migration complete!");
    } catch (error) {
        console.error("Migration failed:", error.message);
    }
}

migrate();
