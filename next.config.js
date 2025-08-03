/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'your-s3-bucket.s3.amazonaws.com', 'your-cubbit-bucket.cubbit.io'],
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
}

module.exports = nextConfig 