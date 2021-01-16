const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  i18n: {
    locales: ['en', 'bg'],
    defaultLocale: 'en',
  },
}
