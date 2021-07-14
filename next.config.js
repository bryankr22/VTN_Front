const withPWA = require('next-pwa');
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withCss(
    withPurgeCss({
        webpack(config, options) {
            config.optimization.minimizer = [];
            config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
            return config;
        },
        purgeCssEnabled: ({ dev, isServer }) => (!dev && !isServer),  // Only enable PurgeCSS for client-side production builds
        purgeCssPaths: [
            "pages/**/*",
            "components/**/*",
            "public/css/*"
        ],
    })
);
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