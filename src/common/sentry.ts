import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'

// https://github.com/vercel/next.js/tree/canary/examples/with-sentry
export const initSentry = () => {
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
    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      integrations,
      dsn: process.env.SENTRY_DSN,
      release: process.env.DEPLOY_TAG,
    })
  }
}
