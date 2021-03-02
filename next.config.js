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
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
  },
  i18n,
}
