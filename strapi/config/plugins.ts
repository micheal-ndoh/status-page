export default ({ env }: { env: any }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000,
      },
    },
  },
  documentation: {
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Prism Status Page API',
        description: 'API documentation for Prism Status Page CMS',
        contact: {
          name: 'Prism Support',
          email: 'support@prism.com',
        },
        license: {
          name: 'MIT',
        },
      },
      'x-strapi-config': {
        path: '/documentation',
        showGeneratedFiles: true,
        generateDefaultResponse: true,
        plugins: ['users-permissions'],
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [
        {
          url: env('STRAPI_URL', 'http://localhost:1337'),
          description: 'Development server',
        },
      ],
    },
  },
}); 