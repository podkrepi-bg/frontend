import { nextCsrf } from 'next-csrf'

const options = {
  secret: process.env.CSRF_SECRET,
}

export const { csrf, setup, csrfToken } = nextCsrf(options)
