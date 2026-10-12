import { useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'

import { DonationWishPaginatedResponse, DonationWithWishPaginatedResponse } from 'gql/donationWish'
import { PaginationData, SortData } from 'gql/types'

export function useDonationWishesList(
  campaignId: string,
  paginationData?: PaginationData,
  sort?: SortData,
  searchData?: string,
) {
  return useQuery<DonationWishPaginatedResponse>({
    queryKey: [
      endpoints.donationWish.listDonationWishes(campaignId, paginationData, sort, searchData).url,
    ],
    keepPreviousData: true,
  })
}

export function useDonationsWithWishesList(
  campaignId: string,
  paginationData?: PaginationData,
  sort?: SortData,
  searchData?: string,
) {
  return useQuery<DonationWithWishPaginatedResponse>({
    queryKey: [
      endpoints.donation.listDonationsWithWishes(campaignId, paginationData, sort, searchData).url,
    ],
    keepPreviousData: true,
  })
}
