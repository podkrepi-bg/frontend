import { getSession } from 'next-auth/react'
import { apiClient } from './apiClient'
import { authConfig } from './restRequests'
import { AffiliateResponse, CancelAffiliateDonation } from 'gql/affiliate'
import { DonationResponse } from 'gql/donations'
import { endpoints } from './apiEndpoints'
import { AffilliateStatusMutation } from 'common/hooks/affiliates'

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

export async function refreshAffiliateCode(affiliateId: string) {
  const session = await getSession()
  return await apiClient.patch<AffiliateResponse>(
    endpoints.affiliate.refreshCode(affiliateId).url,
    null,
    authConfig(session?.accessToken),
  )
}

export async function updateAffiliateStatus(data: AffilliateStatusMutation) {
  const session = await getSession()
  return await apiClient.patch<AffiliateResponse>(
    endpoints.affiliate.updateStatus(data.affiliateId).url,
    { newStatus: data.newStatus },
    authConfig(session?.accessToken),
  )
}
