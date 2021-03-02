import NextAuth, { InitOptions } from 'next-auth'
import getConfig from 'next/config'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import { connectionOptions } from 'ormconfig'

const {
  serverRuntimeConfig: { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, JWT_SECRET },
} = getConfig()

export const adapter = Adapters.TypeORM.Adapter(connectionOptions)

const authOptions: InitOptions = {
  session: { jwt: true },
  secret: JWT_SECRET,
  jwt: {
    encryption: true,
    secret: JWT_SECRET,
  },
  adapter,
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log({ credentials })
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
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
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log('CB:jwt', { token, user, account, profile, isNewUser })
      return token
    },
  },
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default NextAuth(authOptions)
