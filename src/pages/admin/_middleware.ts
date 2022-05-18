// https://next-auth.js.org/configuration/nextjs#middleware
import { isAdmin } from 'common/util/roles'
import withAuth from 'next-auth/middleware'
import { getSession } from 'next-auth/react'

export default withAuth({
  callbacks: {
    authorized: async () => {
      const session = await getSession()
      return isAdmin(session)
    },
  },
})
