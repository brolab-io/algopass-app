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
      }
    ],
  },
};

module.exports = nextConfig;
