/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ["musica-api.up.railway.app"],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    return config;
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true
};
