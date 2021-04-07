import getConfig from 'next/config'
import Providers from 'next-auth/providers'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

const {
  serverRuntimeConfig: { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, JWT_SECRET },
} = getConfig()

const authOptions: NextAuthOptions = {
  session: { jwt: true },
  secret: JWT_SECRET,
  jwt: {
    encryption: true,
    secret: JWT_SECRET,
  },
  providers: [
    Providers.Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log('CB:signIn', { user, account, profile })
      return true
    },
    async redirect(url, baseUrl) {
      console.log('CB:redirect', { url, baseUrl })
      return baseUrl
    },
    async session(session, user) {
      console.log('CB:session', { session, user })
      return { ...session }
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log('CB:jwt', { token, user, account, profile, isNewUser })
      return token
    },
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions)
}
