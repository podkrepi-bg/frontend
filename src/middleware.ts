// <root>/middleware.ts
import type { NextRequest } from 'next/server'
import { isAdmin } from 'common/util/roles'
import withAuth from 'next-auth/middleware'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return withAuth({
      callbacks: {
        authorized: ({ token }) => {
          return token ? token.accessTokenExpires > Date.now() && isAdmin(token) : false
        },
      },
    })
  }

  if (request.nextUrl.pathname.startsWith('/profile')) {
    return withAuth({
      callbacks: {
        authorized: async ({ token }) => {
          return token ? token.accessTokenExpires > Date.now() : false
        },
      },
    })
  }
}
