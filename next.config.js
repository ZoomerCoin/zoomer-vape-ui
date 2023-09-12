const withVideos = require("next-videos");

/** @type {import('next').NextConfig} */
module.exports = withVideos({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
});
