const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Strapi application...');

// Ensure public folder exists
const publicPath = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicPath)) {
    console.log('📁 Creating public folder...');
    fs.mkdirSync(publicPath, { recursive: true });
}

// Ensure uploads folder exists with proper permissions
const uploadsPath = path.join(publicPath, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    console.log('📁 Creating uploads folder...');
    fs.mkdirSync(uploadsPath, { recursive: true });
}

// Set proper permissions for public and uploads folders
try {
    fs.chmodSync(publicPath, 0o755);
    fs.chmodSync(uploadsPath, 0o755);
    console.log('🔐 Set proper permissions for public and uploads folders');
} catch (error) {
    console.log('⚠️ Could not set permissions (this is normal on some systems)');
}

// Ensure .tmp folder exists for database
const tmpPath = path.join(__dirname, '..', '.tmp');
if (!fs.existsSync(tmpPath)) {
    console.log('📁 Creating .tmp folder...');
    fs.mkdirSync(tmpPath, { recursive: true });
}

console.log('✅ Setup completed successfully!'); 