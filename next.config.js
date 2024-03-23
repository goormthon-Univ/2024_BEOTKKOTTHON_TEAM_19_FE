/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  runtimeCaching,
  dest: "public",
  disable: process.env.NODE_ENV === "development", // 개발 환경에서는 PWA 비활성화
  register: true,
  skipWaiting: true,
  buildExcludes: [/app-build-manifest\.json$/],
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https", // 여기서는 프로토콜을 https로 지정
        hostname: "team19-bucket.s3.ap-northeast-2.amazonaws.com", // 추가하려는 호스트 이름
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // API 요청을 위한 경로
        destination: `${API_KEY}/api/:path*`, // 올바른 동적 경로 매개변수 사용
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
