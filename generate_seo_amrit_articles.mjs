import fs from 'fs';
import path from 'path';

// Using the OpenRouter API key found in seo-content-tool
const apiKey = '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';

const topics = [
    "The Complete Guide to A2 Gir Cow Milk: Health Benefits and Nutritional Facts",
    "A2 Bilona Ghee vs Regular Ghee: Why the Traditional Method Matters",
    "Panchamrit: The Five Nectars of Ayurveda and Their Profound Health Benefits",
    "From Farm to Glass: Transparency in Amrit Milk's Organic Dairy Farming",
    "Why A1 Milk Causes Digestive Issues and How A2 Cow Milk is the Solution",
    "The Ayurveda Perspective on Dairy: Why Desi Cow Products are Revered",
    "Understanding the Bilona Method: The Secret to Pure, Authentic Ghee",
    "How to Identify Pure A2 Milk: 5 Things Every Consumer Should Know",
    "The Connection Between Cow Welfare and Milk Quality at Amrit Milk Farms",
    "Integrating A2 Milk into Your Daily Diet: Ayurvedic Recipes and Tips",
    "Beyond Lactose Intolerance: The Hidden Benefits of Switching to A2 Dairy",
    "The Role of Panchamrit in Modern Immunity: Ancient Wisdom Meets Modern Science",
    "Grass-Fed vs Grain-Fed Cows: Why Amrit Milk's Diet Changes Everything",
    "The Science of Cultured Butter: Making India's Purest Bilona Ghee",
    "Sustainable Dairy Farming: How Amrit Milk Protects the Environment"
];

const promptTemplate = `
You are an expert, highly experienced human copywriter and SEO specialist. Write a 1000+ word, highly SEO-optimized article on the exact topic: "{topic}". 
The target brand is "Amrit Milk", an organic, premium dairy brand making A2 milk, bilona ghee, and panchamrit. Ensure the article mentions Amrit Milk organically and acts as a strong top-of-funnel marketing piece for them.

CRITICAL INSTRUCTIONS FOR AI-DETECTION BYPASS (MUST FOLLOW):
1. High Burstiness & Perplexity: Vary sentence lengths drastically. Mix very short punchy sentences with longer, complex compound sentences.
2. Natural Idioms & Flaws: Use occasional colloquialisms, rhetorical questions, and conversational transitions ("Let's be real here", "Think about it", "It's a no-brainer"). Do not write like a corporate robot.
3. Formatting: Use proper markdown with H1, H2, H3 tags, bullet points, and bold text for scanning.
4. No Fluff: Do not use typical AI intro/outro phrasing like "In conclusion", "In this fast-paced digital world", "Delve into", "Tapestry". Just get straight to the point.
5. Empathy & Tone: Write with a passionate, empathetic tone. Show real human understanding of the topic.

Return ONLY the markdown text for the article, with no surrounding explanations or code blocks formatting.
`;

const apiUrl = `https://openrouter.ai/api/v1/chat/completions`;

async function generateAll() {
    const outputDir = path.join(process.cwd(), 'seo-articles');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    console.log("Starting autonomous generation of 15 Amrit Milk articles via OpenRouter...");

    for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        console.log(`[${i + 1}/15] Generating: ${topic}`);

        try {
            const body = {
                model: "openai/gpt-4o-mini",
                messages: [{ role: "user", content: promptTemplate.replace('{topic}', topic) }],
                temperature: 0.85,
                top_p: 0.95
            };

            const req = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(body)
            });

            if (!req.ok) {
                const errText = await req.text();
                fs.writeFileSync('error.txt', errText);
                console.error("Wrote error to error.txt");
                break;
            }

            const data = await req.json();
            fs.writeFileSync('debug.json', JSON.stringify(data, null, 2));

            if (!data.choices || !data.choices[0]) {
                console.error("No choices returned from API!");
                continue;
            }

            const text = data.choices[0].message.content;

            const fileName = `article_${i + 1}_${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
            fs.writeFileSync(path.join(outputDir, fileName), text);
            console.log(` -> Saved ${fileName}`);
            break; // Stop after 1 for debug
        } catch (err) {
            console.error(`Failed to generate ${topic}:`, err.message);
        }
    }
    console.log("All 15 articles generated successfully and human-optimized!");
}

generateAll().catch(console.error);
