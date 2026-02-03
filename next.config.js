// @ts-check

const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')
const { version } = require('./package.json')

const { i18n } = require('./next-i18next.config')

/**
 * NextJS Config Section
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  i18n,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  typescript: {
    tsconfigPath: 'tsconfig.build.json',
  },
  swcMinify: true,
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    APP_VERSION: version,
    SENTRY_DSN: process.env.SENTRY_DSN,
    DEPLOY_TAG: process.env.DEPLOY_TAG,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
  },
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    APP_URL: process.env.APP_URL,
    GTM_ID: process.env.GTM_ID ?? 'GTM-TWQBXM6',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    FEATURE_ENABLED: {
      CAMPAIGN: process.env.FEATURE_CAMPAIGN ?? false,
      DUAL_CURRENCY: process.env.FEATURE_DUAL_CURRENCY ?? false,
    },
  },
  sentry: {
    hideSourceMaps: true,
  },
  images: {
    domains: [
      process.env.IMAGE_HOST ?? 'localhost',
      process.env.GHOST_API_URL?.replace('https://', '') || 'blog.podkrepi.bg',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:slug*',
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5010/api/v1'}/:slug*`, // Proxy to API
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/profile/donations',
        permanent: false,
      },
    ]
  },
  async headers() {
    const securityHeaders = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
    ]

    return [
      {
        // Apply the headers to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/core/': {
      transform: '@mui/core/{{member}}',
    },
    '@mui/lab/': {
      transform: '@mui/lab/{{member}}',
    },
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

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

  module.exports = withBundleAnalyzer(module.exports)
}
