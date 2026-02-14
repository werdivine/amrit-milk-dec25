import { products } from "../src/lib/products";
import * as fs from "fs";
import * as path from "path";

// Configuration for Merchant Center
const DOMAIN = "https://amritmilkorganic.com";
const BRAND = "Amrit Milk";
const CONDITION = "new";

// Google Product Taxonomy Mapping
const CATEGORY_MAP: Record<string, string> = {
    "Ghee": "Food, Beverages & Tobacco > Food Items > Dairy Products",
    "Dairy": "Food, Beverages & Tobacco > Food Items > Dairy Products",
    "Cold-Pressed Oils": "Food, Beverages & Tobacco > Food Items > Cooking & Baking Ingredients > Edible Oils",
    "Atta": "Food, Beverages & Tobacco > Food Items > Cooking & Baking Ingredients > Flour",
    "Honey": "Food, Beverages & Tobacco > Food Items > Sweeteners > Honey",
    "Essential Oils": "Home & Garden > Decor > Home Fragrances > Essential Oils",
    "Other": "Food, Beverages & Tobacco > Food Items > Condiments & Sauces > Spices & Herbs"
};

function escapeCSV(val: string): string {
    if (!val) return "";
    // Clean string: remove quotes, newlines, and tabs (since we use TSV)
    const cleaned = val.toString().replace(/"/g, '""').replace(/\t/g, " ").replace(/\n/g, " ").replace(/\r/g, "");
    return cleaned;
}

function generateCSV() {
    // Exact 38 headers provided by user
    const headers = [
        "id", "title", "description", "availability", "availability date",
        "expiration date", "link", "mobile link", "image link", "price",
        "sale price", "sale price effective date", "identifier exists",
        "gtin", "mpn", "brand", "product highlight", "product detail",
        "additional image link", "condition", "adult", "color", "size",
        "size type", "size system", "gender", "material", "pattern",
        "age group", "multipack", "is bundle", "unit pricing measure",
        "unit pricing base measure", "energy efficiency class",
        "min energy efficiency class", "min energy efficiency class",
        "item group id", "sell on google quantity"
    ];

    const rows = products.map(p => {
        const id = p.sku || p.id;
        const title = p.title;
        const description = (p.description + " " + (p.highlights?.join(". ") || "")).substring(0, 5000);
        const link = `${DOMAIN}/products/${p.slug}`;
        const image_link = p.image.startsWith("http") ? p.image : `${DOMAIN}${p.image}`;

        // Availability: "in stock"
        const availability = "in stock";

        // Price: formatted as value + INR
        const priceVal = parseFloat(p.price.replace("₹", "").replace(",", "").trim());
        const price = Math.round(priceVal) + " INR";

        // 38 columns mapping - strictly following user's sequence
        const columns = new Array(38).fill("");

        columns[0] = escapeCSV(id);                    // 1: id
        columns[1] = escapeCSV(title);                 // 2: title
        columns[2] = escapeCSV(description);           // 3: description
        columns[3] = escapeCSV(availability);          // 4: availability
        columns[6] = escapeCSV(link);                  // 7: link
        columns[8] = escapeCSV(image_link);            // 9: image link
        columns[9] = escapeCSV(price);                 // 10: price
        columns[12] = escapeCSV("no");                 // 13: identifier exists
        columns[15] = escapeCSV(BRAND);                // 16: brand
        columns[19] = escapeCSV(CONDITION);            // 20: condition
        columns[20] = escapeCSV("no");                 // 21: adult

        return columns.join("\t");
    });

    // Generate TSV content (Merchant Center accepts .csv with tabs or .tsv)
    const tsvContent = [headers.join("\t"), ...rows].join("\n");
    const outputPath = path.join(process.cwd(), "public", "products_merchant_center.csv");

    fs.writeFileSync(outputPath, tsvContent);
    console.log(`✅ File generated successfully at ${outputPath}`);
}

generateCSV();
