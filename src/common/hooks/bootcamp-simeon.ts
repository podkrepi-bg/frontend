import { useQuery } from 'react-query'

import { endpoints } from '../../service/apiEndpoints'
import { BootcampSimeonResponse } from 'gql/bootcampSimeon'

export function useBootcampSimeonList() {
  return useQuery<BootcampSimeonResponse[]>(endpoints.bootcampSimeon.listAll.url, { retry: 0 })
}

export function useViewBootcampSimeon(id: string) {
  return useQuery<BootcampSimeonResponse>(endpoints.bootcampSimeon.viewSingle(id).url, { retry: 0 })
}
