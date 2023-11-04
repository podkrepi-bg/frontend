import { getSession } from 'next-auth/react'
import { apiClient } from './apiClient'
import { authConfig } from './restRequests'
import { AffiliateResponse, CancelAffiliateDonation } from 'gql/affiliate'
import { DonationResponse } from 'gql/donations'
import { endpoints } from './apiEndpoints'

export async function joinAffiliateProgram() {
  const session = await getSession()
  return await apiClient.post<AffiliateResponse>(
    endpoints.affiliate.join.url,
    null,
    authConfig(session?.accessToken),
  )
}

export async function cancelAffiliateDonation(data: CancelAffiliateDonation) {
  return await apiClient.patch<DonationResponse>(
    endpoints.affiliate.cancelDonation(data.affiliateCode, data.donationId).url,
  )
}
