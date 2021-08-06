const withPWA = require('next-pwa');
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
const runtimeCaching = require('next-pwa/cache')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = withCss(
    withPurgeCss({
        webpack(config, { isServer }) {
            /**if (!isServer) {
                config.node = {
                    fs: 'empty'
                }
            }**/
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

module.exports = {
    reactStrictMode: false,
    compress: true,
    images: {
        domains: ['vendetunave.s3.amazonaws.com'],
    },
}
/**const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});  
module.exports = withBundleAnalyzer({});**/