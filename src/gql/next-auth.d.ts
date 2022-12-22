import { ServerUser } from 'service/auth'

/**
 * Declaring the Session and User type as per docs here:
 * https://next-auth.js.org/getting-started/typescript#main-module
 **/

declare module 'next-auth' {
  // export interface Profile {}
  // export interface Account {}

  /**
   * Session object available everywhere
   */
  export interface Session {
    accessToken: string
    refreshToken: string
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
