const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Strapi application...');

// Ensure public folder exists
const publicPath = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicPath)) {
    console.log('📁 Creating public folder...');
    fs.mkdirSync(publicPath, { recursive: true });
}

// Ensure uploads folder exists
const uploadsPath = path.join(publicPath, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    console.log('📁 Creating uploads folder...');
    fs.mkdirSync(uploadsPath, { recursive: true });
}

// Ensure .tmp folder exists for database
const tmpPath = path.join(__dirname, '..', '.tmp');
if (!fs.existsSync(tmpPath)) {
    console.log('📁 Creating .tmp folder...');
    fs.mkdirSync(tmpPath, { recursive: true });
}

console.log('✅ Setup completed successfully!'); 