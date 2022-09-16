// https://next-auth.js.org/configuration/nextjs#middleware
import { isAdmin } from 'common/util/roles'
import withAuth from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return token ? token.accessTokenExpires > Date.now() && isAdmin(token) : false
    },
  },
})
