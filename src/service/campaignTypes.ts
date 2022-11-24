import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { CampaignTypeFormData, CampaignTypesResponse } from 'gql/campaign-types'

import { endpoints } from './apiEndpoints'
import { authConfig, authQueryFnFactory, queryFnFactory } from './restRequests'
import { apiClient } from './apiClient'

export const useCampaignTypesList = () => {
  const { data: session } = useSession()

  return useQuery(
    [endpoints.campaignTypes.listCampaignTypes.url],
    authQueryFnFactory<CampaignTypesResponse[]>(session?.accessToken),
  )
}

export const useCampaignType = (id: string) => {
  const { data: session } = useSession()
  return useQuery(
    [endpoints.campaignTypes.viewCampaignType(id).url],
    authQueryFnFactory<CampaignTypesResponse>(session?.accessToken),
    { staleTime: 5 },
  )
}

export const useCreateCampaignType = () => {
  const { data: session } = useSession()

  return async (data: CampaignTypeFormData) => {
    return await apiClient.post(
      endpoints.campaignTypes.createCampaignType.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useEditCampaignType = (id: string) => {
  const { data: session } = useSession()

  return async (data: CampaignTypeFormData) => {
    return await apiClient.put(
      endpoints.campaignTypes.editCampaignType(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useRemoveCampaignType = () => {
  const { data: session } = useSession()

  return async (id: string) => {
    return await apiClient.delete(
      endpoints.campaignTypes.removeCampaignType(id).url,
      authConfig(session?.accessToken),
    )
  }
}

export async function prefetchCampaignTypeById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<CampaignTypesResponse>(
    [endpoints.campaignTypes.viewCampaignType(slug).url],
    authQueryFnFactory<CampaignTypesResponse>(token),
  )
}

export async function prefetchCampaignTypesList(client: QueryClient) {
  await client.prefetchQuery<CampaignTypesResponse[]>(
    [endpoints.campaignTypes.listCampaignTypes.url],
    queryFnFactory<CampaignTypesResponse[]>(),
  )
}
