/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "icon-library.com",
      },
      {
        protocol: "https",
        hostname: "algopass.vercel.app",
      },
      {
        protocol: "https",
        hostname: 'ybzythkbaaeqjqqeswln.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'demos.creative-tim.com'
      }
    ],
  },
};

module.exports = nextConfig;
