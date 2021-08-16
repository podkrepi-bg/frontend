// @ts-check

const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

const { i18n } = require('./next-i18next.config')

/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    DEPLOY_TAG: process.env.DEPLOY_TAG,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    services: {
      apiUrl: 'http://api.podkrepi.localhost:5000',
    },
  },
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    GTM_ID: 'GTM-TWQBXM6',
  },
}

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  debug: ['staging', 'production'].includes(process.env.APP_ENV) || false,
  dryRun: ['development', 'nightly'].includes(process.env.APP_ENV) || true,
  silent: true,
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
