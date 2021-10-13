import { QueryClient, QueryFunction, useQuery } from 'react-query'

import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'

type InfoRequest = {
  id: string
  personId: string
  message: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export function useInfoRequestList() {
  return useQuery<InfoRequest[]>(endpoints.support.infoRequestList.url)
}

const queryFn: QueryFunction<InfoRequest[]> = async function ({ queryKey }) {
  const response = await axios.get(queryKey.join('/'))
  return await response.data
}

export async function prefetchInfoRequestList(client: QueryClient) {
  await client.prefetchQuery<InfoRequest[]>(endpoints.support.infoRequestList.url, queryFn)
}
