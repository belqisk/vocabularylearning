/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure we are not enforcing static export unless intended. 
  // If you need static export, uncomment the line below, but some dynamic features might require adjustments.
  // output: 'export',
};

module.exports = nextConfig;