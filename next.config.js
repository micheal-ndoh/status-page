/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Warning: This allows production builds to successfully complete even if
        // your project has TypeScript errors.
        ignoreBuildErrors: true,
    },
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
    },
    // Disable static generation for pages that use translations
    trailingSlash: false,
    images: {
        domains: [
            'localhost',
            'your-s3-bucket.s3.amazonaws.com',
            'your-cubbit-bucket.cubbit.io',
            'strapi-status-page.vercel.app',
            'vercel.app'
        ],
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        STRAPI_URL: process.env.STRAPI_URL,
        STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
    },
}

module.exports = nextConfig 