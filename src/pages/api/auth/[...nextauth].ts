import { AxiosResponse } from 'axios'
import jwtDecode from 'jwt-decode'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { EventCallbacks, NextAuthOptions, Session } from 'next-auth'

import {
  AuthResponse,
  getAccessTokenFromProvider,
  LoginInput,
  refreshAccessToken,
  ServerUser,
} from 'service/auth'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'

declare module 'next-auth/jwt' {
  /**
   * JWT contents which builds the session object
   */
  export interface JWT {
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
    user: ServerUser | null
    expires?: number
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
    picture: string
  }
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
  debug: process.env.APP_ENV !== 'production',
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
    async signIn(/* { user, account } */) {
      // Can be used to check if the user is allowed to log in or not
      return true
    },
    async session({ session, token }): Promise<Session> {
      session.user = jwtDecode<ServerUser>(token.accessToken)
      session.accessToken = token.accessToken

      return session
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // Initial sign in only triggered when a provider is logging
        if (account.provider === 'credentials') {
          // With credentials the user is already a `AuthResponse` that is what is returned from the `authorize` function:
          console.log(user)
          return {
            accessToken: user.accessToken,
            // This is called the first time only here expires always exists and that calculates the timestamp that the token would actually expire in
            accessTokenExpires: Date.now() + Number(user.expires) * 1000,
            refreshToken: user.refreshToken,
            user: jwtDecode<ServerUser>(user.accessToken),
          }
        }
        // This is the flow for the providers login where a call is sent to get the `AuthResponse` from the provider access token
        const keycloakToken = await getAccessTokenFromProvider(
          account.access_token,
          account.provider,
          token.picture ?? '',
        )
        return {
          accessToken: keycloakToken.accessToken,
          // This is called the first time only here expires always exists and that calculates the timestamp that the token would actually expire in
          accessTokenExpires: Date.now() + Number(keycloakToken.expires) * 1000,
          refreshToken: keycloakToken.refreshToken,
          user: jwtDecode<ServerUser>(keycloakToken.accessToken),
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
