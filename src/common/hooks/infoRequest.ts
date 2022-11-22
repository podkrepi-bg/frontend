import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

type InfoRequest = {
  id: string
  personId: string
  message: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export function useInfoRequestList() {
  const { data: session } = useSession()
  return useQuery<InfoRequest[]>(
    [endpoints.support.infoRequestList.url],
    authQueryFnFactory<InfoRequest[]>(session?.accessToken),
  )
}

export async function prefetchInfoRequestList(client: QueryClient, token?: string) {
  await client.prefetchQuery<InfoRequest[]>(
    [endpoints.support.infoRequestList.url],
    authQueryFnFactory<InfoRequest[]>(token),
  )
}
