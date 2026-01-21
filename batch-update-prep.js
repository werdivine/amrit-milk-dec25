// Batch Product Data Update Script
// This script contains all remaining product data to be added

const remainingProductData = {
    "atta-wheat-1kg": {
        highlights: [
            "100% whole wheat stone-ground atta (chakki-ground)",
            "Retains bran, germ, and endosperm for maximum nutrition",
            "Soft, fluffy rotis with traditional taste",
            "No maida mixing | No preservatives | Fresh-ground weekly",
        ],
        ingredients: ["Pure Organic Whole Wheat Grains (Triticum aestivum)"],
        benefits: [
            "Rich in dietary fiber for digestive health",
            "High in B-vitamins, iron, and magnesium",
            "Supports heart health and blood sugar regulation",
            "Ideal for daily rotis, parathas, and baking",
            "Provides sustained energy and satiety",
        ],
        howToUse: [
            "Knead with water to make soft dough for rotis",
            "Use for making parathas, puris, and traditional breads",
            "Ideal for baking cookies, cakes, and healthy snacks",
            "Store in airtight container, use within 2-3 months",
        ],
    },
};

console.log("Batch data prepared for", Object.keys(remainingProductData).length, "products");
