import NextAuth from 'next-auth'
import getConfig from 'next/config'
import Providers from 'next-auth/providers'

const {
  serverRuntimeConfig: { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, JWT_SECRET },
} = getConfig()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],

  secret: JWT_SECRET,
  session: { jwt: true },
})
