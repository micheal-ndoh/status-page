const strapi = require('@strapi/strapi');
const path = require('path');

// Set the working directory to the Strapi folder
process.chdir(path.join(__dirname, '..'));

// Initialize Strapi
let app;

async function initStrapi() {
  if (!app) {
    app = await strapi().load();
  }
  return app;
}

// Export the handler for Vercel
module.exports = async (req, res) => {
  try {
    const strapiApp = await initStrapi();
    
    // Handle the request through Strapi
    return strapiApp.handleRequest(req, res);
  } catch (error) {
    console.error('Strapi error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}; 