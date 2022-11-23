import { QueryFunction } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { AxiosRequestConfig } from 'axios'

import { apiClient } from 'service/apiClient'

export async function fetchSession(): Promise<Session | null> {
  const res = await fetch('/api/auth/session')
  const session = await res.json()

  console.log('Fetching session from /api/auth/session')

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

export const queryFnFactory = <T>(token?: string): QueryFunction<T> =>
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
  return queryFnFactory<T>(token)
}

export const authConfig = (token?: string): AxiosRequestConfig => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return { headers }
}
