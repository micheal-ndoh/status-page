const strapi = require('@strapi/strapi');
const path = require('path');

// Set the working directory to the Strapi folder
process.chdir(path.join(__dirname));

// Initialize Strapi
const app = strapi();

// Export for Vercel serverless
module.exports = app;

// Start the server if not in serverless mode
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    app.start();
} 