/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-markdown", "remark-gfm"],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.kiwi.com", pathname: "/airlines/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
