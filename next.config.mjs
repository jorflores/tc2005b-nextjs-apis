// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:4000/:path*', // Adjust the destination to match your backend server address and port
    },
  ],
};

export default nextConfig;
