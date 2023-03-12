import { AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { JWT } from 'next-auth/jwt'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { Person } from 'gql/person'
import { RealmRole, ResourceRole } from 'common/util/roles'
import jwtDecode from 'jwt-decode'

export interface KeycloakTokenParsed {
  // keycloak-js
  exp?: number
  iat?: number
  nonce?: string
  sub?: string
  session_state?: string
  realm_access?: KeycloakRoles
  resource_access?: KeycloakResourceAccess
}
export interface KeycloakResourceAccess {
  [key: string]: KeycloakRoles
}

export interface KeycloakRoles {
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

type RegisterErrorResponse = {
  data?: { errorMessage?: string }
}

export type RegisterResponse = Person & RegisterErrorResponse

export type RegisterInput = {
  email: string
  password: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  expires: number
}
export type LoginInput = {
  email: string
  password: string
}

export const register = async (data: RegisterInput) => {
  return await apiClient.post<RegisterInput, AxiosResponse<RegisterResponse>>(
    endpoints.auth.register.url,
    data,
  )
}

export function useRegister() {
  return useMutation<AxiosResponse<RegisterResponse>, unknown, RegisterInput>(
    [endpoints.auth.register.url],
    { mutationFn: register },
  )
}

export async function refreshAccessToken(token: string): Promise<JWT> {
  try {
    const response = await apiClient.post<AuthResponse>(
      endpoints.auth.refresh.url,
      { refreshToken: token },
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      },
    )

    if (response.status !== 201) {
      throw new Error()
    }

    const authRes = response.data
    return {
      ...authRes,
      user: jwtDecode<ServerUser>(authRes.accessToken),
      // we decrease it with 10sec for the refresh to run before the actual expiration
      accessTokenExpires: Date.now() + authRes.expires * 1000 - 10000,
    }
  } catch (error) {
    console.warn("Couldn't refresh token. Error: ", error)
    throw new Error('RefreshAccessTokenError')
  }
}

export async function getAccessTokenFromProvider(
  token: string | undefined,
  provider: string,
  picture: string,
): Promise<JWT> {
  try {
    const response = await apiClient.post<AuthResponse>(
      endpoints.auth.providerLogin.url,
      { providerToken: token, provider, picture },
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      },
    )

    if (response.status !== 201) {
      throw new Error()
    }

    const authRes = response.data
    return {
      ...authRes,
      user: jwtDecode<ServerUser>(authRes.accessToken),
      // we decrease it with 10sec for the refresh to run before the actual expiration
      accessTokenExpires: Date.now() + authRes.expires * 1000 - 10000,
    }
  } catch (error) {
    console.log(error)
    throw new Error('FetchAccessTokenError')
  }
}
