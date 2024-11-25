/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://<your-backend-vercel-url>/api/:path*", // Ganti dengan URL backend
      },
    ];
  },
};

export default nextConfig;
