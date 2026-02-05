const axios = require('axios');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://amritmilk.in';
const urls = [
    '/',
    '/our-story/',
    '/our-farms/',
    '/csr-sustainability/',
    '/products/'
];

async function scrape() {
    for (const url of urls) {
        try {
            console.log(`Scraping ${baseUrl}${url}...`);
            const response = await axios.get(`${baseUrl}${url}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            const filename = url.replace(/\//g, '_') || 'index';
            fs.writeFileSync(path.join(__dirname, `scraped_${filename}.html`), response.data);
            console.log(`Saved to scraped_${filename}.html`);
        } catch (error) {
            console.error(`Error scraping ${url}: ${error.message}`);
        }
    }
}

scrape();
