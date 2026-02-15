const { createClient } = require("@sanity/client");

const client = createClient({
    projectId: "fqzgs92z",
    dataset: "production",
    token: "skhtazg6LKVr87QfX1Nh1SCBvcUOBRIHoAqAhdMuWQD6Q3ogT8UVpon0Dxw1bsYdbw6r3MP110BiC869qlT095HGNzEMddCXRBuSiwqLIat1ENE3mSQBXH9SczRPUjEvhybRo47CmJWp72Ax2y8wNhVutXBV7Vtka2LkDXkd1tIefOYqBK8m",
    useCdn: false,
    apiVersion: "2023-05-03",
});

async function listProducts() {
    try {
        const products = await client.fetch(
            `*[_type == "product"]{_id, title, price, category, sku}`
        );
        console.log("Products found:", products.length);
        products.forEach((p) => {
            // Pad for alignment
            const title = (p.title || "").padEnd(40);
            const price = (String(p.price) || "").padEnd(10);
            const cat = (p.category || "").padEnd(15);
            console.log(`${p._id} | ${title} | ${price} | ${cat}`);
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listProducts();
