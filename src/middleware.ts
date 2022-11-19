import { isAdmin } from 'common/util/roles'
import { getToken } from 'next-auth/jwt'
import withAuth, { NextAuthMiddlewareOptions } from 'next-auth/middleware'

export const config = {
  matcher: ['/admin', '/admin/:path*', '/profile', '/profile/:path*'],
}

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const session = await getToken({ req })
      if (!session) return false
      if (session.accessTokenExpires <= Date.now()) return false
      if (req.nextUrl.pathname.startsWith('/profile')) {
        return true
      }
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return isAdmin(session)
      }
    },
  },
} as NextAuthMiddlewareOptions)
