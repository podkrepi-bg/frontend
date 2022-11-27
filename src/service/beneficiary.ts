import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import {
  BeneficiaryFormData,
  BeneficiaryListResponse,
  ViewBeneficiaryResponse,
} from 'gql/beneficiary'

import { apiClient } from './apiClient'
import { endpoints } from './apiEndpoints'
import { authConfig, authQueryFnFactory } from './restRequests'

export const useBeneficiariesList = () => {
  const { data: session } = useSession()
  return useQuery(
    [endpoints.beneficiary.listBeneficiary.url],
    authQueryFnFactory<BeneficiaryListResponse[]>(session?.accessToken),
  )
}

export const useViewBeneficiary = (id: string) => {
  const { data: session } = useSession()
  return useQuery(
    [endpoints.beneficiary.viewBeneficiary(id).url],
    authQueryFnFactory<ViewBeneficiaryResponse>(session?.accessToken),
  )
}

export const useCreateBeneficiary = () => {
  const { data: session } = useSession()
  return async (values: BeneficiaryFormData) => {
    return await apiClient.post(
      endpoints.beneficiary.createBeneficiary.url,
      values,
      authConfig(session?.accessToken),
    )
  }
}

export const useEditBeneficiary = (id: string) => {
  const { data: session } = useSession()

  return async (vals: BeneficiaryFormData) => {
    return await apiClient.put(
      endpoints.beneficiary.editBeneficiary(id).url,
      vals,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteBeneficiary(slug: string) {
  return useQuery<null>([endpoints.beneficiary.removeBeneficiary(slug).url])
}

export const useRemoveBeneficiary = () => {
  const { data: session } = useSession()

  return async (id: string) => {
    return await apiClient.delete(
      endpoints.beneficiary.removeBeneficiary(id).url,
      authConfig(session?.accessToken),
    )
  }
}

export async function prefetchBeneficiaryById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<BeneficiaryListResponse>(
    [endpoints.beneficiary.viewBeneficiary(slug).url],
    authQueryFnFactory<BeneficiaryListResponse>(token),
  )
}

export async function prefetchBeneficiariesList(client: QueryClient, token?: string) {
  await client.prefetchQuery<BeneficiaryListResponse[]>(
    [endpoints.beneficiary.listBeneficiary.url],
    authQueryFnFactory<BeneficiaryListResponse[]>(token),
  )
}
