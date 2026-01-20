const https = require("https");

const url = "https://www.instagram.com/p/DEPgBNGz9M1/";
const options = {
    headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    },
};

https
    .get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
            const imgMatch = data.match(/<meta property="og:image"\s+content="([^"]+)"/i);
            const titleMatch = data.match(/<meta property="og:title"\s+content="([^"]+)"/i);

            console.log("Status Code:", res.statusCode);
            if (res.statusCode === 200) {
                console.log("Image Found:", imgMatch ? "Yes" : "No");
                if (imgMatch) console.log("Image URL:", imgMatch[1]);
                console.log("Title Found:", titleMatch ? "Yes" : "No");
                if (titleMatch) console.log("Title:", titleMatch[1]);
            } else {
                // If 200 but redirected to login, the content might be different
                console.log("Heads up: might be redirected or blocked.");
            }
        });
    })
    .on("error", (err) => {
        console.error("Error:", err.message);
    });
