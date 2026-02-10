import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@apollo/client'],
  rewrites: async () => {
      return [
        {
          source : '/graphql',
          destination : 'http://localhost:3000/graphql'
        }
      ]
    }
};

export default nextConfig;
