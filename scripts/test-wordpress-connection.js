// @ts-check
const fetch = require("node-fetch"); // Ensure node-fetch is available or use global fetch if Node 18+

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

async function testConnection() {
    if (!WP_URL) {
        console.error("❌ NEXT_PUBLIC_WORDPRESS_URL is not set in environment.");
        return;
    }

    console.log(`Testing connection to: ${WP_URL}`);

    try {
        console.log("1. Fetching Products...");
        const productsUrl = `${WP_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`;
        // Note: WC requires auth usually, but some public endpoints might exist.
        // If consumer keys are missing, it might fail for WC.

        const pRes = await fetch(productsUrl);
        if (pRes.ok) {
            const products = await pRes.json();
            console.log(`✅ Success! Found ${products.length} products.`);
            if (products.length > 0) console.log(`   Sample: ${products[0].name}`);
        } else {
            console.error(`❌ Products fetch failed: ${pRes.status} ${pRes.statusText}`);
            const text = await pRes.text();
            console.error(`   Response: ${text.substring(0, 200)}...`);
        }

        console.log("\n2. Fetching Posts...");
        const postsUrl = `${WP_URL}/wp-json/wp/v2/posts`;
        const bRes = await fetch(postsUrl);
        if (bRes.ok) {
            const posts = await bRes.json();
            console.log(`✅ Success! Found ${posts.length} posts.`);
            if (posts.length > 0) console.log(`   Sample: ${posts[0].title.rendered}`);
        } else {
            console.error(`❌ Posts fetch failed: ${bRes.status} ${bRes.statusText}`);
        }
    } catch (error) {
        console.error("❌ Connection failed with error:", error);
    }
}

testConnection();
