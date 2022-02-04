import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { CoordinatorResponse } from 'gql/coordinator'
import { authQueryFnFactory } from 'common/rest'

export function useCoordinatorList() {
  return useQuery<CoordinatorResponse[]>(endpoints.coordinator.listCoordinator.url)
}

export async function prefetchCoordinatorList(client: QueryClient, token?: string) {
  await client.prefetchQuery<CoordinatorResponse[]>(
    endpoints.coordinator.listCoordinator.url,
    authQueryFnFactory<CoordinatorResponse[]>(token),
  )
}
