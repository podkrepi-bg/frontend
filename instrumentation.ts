// This file loads Sentry initialization on the server and edge runtimes.
// Required by @sentry/nextjs v8+. See:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
