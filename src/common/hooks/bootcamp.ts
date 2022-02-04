import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { BootcampersResponse } from 'gql/bootcamp'

export function useBootcampersList() {
  return useQuery<BootcampersResponse[]>(endpoints.bootcamp.listBootcampers.url)
}

export function useViewBootcamper(slug: string) {
  return useQuery<BootcampersResponse>(endpoints.bootcamp.viewBootcamper(slug).url)
}

export function useDeleteBootcamper(slug: string) {
  return useQuery<BootcampersResponse>(endpoints.bootcamp.removeBootcamper(slug).url)
}
