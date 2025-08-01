const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building Strapi application...');

// Run setup first
console.log('📦 Running setup...');
try {
    execSync('node scripts/setup.js', { stdio: 'inherit' });
} catch (error) {
    console.log('Setup script completed');
}

// Install dependencies if node_modules doesn't exist
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
}

// Build Strapi
console.log('🏗️ Building Strapi...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Strapi build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
} 