/**
 * Export Products from products.ts to JSON format
 *
 * Usage: npx tsx scripts/export-products.ts
 */

import { products } from "../src/lib/products";
import * as fs from "fs";
import * as path from "path";

const outputPath = path.join(__dirname, "products-export.json");

fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));

console.log(`✅ Exported ${products.length} products to ${outputPath}`);
