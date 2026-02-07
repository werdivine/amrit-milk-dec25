import { products } from "../src/lib/products";
import * as fs from "fs";
import * as path from "path";

// Configuration for Merchant Center
const DOMAIN = "https://amritmilk.com"; // Adjust if different
const BRAND = "Amrit Milk";
const CONDITION = "new";
const GOOGLE_PRODUCT_CATEGORY = "Food, Beverages & Tobacco > Food Items > Dairy Products"; // Default

function escapeCSV(val: string): string {
    if (!val) return "";
    const cleaned = val.replace(/"/g, '""').replace(/\n/g, " ").replace(/\r/g, "");
    return `"${cleaned}"`;
}

function generateCSV() {
    const headers = [
        "id",
        "title",
        "description",
        "link",
        "image_link",
        "availability",
        "price",
        "brand",
        "condition",
        "google_product_category",
        "shipping(country:price)",
        "identifier_exists"
    ];

    const rows = products.map(p => {
        const id = p.sku || p.id;
        const title = p.title;
        const description = p.description + " " + (p.highlights?.join(". ") || "");
        const link = `${DOMAIN}/products/${p.slug}`;
        const image_link = p.image.startsWith("http") ? p.image : `${DOMAIN}${p.image}`;
        const availability = "in stock";
        const price = p.price.replace("₹", "").trim() + " INR";
        
        return [
            escapeCSV(id),
            escapeCSV(title),
            escapeCSV(description),
            escapeCSV(link),
            escapeCSV(image_link),
            escapeCSV(availability),
            escapeCSV(price),
            escapeCSV(BRAND),
            escapeCSV(CONDITION),
            escapeCSV(GOOGLE_PRODUCT_CATEGORY),
            escapeCSV("IN:0 INR"), // Assuming free shipping or handled in Merchant Center
            escapeCSV("no") // Set to 'no' if you don't have GTIN/MPN for all
        ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const outputPath = path.join(process.cwd(), "public", "products_merchant_center.csv");
    
    fs.writeFileSync(outputPath, csvContent);
    console.log(`✅ CSV generated successfully at ${outputPath}`);
}

generateCSV();
