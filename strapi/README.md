# Strapi CMS

A Strapi application for status page CMS, deployed as part of the main status page project.

## Getting Started

```bash
cd strapi
npm install
npm run develop
```

## Build

```bash
npm run build
npm start
```

## Deployment

This Strapi instance is deployed to Render as a separate service from the main status page application.

### Render Configuration

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `strapi`

### Environment Variables

Required environment variables for Render deployment:

```env
NODE_ENV=production
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_JWT_SECRET=your-super-secret-admin-jwt-key-here
APP_KEYS=your-app-keys-here,your-app-keys-here-2
API_TOKEN_SALT=your-api-token-salt-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
```

## Integration

This Strapi instance provides CMS functionality for the main status page application, including:

- Incident templates
- Static content management
- Media file management 