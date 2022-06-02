import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

import {
  IrregularityFileResponse,
  IrregularityResponse,
} from 'components/irregularity/helpers/irregularity.types'

export function useIrregularityList() {
  const { data: session } = useSession()

  return useQuery<IrregularityResponse[]>(
    endpoints.irregularity.irregularitysList.url,
    authQueryFnFactory<IrregularityResponse[]>(session?.accessToken),
  )
}

export function useIrregularity(id: string) {
  const { data: session } = useSession()

  return useQuery<IrregularityResponse>(
    endpoints.irregularity.viewIrregularity(id).url,
    authQueryFnFactory<IrregularityResponse>(session?.accessToken),
  )
}

export function useIrregularityFilesList(irregularityId: string) {
  const { data: session } = useSession()

  return useQuery<IrregularityFileResponse[]>(
    endpoints.irregularityFile.listIrregularityFiles(irregularityId).url,
    authQueryFnFactory<IrregularityFileResponse[]>(session?.accessToken),
  )
}
