import { useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'

import { DonationWishResponse } from 'gql/donationWish'

export function useDonationWishesList(camapignId: string) {
  return useQuery<DonationWishResponse[]>([
    endpoints.donationWish.listDonationWishes(camapignId).url,
  ])
}
