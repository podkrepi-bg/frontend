import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'

// https://github.com/vercel/next.js/tree/canary/examples/with-sentry
export const initSentry = () => {
  console.log('INIT SENTRY 1')
  console.log({
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    DEPLOY_TAG: process.env.DEPLOY_TAG,
    NEXT_IS_SERVER: process.env.NEXT_IS_SERVER,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_DEPLOY_TAG: process.env.NEXT_PUBLIC_DEPLOY_TAG,
    NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR: process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
  })
  if (process.env.SENTRY_DSN) {
    const integrations = []
    if (process.env.NEXT_IS_SERVER === 'true' && process.env.SENTRY_SERVER_ROOT_DIR) {
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename?.replace(
              process.env.SENTRY_SERVER_ROOT_DIR || '/app',
              'app:///',
            )
            frame.filename = frame.filename?.replace('.next', '_next')
            return frame
          },
        }),
      )
    }
    console.log('INIT SENTRY 2')
    Sentry.init({
      enabled: true, // process.env.NODE_ENV === 'production',
      integrations,
      dsn: process.env.SENTRY_DSN,
      release: process.env.DEPLOY_TAG,
    })
  }
}
