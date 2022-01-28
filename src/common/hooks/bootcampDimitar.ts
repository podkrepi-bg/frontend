import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { BootcampDimitarResponse } from 'gql/bootcampDimitar'

export function useBootcampDimitarList() {
  return useQuery<BootcampDimitarResponse[]>(endpoints.bootcampDimitar.list.url)
}

export function useBootcampDimitar(slug: string) {
  return useQuery<BootcampDimitarResponse>(endpoints.bootcampDimitar.view(slug).url)
}
