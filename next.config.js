const withPWA = require('next-pwa');
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
module.exports = withCss(
    withPurgeCss({
        purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
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