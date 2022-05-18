// https://next-auth.js.org/configuration/nextjs#middleware
import { isAdmin } from 'common/util/roles'
import withAuth from 'next-auth/middleware'
import { useSession } from 'next-auth/react'

export default withAuth({
  callbacks: {
    authorized: async () => {
      const { data: session } = useSession()
      return isAdmin(session)
    },
  },
})
