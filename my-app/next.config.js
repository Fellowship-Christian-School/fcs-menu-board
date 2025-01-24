/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
    images: {
      domains: ["example.com"], // Add the domains of your image sources here
    },
    // Disable static exports
    output: "standalone",
  }
  
  module.exports = nextConfig