import { AxiosResponse } from 'axios'
import { parseJWT } from 'common/util/parseJWT'
import { RealmRole, ResourceRole } from 'common/util/roles'
import NextAuth, { EventCallbacks, NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
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
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
    user: ServerUser | null
  }
}
declare module 'next-auth' {
  // export interface Profile {}
  // export interface Account {}

  /**
   * Session object available everywhere
   */
  export interface Session {
    accessToken: string
    user: ServerUser | null
  }

  /**
   * Login and SignUp response
   */
  export interface User {
    expires: number
    accessToken: string
    refreshToken: string
  }
}

type AuthResponse = {
  accessToken: string
  refreshToken: string
  expires: number
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
async function refreshAccessToken(token: string): Promise<JWT> {
  try {
    const response = await apiClient.post<AuthResponse>(
      endpoints.auth.refresh.url,
      { refreshToken: token },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.status !== 201) {
      throw new Error()
    }

    const authRes = response.data
    console.log('refreshed')
    return {
      ...authRes,
      user: parseJWT<ServerUser>(authRes.accessToken),
      accessTokenExpires: Date.now() + authRes.expires * 1000,
    }
  } catch (error) {
    console.log(error)
    throw new Error('RefreshAccessTokenError')
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
    maxAge: 60 * 60 * 10,
    updateAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 300,
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        try {
          const { data } = await apiClient.post<LoginInput, AxiosResponse<AuthResponse>>(
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
            console.log(error)
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
      console.log('signIn', user, account, profile)
      return true
    },
    async session({ session, token }): Promise<Session> {
      session.user = token.user
      session.accessToken = token.accessToken

      return session
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: user.accessToken,
          accessTokenExpires: Date.now() + user.expires * 1000,
          refreshToken: user.refreshToken,
          user: parseJWT<ServerUser>(user.accessToken),
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token.refreshToken)
    },
  },
  events: { createUser: onCreate },
}
export default NextAuth(options)
