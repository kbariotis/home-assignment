/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@apollo/client'],
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${process.env.API_URL || 'http://localhost:3000'}/graphql`,
      },
    ];
  },
};

module.exports = nextConfig;
