// https://next-auth.js.org/configuration/nextjs#middleware
import withAuth from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ token }) => {
      return token ? token.accessTokenExpires > Date.now() : false
    },
  },
})
