import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
      clientId: `${process.env.DISCORD_CLIENT_ID}`,
      clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
    }),
  ],

  secret: `${process.env.JWT_SECRET}`,
  session: { jwt: true },
})
