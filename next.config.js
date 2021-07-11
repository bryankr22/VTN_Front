const withPWA = require('next-pwa')
 
module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  reactStrictMode: false,
  images: {
    domains: ['vendetunave.s3.amazonaws.com'],
  },
})
