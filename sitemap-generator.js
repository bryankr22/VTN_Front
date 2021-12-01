const { configureSitemap } = require('@sergeymyssak/nextjs-sitemap');

const Sitemap = configureSitemap({
  domains: [{ domain: 'vendetunave.co', defaultLocale: 'es', http: true }],
  exclude: [],
  excludeIndex: true,
  pagesConfig: {
    '/vehiculos/*': {
      priority: '0.5',
      changefreq: 'daily',
    },
  },
  trailingSlash: true,
  targetDirectory: __dirname + '/public',
  pagesDirectory: __dirname + '/pages',
});

Sitemap.generateSitemap();
