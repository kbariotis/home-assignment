import { baseConfig } from 'eslint-config-custom';
import nextConfig from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default [
  ...baseConfig,
  ...nextConfig,
  ...nextTs,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
];
