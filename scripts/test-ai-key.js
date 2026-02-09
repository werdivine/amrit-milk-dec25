const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testKey() {
    // API Key from source
    const apiKey = "AIzaSyD56yPjGyQ6T14bYE540oNk7qmA8UZ_2yk";
    console.log("Testing API Key:", apiKey.slice(0, 10) + "...");

    try {
        if (!GoogleGenerativeAI) {
            throw new Error("GoogleGenerativeAI module not found");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent("Say hello to Amrit Milk!");
        const response = result.response;
        const text = response.text();
        console.log("Success! Response:", text);
    } catch (error) {
        console.error("Error:", error.message);
        if (error.status) console.error("Status:", error.status);
    }
}

testKey();
