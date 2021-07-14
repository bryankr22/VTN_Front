const withPWA = require('next-pwa');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  reactStrictMode: false,
  compress: true,
  images: {
    domains: ['vendetunave.s3.amazonaws.com'],
  },
});
