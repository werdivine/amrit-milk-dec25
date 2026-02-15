const { createClient } = require("@sanity/client");

const client = createClient({
    projectId: "fqzgs92z",
    dataset: "production",
    token: "skhtazg6LKVr87QfX1Nh1SCBvcUOBRIHoAqAhdMuWQD6Q3ogT8UVpon0Dxw1bsYdbw6r3MP110BiC869qlT095HGNzEMddCXRBuSiwqLIat1ENE3mSQBXH9SczRPUjEvhybRo47CmJWp72Ax2y8wNhVutXBV7Vtka2LkDXkd1tIefOYqBK8m",
    useCdn: false,
    apiVersion: "2023-05-03",
});

async function listSlugs() {
    const products = await client.fetch(`*[_type == "product"]{title, "slug": slug.current}`);
    products.forEach((p) => {
        console.log(`${p.slug} | ${p.title}`);
    });
}

listSlugs();
