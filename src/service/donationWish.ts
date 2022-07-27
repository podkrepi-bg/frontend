import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'

import { DonationWishInput, DonationWishResponse } from 'gql/donationWish'

export const createDonationWish = async (data: DonationWishInput) => {
  return await apiClient.post<DonationWishInput, AxiosResponse<DonationWishResponse>>(
    endpoints.donationWish.createDonationWish.url,
    data,
  )
}
