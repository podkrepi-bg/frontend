const path = require('path')
const { i18n } = require('./next-i18next.config')

require('dotenv').config()

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
  },
  i18n,
}
