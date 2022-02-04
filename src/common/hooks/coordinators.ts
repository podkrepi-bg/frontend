import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { CoordinatorResponse } from 'gql/coordinator'

export function useCoordinatorList() {
  return useQuery<CoordinatorResponse[]>(endpoints.coordinator.listCoordinator.url)
}
