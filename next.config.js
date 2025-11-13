/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  reactStrictMode: false,
  env: {
    URL: process.env.URL,
    JWTKEY: process.env.JWTKEY,
    API_URL: process.env.API_URL,
    STRIPEKEY: process.env.STRIPEKEY,
    MONGO_URI: process.env.MONGO_URI,
    STRIPEPVTKEY: process.env.STRIPEPVTKEY,
  },
}
module.exports = nextConfig
