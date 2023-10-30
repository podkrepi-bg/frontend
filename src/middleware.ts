import { isAdmin } from 'common/util/roles'
import { getToken } from 'next-auth/jwt'
import withAuth, { NextAuthMiddlewareOptions } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin', '/admin/:path*', '/profile', '/profile/:path*', '/campaigns/:path*'],
}

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'bg'

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    )
  }
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
