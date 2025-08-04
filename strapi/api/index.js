const strapi = require('@strapi/strapi');
const path = require('path');

// Set the working directory to the Strapi folder
process.chdir(path.join(__dirname, '..'));

// Initialize Strapi with minimal configuration
let app;

async function initStrapi() {
  if (!app) {
    try {
      app = await strapi().load();
    } catch (error) {
      console.error('Failed to initialize Strapi:', error);
      throw error;
    }
  }
  return app;
}

// Export the handler for Vercel
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const strapiApp = await initStrapi();

    // Handle the request through Strapi
    return strapiApp.handleRequest(req, res);
  } catch (error) {
    console.error('Strapi error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}; 