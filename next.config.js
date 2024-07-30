// next.config.js

/** @type {import('next').NextConfig} */
const url = 'https://animalp4radise.com';

const nextConfig = {
  env: {
    website_url: url,
  },
  async redirects() {

    return [
      {
        source: '/wp-content/:path*', // This matches any request that starts with /wp-content
        destination: `${url}/wp-content/:path*`, // Redirect to the new destination
        permanent: true, // Set to true for a 301 permanent redirect
      },
    ];
  },
};

module.exports = nextConfig;