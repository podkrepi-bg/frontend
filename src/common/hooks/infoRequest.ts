import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

type InfoRequest = {
  id: string
  personId: string
  message: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export function useInfoRequestList() {
  return useQuery<InfoRequest[]>(
    endpoints.support.infoRequestList.url,
    authQueryFnFactory<InfoRequest[]>('token'),
  )
}

export async function prefetchInfoRequestList(client: QueryClient, token?: string) {
  await client.prefetchQuery<InfoRequest[]>(
    endpoints.support.infoRequestList.url,
    authQueryFnFactory<InfoRequest[]>(token),
  )
}
