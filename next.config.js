/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//   runtimeCaching,
//   dest: "public",
//   disable: process.env.NODE_ENV === "development", // 개발 환경에서는 PWA 비활성화
//   register: true,
//   skipWaiting: true,
// });

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path", // API 요청을 위한 경로
        destination: `${API_KEY}/api/:path`, // 올바른 동적 경로 매개변수 사용
      },
    ];
  },
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
