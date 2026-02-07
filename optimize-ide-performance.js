/**
 * Script to help optimize Antigravity IDE performance
 * Addresses language server resource consumption and general performance issues
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

console.log('🔍 Analyzing Antigravity IDE Performance Issues...\n');

// Check system resources
console.log('🖥️  System Info:');
console.log(`   Platform: ${os.platform()}`);
console.log(`   Arch: ${os.arch()}`);
console.log(`   CPUs: ${os.cpus().length}`);
console.log(`   Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`   Free Memory: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB\n`);

// Check project size
const projectRoot = __dirname;
const nodeModulesPath = path.join(projectRoot, 'node_modules');
const nextPath = path.join(projectRoot, '.next');

// Calculate approximate sizes
function calculateDirectorySize(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return 0;
    }
    
    const walkSync = (dir) => {
        let size = 0;
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                size += walkSync(filePath);
            } else {
                size += stat.size;
            }
        });
        
        return size;
    };
    
    return walkSync(dir);
}

const nodeModulesSize = calculateDirectorySize(nodeModulesPath);
const nextSize = calculateDirectorySize(nextPath);

console.log('📁 Project Size Analysis:');
console.log(`   node_modules: ${(nodeModulesSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   .next: ${(nextSize / 1024 / 1024).toFixed(2)} MB\n`);

// Generate recommendations
console.log('💡 Performance Recommendations:\n');

console.log('1. 🚀 Language Server Optimization:');
console.log('   Add these settings to your Antigravity IDE settings.json:');
console.log('');
console.log('   {');
console.log('     "typescript.tsserver.maxMemory": 2048,');
console.log('     "typescript.suggest.enabled": false,');
console.log('     "python.analysis.diagnosticMode": "openFilesOnly",');
console.log('     "files.watcherExclude": {');
console.log('       "**/node_modules/**": true,');
console.log('       "**/dist/**": true,');
console.log('       "**/build/**": true,');
console.log('       "**/.next/**": true,');
console.log('       "**/.git/**": true');
console.log('     },');
console.log('     "files.exclude": {');
console.log('       "**/node_modules": true,');
console.log('       "**/.git": true,');
console.log('       "**/.next": true,');
console.log('       "dist/**": true,');
console.log('       "build/**": true');
console.log('     }');
console.log('   }\n');

console.log('2. 🧹 Clean Operations:');
console.log('   • Clear Antigravity IDE caches');
console.log('   • Close unnecessary project folders');
console.log('   • Close unused tabs regularly\n');

console.log('3. 🤖 AI Agent Management:');
console.log('   • Open Command Palette (Ctrl+Shift+P)');
console.log('   • Search for "Antigravity: Agent Manager"');
console.log('   • Stop any agents you\'re not actively using\n');

console.log('4. 🔧 Windows Defender Exclusions:');
console.log('   Add these paths to Windows Defender exclusions:');
console.log(`   • ${process.env.APPDATA}\\Antigravity\\User`);
console.log(`   • ${projectRoot}\n`);

console.log('5. 🐳 Containerized Development:');
console.log('   Consider using the dev container configuration:');
console.log('   • Install Docker Desktop');
console.log('   • Install "Remote - Containers" extension');
console.log('   • Reopen project in container via Command Palette\n');

console.log('6. 🧪 Process Monitoring:');
console.log('   • Open Command Palette (Ctrl+Shift+P)');
console.log('   • Run "Developer: Open Process Explorer"');
console.log('   • Look for processes with high memory/CPU usage\n');

console.log('7. 🔄 Restart Options:');
console.log('   • Restart Extension Host: Command Palette → "Developer: Restart Extension Host"');
console.log('   • Restart Antigravity IDE if issues persist\n');

console.log('For more detailed instructions, see DEV_CONTAINER_SETUP.md in the project root.');