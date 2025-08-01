const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Strapi...');

// Create necessary directories
const dirs = [
    'src/api',
    'src/components',
    'src/extensions',
    'src/plugins',
    'config',
    'database',
    'public',
    'build',
    '.tmp'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

// Create a basic .env file if it doesn't exist
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
    const envContent = `HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
JWT_SECRET=your-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file');
}

console.log('🎉 Strapi setup complete!');
console.log('Run "npm run develop" to start Strapi in development mode'); 