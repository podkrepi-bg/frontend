import getConfig from 'next/config'
import { Session } from 'next-auth'

import { QueryFunction } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { apiClient } from 'service/apiClient'

const {
  publicRuntimeConfig: { APP_URL },
} = getConfig()
export async function fetchSession(): Promise<Session | null> {
  const res = await apiClient.get('/api/auth/session', { baseURL: APP_URL })
  const session = res.data
  console.log('Fetching session from /api/auth/session')

  console.log(session)
  if (Object.keys(session).length) {
    console.log('Fetching session successful.')
    return session
  }
  console.warn('Fetching session returned null.')
  return null
}

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const response = await apiClient.get(queryKey.join('/'))
  return await response.data
}

export const queryFnFactory = <T>(): QueryFunction<T> =>
  async function ({ queryKey }) {
    const response = await apiClient.get(queryKey.join('/'))
    return await response.data
  }

const attachTokenToQueryFn = <T>(token?: string): QueryFunction<T> =>
  async function ({ queryKey }) {
    if (!token) {
      const session = await fetchSession()
      token = session?.accessToken
    }

    if (!token) console.warn('XHR without token!!!')

    const response = await apiClient.get<T>(queryKey.join('/'), authConfig(token))
    return await response.data
  }

export const authQueryFnFactory = <T>(token?: string): QueryFunction<T> => {
  return attachTokenToQueryFn<T>(token)
}

export const authConfig = (token?: string): AxiosRequestConfig => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return { headers }
}
