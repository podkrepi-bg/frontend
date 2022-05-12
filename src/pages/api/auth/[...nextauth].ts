import { AxiosResponse } from 'axios'
import { RealmRole, ResourceRole } from 'common/util/roles'
import NextAuth, { EventCallbacks, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'

interface KeycloakTokenParsed {
  // keycloak-js
  exp?: number
  iat?: number
  nonce?: string
  sub?: string
  session_state?: string
  realm_access?: KeycloakRoles
  resource_access?: KeycloakResourceAccess
}
interface KeycloakResourceAccess {
  [key: string]: KeycloakRoles
}

interface KeycloakRoles {
  roles: string[]
}

export type ParsedToken = KeycloakTokenParsed & {
  name?: string
  email?: string
  given_name?: string
  family_name?: string
  preferred_username?: string
  email_verified?: boolean
  picture?: string
  'allowed-origins'?: string[]
}

export type ServerUser = ParsedToken & {
  scope: string
  theme: string
  locale: string
  name: string
  email: string
  email_verified: boolean
  given_name: string
  family_name: string
  preferred_username: string
  picture?: string
  session_state: string
  'allowed-origins': string[]
  // access
  realm_access: { roles: RealmRole[] }
  resource_access: { account: { roles: ResourceRole[] } }
  // system
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  acr: string
  sid: string
}

declare module 'next-auth/jwt' {
  /**
   * JWT contents which builds the session object
   */
  export interface JWT {
    user: ServerUser
    accessToken: string
    refreshToken: string
  }
}
declare module 'next-auth' {
  // export interface Profile {}
  // export interface Account {}

  /**
   * Session object available everywhere
   */
  export interface Session {
    user: ServerUser
    accessToken: string
    refreshToken: string
  }

  /**
   * Login and SignUp response
   */
  export interface User {
    user: ServerUser
    accessToken: string
    refreshToken: string
  }
}

type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: ServerUser
}
type LoginInput = {
  email: string
  password: string
}

const onCreate: EventCallbacks['createUser'] = async ({ user }) => {
  const { email } = user

  try {
    console.log(`Sent email`)
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`)
  }
}
export const options: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    verifyRequest: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        try {
          const { data } = await apiClient.post<LoginInput, AxiosResponse<LoginResponse>>(
            endpoints.auth.login.url,
            {
              email: credentials.email,
              password: credentials.password,
            },
          )

          if (!data?.accessToken) {
            return null
          }
          return data
        } catch (error) {
          if (error instanceof Error) {
            console.error(error)
          }
        }
        return null
      },
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SIGN IN CALLBACK', { user, account, profile, email, credentials })
      return true
    },
    async session({ session, user, token }) {
      console.log('SESSION CALLBACK', { session, user, token })
      return Promise.resolve({ ...session, ...token })
    },
    async jwt({ token, user: authData, account, profile, isNewUser }) {
      console.log('JWT CALLBACK', { token, user: authData, account, profile, isNewUser })
      return Promise.resolve({ ...token, ...authData })
    },
  },
  events: { createUser: onCreate },
}
export default NextAuth(options)
