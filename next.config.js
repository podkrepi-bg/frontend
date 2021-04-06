const path = require('path')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const { i18n } = require('./next-i18next.config')

const {
  NODE_ENV,
  DEPLOY_TAG,
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  SENTRY_SERVER_ROOT_DIR,
} = process.env

const basePath = ''

module.exports = {
  basePath,
  i18n,
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    APP_ENV: APP_ENV,
    SENTRY_DSN: SENTRY_DSN,
    DEPLOY_TAG: DEPLOY_TAG,
    SENTRY_SERVER_ROOT_DIR: SENTRY_SERVER_ROOT_DIR,
  },
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  },
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    GTM_ID: 'GTM-TWQBXM6',
  },
  productionBrowserSourceMaps: true,
  webpack: (config, options) => {
    // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
    // @sentry/node will run in a Node.js environment. @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    // Define an environment variable so source code can check whether or not
    // it's running on the server so we can correctly initialize Sentry
    config.plugins.push(
      new options.webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(options.isServer.toString()),
      }),
    )

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      NODE_ENV === 'production' &&
      DEPLOY_TAG &&
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: DEPLOY_TAG,
          deploy: { env: process.env.APP_ENV },
        }),
      )
    }
    return config
  },
}
