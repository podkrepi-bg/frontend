// https://next-auth.js.org/configuration/nextjs#middleware
import { isAdmin } from 'common/util/roles'
import { getToken } from 'next-auth/jwt'
import withAuth from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const jwt = await getToken({ req })
      return isAdmin(jwt)
    },
  },
})
