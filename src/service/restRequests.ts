import { QueryFunction } from 'react-query'
import { AxiosRequestConfig } from 'axios'

import { apiClient } from 'service/apiClient'

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const response = await apiClient.get(queryKey.join('/'))
  return await response.data
}

export const queryFnFactory = <T>(config?: AxiosRequestConfig): QueryFunction<T> =>
  async function ({ queryKey }) {
    const response = await apiClient.get(queryKey.join('/'), config)
    return await response.data
  }

export const authQueryFnFactory = <T>(token?: string): QueryFunction<T> => {
  return queryFnFactory<T>(authConfig(token))
}

export const authConfig = (token?: string): AxiosRequestConfig => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return { headers }
}
