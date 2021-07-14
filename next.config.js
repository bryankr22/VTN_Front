const withPWA = require('next-pwa');
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
module.exports = withCss(withPurgeCss());
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