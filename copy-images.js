const fs = require('fs');
const path = require('path');

// Create directories
const targetDir = path.join(__dirname, 'public', 'assets', 'img');
fs.mkdirSync(targetDir, { recursive: true });

// Source directory
const sourceDir = path.join(__dirname, '..', 'amrit-sovereign-v4', 'assets', 'img');

// Get all PNG files from source
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));

// Copy each file
files.forEach(file => {
    const source = path.join(sourceDir, file);
    const dest = path.join(targetDir, file);
    fs.copyFileSync(source, dest);
    console.log(`Copied: ${file}`);
});

console.log(`\n✅ Successfully copied ${files.length} images!`);
