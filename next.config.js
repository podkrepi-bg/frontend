const path = require('path')
const { i18n } = require('./next-i18next.config')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
  },
  i18n,
}
