// /** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {};

const withPWA = require("next-pwa")({
  runtimeCaching,
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
