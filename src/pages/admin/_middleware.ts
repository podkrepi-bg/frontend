// https://next-auth.js.org/configuration/nextjs#middleware
import { isAdmin, SessionRoles } from 'common/util/roles'
import withAuth from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ token }) => {
      const roles: SessionRoles = {
        realmRoles: token?.user?.realm_access.roles,
        resourceRoles: token?.user?.resource_access.account.roles,
      }
      return isAdmin(roles, undefined)
    },
  },
})
