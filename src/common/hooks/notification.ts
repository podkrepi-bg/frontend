import { useQuery } from '@tanstack/react-query'
import { GetCampaignNotificationSubscriptionsResponse } from 'gql/notification'
import { useSession } from 'next-auth/react'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export function useUserCampaignNotificationSubscriptions() {
  const { data: session } = useSession()
  return useQuery<GetCampaignNotificationSubscriptionsResponse[]>(
    [endpoints.notifications.getCampaignNotificationSubscriptions.url],
    {
      queryFn: authQueryFnFactory(session?.accessToken),
    },
  )
}
