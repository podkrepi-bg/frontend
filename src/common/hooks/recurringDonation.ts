import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { RecurringDonationResponse } from 'gql/recurring-donation'

export function useAllRecurringDonationList() {
  const { data: session } = useSession()
  return useQuery<RecurringDonationResponse[]>(
    endpoints.recurringDonation.list.url,
    authQueryFnFactory<RecurringDonationResponse[]>(session?.accessToken),
  )
}

export function useRecurringDonation(id: string) {
  const { data: session } = useSession()
  return useQuery<RecurringDonationResponse>(
    endpoints.recurringDonation.getRecurringDonation(id).url,
    authQueryFnFactory<RecurringDonationResponse>(session?.accessToken),
  )
}

export const useGetUserRecurringDonations = () => {
  const { data: session } = useSession()
  return useQuery<RecurringDonationResponse[]>(
    endpoints.recurringDonation.getUserRecurringDonations.url,
    authQueryFnFactory<RecurringDonationResponse[]>(session?.accessToken),
  )
}

export async function prefetchRecurringDonationById(
  client: QueryClient,
  id: string,
  token?: string,
) {
  await client.prefetchQuery<RecurringDonationResponse>(
    endpoints.recurringDonation.getRecurringDonation(id).url,
    authQueryFnFactory<RecurringDonationResponse>(token),
  )
}
