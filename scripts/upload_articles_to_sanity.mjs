/**
 * Upload SEO Articles to Sanity CMS
 * 
 * Reads markdown articles, converts to PortableText, uploads images,
 * and creates blog documents in Sanity.
 * 
 * Run: node scripts/upload_articles_to_sanity.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'seo-articles');
const IMAGES_DIR = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\2f7b26ce-d4b6-4c35-bc30-34300d449c92';

const client = createClient({
    projectId: 'fqzgs92z',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: 'skhtazg6LKVr87QfX1Nh1SCBvcUOBRIHoAqAhdMuWQD6Q3ogT8UVpon0Dxw1bsYdbw6r3MP110BiC869qlT095HGNzEMddCXRBuSiwqLIat1ENE3mSQBXH9SczRPUjEvhybRo47CmJWp72Ax2y8wNhVutXBV7Vtka2LkDXkd1tIefOYqBK8m',
    useCdn: false,
});

// Article metadata: maps filename -> full metadata
const ARTICLE_DATA = [
    {
        file: 'article_1_a2_gir_cow_milk.md',
        slug: 'a2-gir-cow-milk-health-benefits',
        author: 'Amrit Milk',
        categories: ['A2 Milk', 'Health'],
        publishedAt: '2026-02-10T00:00:00Z',
        imageName: 'article_1_a2_gir_cow_milk',
        metaDesc: 'Discover the complete benefits of A2 Gir Cow Milk — superior digestion, rich nutrients, and why the Gir cow produces the purest form of A2 milk.',
    },
    {
        file: 'article_2_bilona_ghee.md',
        slug: 'a2-bilona-ghee-vs-regular-ghee',
        author: 'Amrit Milk',
        categories: ['Bilona Ghee', 'Health'],
        publishedAt: '2026-02-12T00:00:00Z',
        imageName: 'article_2_bilona_ghee',
        metaDesc: 'Learn the ancient Bilona method and why A2 Bilona Ghee is vastly superior to regular commercial ghee in nutrition, taste, and health benefits.',
    },
    {
        file: 'article_3_panchamrit.md',
        slug: 'panchamrit-sacred-nourishment',
        author: 'Amrit Milk',
        categories: ['Ayurveda', 'Recipes'],
        publishedAt: '2026-02-13T00:00:00Z',
        imageName: 'article_3_panchamrit',
        metaDesc: 'Understand the sacred significance of Panchamrit — the five holy ingredients — and how this Vedic preparation nourishes both body and soul.',
    },
    {
        file: 'article_4_farm_to_glass_transparency.md',
        slug: 'farm-to-glass-transparency',
        author: 'Amrit Milk',
        categories: ['Farm Life', 'Transparency'],
        publishedAt: '2026-02-14T00:00:00Z',
        imageName: 'article_4_farm_to_glass',
        metaDesc: 'Explore how Amrit Milk\'s farm-to-glass transparency ensures you get the purest, most traceable organic dairy delivered daily from the source.',
    },
    {
        file: 'article_5_a1_vs_a2_digestion.md',
        slug: 'a1-vs-a2-milk-digestion',
        author: 'Amrit Milk',
        categories: ['A2 Milk', 'Health', 'Science'],
        publishedAt: '2026-02-15T00:00:00Z',
        imageName: 'article_5_a1_vs_a2',
        metaDesc: 'The science behind A1 vs A2 milk and digestion. Understand BCM-7, protein structures, and why switching to A2 milk can eliminate dairy intolerance.',
    },
    {
        file: 'article_6_ayurveda_desi_dairy.md',
        slug: 'ayurveda-desi-dairy',
        author: 'Amrit Milk',
        categories: ['Ayurveda', 'Health'],
        publishedAt: '2026-02-16T00:00:00Z',
        imageName: 'article_6_ayurveda_dairy',
        metaDesc: 'How Ayurveda views desi Indian dairy — the sacred relationship between indigenous cow milk, traditional cooking fats, and holistic wellbeing.',
    },
    {
        file: 'article_7_identify_pure_a2_milk.md',
        slug: 'how-to-identify-pure-a2-milk',
        author: 'Amrit Milk',
        categories: ['A2 Milk', 'Guide'],
        publishedAt: '2026-02-17T00:00:00Z',
        imageName: 'article_7_identify_pure_milk',
        metaDesc: 'A practical guide to identifying genuine A2 milk from fakes. Learn the tests, certifications, and signs that guarantee you are buying real A2 milk.',
    },
    {
        file: 'article_8_cow_welfare_milk_quality.md',
        slug: 'cow-welfare-and-milk-quality',
        author: 'Amrit Milk',
        categories: ['Farm Life', 'Animal Welfare'],
        publishedAt: '2026-02-18T00:00:00Z',
        imageName: 'article_8_cow_welfare',
        metaDesc: 'How ethical cow welfare practices directly translate into superior milk quality. Happy, stress-free cows produce the purest, most nutritious milk.',
    },
    {
        file: 'article_9_ayurvedic_recipes_a2_milk.md',
        slug: 'ayurvedic-recipes-with-a2-milk',
        author: 'Amrit Milk',
        categories: ['Recipes', 'Ayurveda'],
        publishedAt: '2026-02-19T00:00:00Z',
        imageName: 'article_9_ayurvedic_recipes',
        metaDesc: 'Authentic Ayurvedic recipes using A2 milk — from Haldi Doodh to Kheer and Paneer. Traditional preparations that maximize the nutritional power of A2 dairy.',
    },
    {
        file: 'article_10_cultured_butter_bilona.md',
        slug: 'cultured-butter-bilona-method',
        author: 'Amrit Milk',
        categories: ['Bilona Ghee', 'Recipes'],
        publishedAt: '2026-02-20T00:00:00Z',
        imageName: 'article_10_cultured_butter',
        metaDesc: 'Discover the art of cultured bilona butter — the ancient, nutrient-dense churned butter that forms the first step in crafting authentic A2 Bilona Ghee.',
    },
];

/**
 * Convert markdown text to Sanity PortableText blocks
 */
function markdownToPortableText(markdown) {
    const blocks = [];
    const lines = markdown.split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();

        if (!line) {
            i++;
            continue;
        }

        // H2
        if (line.startsWith('## ')) {
            blocks.push({
                _type: 'block',
                _key: `block_${blocks.length}`,
                style: 'h2',
                children: [{ _type: 'span', _key: `span_${blocks.length}_0`, text: line.replace(/^## /, ''), marks: [] }],
                markDefs: [],
            });
        }
        // H3
        else if (line.startsWith('### ')) {
            blocks.push({
                _type: 'block',
                _key: `block_${blocks.length}`,
                style: 'h3',
                children: [{ _type: 'span', _key: `span_${blocks.length}_0`, text: line.replace(/^### /, ''), marks: [] }],
                markDefs: [],
            });
        }
        // H4
        else if (line.startsWith('#### ')) {
            blocks.push({
                _type: 'block',
                _key: `block_${blocks.length}`,
                style: 'h4',
                children: [{ _type: 'span', _key: `span_${blocks.length}_0`, text: line.replace(/^#### /, ''), marks: [] }],
                markDefs: [],
            });
        }
        // List item
        else if (line.match(/^(\d+\.|[-*]) /)) {
            const text = line.replace(/^(\d+\.|[-*]) /, '');
            blocks.push({
                _type: 'block',
                _key: `block_${blocks.length}`,
                style: 'normal',
                listItem: 'bullet',
                level: 1,
                children: [{ _type: 'span', _key: `span_${blocks.length}_0`, text: inlineMarkdown(text), marks: [] }],
                markDefs: [],
            });
        }
        // Regular paragraph
        else if (!line.startsWith('#')) {
            // Collect multi-line paragraphs
            const paraLines = [line];
            while (i + 1 < lines.length && lines[i + 1].trim() && !lines[i + 1].startsWith('#')) {
                i++;
                paraLines.push(lines[i].trim());
            }
            const text = paraLines.join(' ');
            blocks.push({
                _type: 'block',
                _key: `block_${blocks.length}`,
                style: 'normal',
                children: [{ _type: 'span', _key: `span_${blocks.length}_0`, text: inlineMarkdown(text), marks: [] }],
                markDefs: [],
            });
        }

        i++;
    }

    return blocks;
}

function inlineMarkdown(text) {
    // Strip **bold** and *italic* markers for clean text
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1');
}

/**
 * Get first paragraph as excerpt
 */
function extractExcerpt(markdown) {
    const lines = markdown.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            return trimmed.substring(0, 280) + (trimmed.length > 280 ? '...' : '');
        }
    }
    return '';
}

/**
 * Extract title (first H1) from markdown
 */
function extractTitle(markdown) {
    const match = markdown.match(/^# (.+)$/m);
    return match ? match[1].trim() : '';
}

/**
 * Find the generated image file by name pattern
 */
function findImage(imageName) {
    const files = fs.readdirSync(IMAGES_DIR);
    const match = files.find(f => f.startsWith(imageName) && f.endsWith('.png'));
    return match ? path.join(IMAGES_DIR, match) : null;
}

/**
 * Upload an image to Sanity and return the asset reference
 */
async function uploadImage(imagePath, filename) {
    console.log(`  📸 Uploading image: ${filename}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
        filename: filename + '.png',
        contentType: 'image/png',
    });
    console.log(`  ✅ Image uploaded: ${asset._id}`);
    return {
        _type: 'image',
        asset: {
            _type: 'reference',
            _ref: asset._id,
        },
    };
}

/**
 * Main upload function
 */
async function uploadAllArticles() {
    console.log('🚀 Starting Sanity article upload...\n');

    // Check if articles already exist to avoid duplicates
    const existingPosts = await client.fetch('*[_type == "blog"] { "slug": slug.current }');
    const existingSlugs = new Set(existingPosts.map(p => p.slug));

    let created = 0;
    let skipped = 0;

    for (const articleMeta of ARTICLE_DATA) {
        console.log(`\n📖 Processing: ${articleMeta.file}`);

        // Skip if already exists
        if (existingSlugs.has(articleMeta.slug)) {
            console.log(`  ⚠️  Already exists, skipping: ${articleMeta.slug}`);
            skipped++;
            continue;
        }

        const filePath = path.join(ARTICLES_DIR, articleMeta.file);
        if (!fs.existsSync(filePath)) {
            console.log(`  ❌ File not found: ${filePath}`);
            continue;
        }

        const markdown = fs.readFileSync(filePath, 'utf-8');
        const title = extractTitle(markdown);
        const excerpt = extractExcerpt(markdown);

        // Remove the H1 title from content before converting
        const contentMarkdown = markdown.replace(/^# .+\n\n?/, '');
        const content = markdownToPortableText(contentMarkdown);

        // Upload the featured image
        let featuredImage = null;
        const imagePath = findImage(articleMeta.imageName);
        if (imagePath) {
            try {
                featuredImage = await uploadImage(imagePath, articleMeta.imageName);
            } catch (err) {
                console.error(`  ⚠️  Image upload failed: ${err.message}`);
            }
        } else {
            console.log(`  ⚠️  Image not found for: ${articleMeta.imageName}`);
        }

        // Create the Sanity document
        const doc = {
            _type: 'blog',
            title,
            slug: {
                _type: 'slug',
                current: articleMeta.slug,
            },
            excerpt,
            author: articleMeta.author,
            publishedAt: articleMeta.publishedAt,
            categories: articleMeta.categories,
            content,
            ...(featuredImage && { featuredImage }),
        };

        try {
            const result = await client.create(doc);
            console.log(`  ✅ Created article: "${title}" (${result._id})`);
            created++;
        } catch (err) {
            console.error(`  ❌ Failed to create article: ${err.message}`);
        }
    }

    console.log(`\n🎉 Done! Created: ${created} articles, Skipped: ${skipped} (already exist)`);
}

uploadAllArticles().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
