const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Starting Strapi application...');

// Ensure all required folders exist
const requiredFolders = [
    'public',
    'public/uploads',
    '.tmp'
];

requiredFolders.forEach(folder => {
    const folderPath = path.join(__dirname, '..', folder);
    if (!fs.existsSync(folderPath)) {
        console.log(`📁 Creating ${folder} folder...`);
        fs.mkdirSync(folderPath, { recursive: true });
    }
});

// Set proper permissions
try {
    const publicPath = path.join(__dirname, '..', 'public');
    const uploadsPath = path.join(publicPath, 'uploads');
    
    fs.chmodSync(publicPath, 0o755);
    fs.chmodSync(uploadsPath, 0o755);
    console.log('🔐 Set proper permissions for folders');
} catch (error) {
    console.log('⚠️ Could not set permissions (this is normal on some systems)');
}

console.log('✅ Folders ready, starting Strapi...');

// Start Strapi
const strapiProcess = spawn('strapi', ['start'], {
    stdio: 'inherit',
    shell: true
});

strapiProcess.on('error', (error) => {
    console.error('❌ Failed to start Strapi:', error);
    process.exit(1);
});

strapiProcess.on('exit', (code) => {
    console.log(`Strapi process exited with code ${code}`);
    process.exit(code);
}); 