import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { BenefactorResponse } from 'gql/benefactor'

export function useBenefactorList() {
  const { data: session } = useSession()
  return useQuery<BenefactorResponse[]>(
    [endpoints.benefactor.benefactorList.url],
    authQueryFnFactory<BenefactorResponse[]>(session?.accessToken),
  )
}

export async function prefetchBenefactorList(client: QueryClient, token?: string) {
  await client.prefetchQuery<BenefactorResponse[]>(
    [endpoints.benefactor.benefactorList.url],
    authQueryFnFactory<BenefactorResponse[]>(token),
  )
}

// export function useBenefactor(id: string) {
//   const { data: session } = useSession()
//   return useQuery<BenefactorResponse>(
//     endpoints.benefactor.getBenefactor + '/' + id,
//     // authQueryFnFactory<BenefactorResponse>(session?.accessToken),
//   )
// }

export function useBenefactor(id: string) {
  const { data: session } = useSession()
  return useQuery<BenefactorResponse>(
    [endpoints.benefactor.getBenefactor(id).url],
    authQueryFnFactory<BenefactorResponse>(session?.accessToken),
  )
}
