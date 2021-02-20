const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
  },
  i18n: {
    localeDetection: false,
    locales: ['bg', 'en'],
    defaultLocale: 'bg',
  },
}
