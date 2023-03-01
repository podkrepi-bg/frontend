/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://podkrepi.bg',
  generateRobotsTxt: true, // (optional)
  exclude: ['/admin*', '/test*'],
}
