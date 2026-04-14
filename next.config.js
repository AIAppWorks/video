/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  serverExternalPackages: ['@remotion/renderer', '@remotion/bundler', '@remotion/cli'],
  env: {
    // 确保 DATABASE_URL 在所有服务端运行时都可用
    DATABASE_URL: process.env.DATABASE_URL ||
      `file://${path.resolve(__dirname, 'prisma/dev.db')}`,
  },
};

module.exports = nextConfig;
