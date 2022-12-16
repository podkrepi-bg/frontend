import { useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'

import { DonationWishPaginatedResponse } from 'gql/donationWish'

export function useDonationWishesList(camapignId: string, pageIndex?: number, pageSize?: number) {
  return useQuery<DonationWishPaginatedResponse>({
    queryKey: [endpoints.donationWish.listDonationWishes(camapignId, pageIndex, pageSize).url],
    keepPreviousData: true,
  })
}
