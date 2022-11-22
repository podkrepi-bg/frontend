import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { endpoints } from 'service/apiEndpoints'
import { CoordinatorResponse } from 'gql/coordinators'
import { authQueryFnFactory } from 'service/restRequests'

export function useCoordinatorsList() {
  const { data: session } = useSession()
  return useQuery<CoordinatorResponse[]>([endpoints.coordinators.coordinatorsList.url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useViewCoordinator(slug: string) {
  const { data: session } = useSession()
  return useQuery<CoordinatorResponse>([endpoints.coordinators.viewCoordinator(slug).url], {
    retry: 0,
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}
