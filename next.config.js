// @ts-check

const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')
const { version } = require('./package.json')

const { i18n } = require('./next-i18next.config')

/**
 * @type {import('keycloak-js').KeycloakConfig}
 */
const keycloakConfig = {
  url: process.env.KEYCLOAK_URL ?? 'https://keycloak.podkrepi.bg/auth',
  realm: process.env.KEYCLOAK_REALM ?? 'webapp-dev',
  clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'account',
}

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
    APP_VERSION: version,
    SENTRY_DSN: process.env.SENTRY_DSN,
    DEPLOY_TAG: process.env.DEPLOY_TAG,
  },
  serverRuntimeConfig: {
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    services: {
      apiUrl: `${process.env.API_URL}`,
    },
  },
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    GTM_ID: 'GTM-TWQBXM6',
    keycloakConfig,
    FEATURE_ENABLED: {
      CAMPAIGN: process.env.FEATURE_CAMPAIGN ?? false,
    },
  },
  swcMinify: true,
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(module.exports)
