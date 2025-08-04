export const strapiConfig = {
  url: process.env.STRAPI_URL || 'http://localhost:1337',
  apiToken: process.env.STRAPI_API_TOKEN || '',
  apiPath: '/api',
  adminPath: '/admin',
  documentationPath: '/documentation',
};

export const getStrapiURL = (path: string = '') => {
  return `${strapiConfig.url}${path}`;
};

export const getStrapiAPIURL = (path: string = '') => {
  return `${strapiConfig.url}${strapiConfig.apiPath}${path}`;
};

export const getStrapiAdminURL = (path: string = '') => {
  return `${strapiConfig.url}${strapiConfig.adminPath}${path}`;
};

export const getStrapiDocumentationURL = () => {
  return `${strapiConfig.url}${strapiConfig.documentationPath}`;
};

export const strapiHeaders = {
  'Content-Type': 'application/json',
  ...(strapiConfig.apiToken && {
    Authorization: `Bearer ${strapiConfig.apiToken}`,
  }),
}; 