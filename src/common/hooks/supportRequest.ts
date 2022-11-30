import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { apiClient } from 'service/apiClient'

type SupportRequest = {
  id: string
  personId: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  comment: string
  associationMember: boolean
  benefactorCampaign: boolean
  benefactorPlatform: boolean
  companyOtherText: string
  companySponsor: boolean
  companyVolunteer: boolean
  partnerBussiness: boolean
  partnerNpo: boolean
  partnerOtherText: string
  roleAssociationMember: boolean
  roleBenefactor: boolean
  roleCompany: boolean
  rolePartner: boolean
  roleVolunteer: boolean
  volunteerBackend: boolean
  volunteerDesigner: boolean
  volunteerDevOps: boolean
  volunteerFinancesAndAccounts: boolean
  volunteerFrontend: boolean
  volunteerLawyer: boolean
  volunteerMarketing: boolean
  volunteerProjectManager: boolean
  volunteerQa: boolean
  volunteerSecurity: boolean
}

export function useSupportRequestList() {
  const { data: session } = useSession()
  return useQuery<SupportRequest[]>(
    [endpoints.support.supportRequestList.url],
    authQueryFnFactory<SupportRequest[]>(session?.accessToken),
  )
}

export async function prefetchSupportRequestList(client: QueryClient, token?: string) {
  await client.prefetchQuery<SupportRequest[]>(
    [endpoints.support.supportRequestList.url],
    authQueryFnFactory<SupportRequest[]>(token),
  )
}

export type UserReport = {
  email: string
  type: string
  description: string
}
export async function createUserReport(data: UserReport) {
  return await apiClient.post<UserReport>(endpoints.support.createUserReport.url, data)
}
