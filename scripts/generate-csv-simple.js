const fs = require('fs');
const path = require('path');

const DOMAIN = "https://amritmilk.com";
const BRAND = "Amrit Milk";
const CONDITION = "new";
const GOOGLE_PRODUCT_CATEGORY = "Food, Beverages & Tobacco > Food Items > Dairy Products";

function escapeCSV(val) {
    if (!val) return "";
    const cleaned = val.replace(/"/g, '""').replace(/\n/g, " ").replace(/\r/g, "");
    return `"${cleaned}"`;
}

const productsPath = path.join(__dirname, '..', 'src', 'lib', 'products.ts');
const content = fs.readFileSync(productsPath, 'utf8');

// Use a simpler regex to find the start and end of the products array
const startMarker = 'export const products: Product[] = [';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find products array start');
    process.exit(1);
}

// Find the closing bracket of the products array
let balance = 0;
let endIndex = -1;
for (let i = startIndex + startMarker.length - 1; i < content.length; i++) {
    if (content[i] === '[') balance++;
    else if (content[i] === ']') {
        balance--;
        if (balance === 0) {
            endIndex = i + 1;
            break;
        }
    }
}

if (endIndex === -1) {
    console.error('Could not find products array end');
    process.exit(1);
}

let productsStr = content.substring(startIndex + startMarker.length - 1, endIndex);

// Basic cleanup to make it eval-able (remove comments and complex logic)
productsStr = productsStr.replace(/\/\/.*$/gm, '');

// Evaluate the string (carefully)
let products = [];
try {
    // We need to define symbols that might be in the file
    const Product = {};
    products = eval(productsStr);
} catch (e) {
    console.error('Error evaluating products string:', e.message);
    process.exit(1);
}

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
    const description = p.description;
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
        escapeCSV("IN:0 INR"),
        escapeCSV("no")
    ].join(",");
});

const csvContent = [headers.join(","), ...rows].join("\n");
const outputPath = path.join(__dirname, '..', 'public', 'products_merchant_center.csv');

fs.writeFileSync(outputPath, csvContent);
console.log(`✅ CSV generated successfully at ${outputPath}`);
