import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory, authConfig } from 'service/restRequests'
import { AdminCampaignNewsResponse} from 'gql/campaign-news'
import { apiClient } from 'service/apiClient'


export function useCampaignNewsAdminList() {
  const { data: session } = useSession()
  return useQuery<AdminCampaignNewsResponse[]>(
    [endpoints.campaignNews.listAdminNews.url],
    authQueryFnFactory<AdminCampaignNewsResponse[]>(session?.accessToken),
  )
}


export function useDeleteNewsArticleById(id: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<null>(
      endpoints.campaignNews.deleteNewsArticle(id).url,
      authConfig(session?.accessToken),
    )
  }
}

export function useViewArticleById(id: string) {
  const { data: session } = useSession()
  return useQuery<AdminCampaignNewsResponse>(
    [endpoints.campaignNews.viewNewsArticleById(id).url],
    authQueryFnFactory<AdminCampaignNewsResponse>(session?.accessToken),
  )
}