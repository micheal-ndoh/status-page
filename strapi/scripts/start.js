const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Starting Strapi application...');

// Debug environment variables
console.log('🔍 Environment variables:');
console.log('DATABASE_CLIENT:', process.env.DATABASE_CLIENT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('DATABASE_FILENAME:', process.env.DATABASE_FILENAME);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Force SQLite environment variables
process.env.DATABASE_CLIENT = 'sqlite';
process.env.DATABASE_FILENAME = '.tmp/data.db';
delete process.env.DATABASE_URL;

console.log('🔧 Forced environment variables:');
console.log('DATABASE_CLIENT:', process.env.DATABASE_CLIENT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('DATABASE_FILENAME:', process.env.DATABASE_FILENAME);

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
    shell: true,
    env: process.env
});

strapiProcess.on('error', (error) => {
    console.error('❌ Failed to start Strapi:', error);
    process.exit(1);
});

strapiProcess.on('exit', (code) => {
    console.log(`Strapi process exited with code ${code}`);
    process.exit(code);
}); 