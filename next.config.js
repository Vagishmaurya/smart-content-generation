/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Generate a static site
  trailingSlash: true, // Add trailing slashes to all URLs for consistency
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
