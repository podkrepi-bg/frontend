// https://next-auth.js.org/configuration/nextjs#middleware
import { getToken } from 'next-auth/jwt'
import withAuth from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const session = await getToken({ req })
      return !!session
    },
  },
})
