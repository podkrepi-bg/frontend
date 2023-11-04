import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'react-i18next'
import { DonationResponse } from 'gql/donations'
import { AxiosError, AxiosResponse } from 'axios'
import {
  AffiliateResponse,
  AffiliateWithDonationResponse,
  CancelAffiliateDonation,
} from 'gql/affiliate'
import { cancelAffiliateDonation, joinAffiliateProgram } from 'service/affiliate'

export function useGetAffiliateData() {
  const { data: session } = useSession()
  return useQuery<AffiliateWithDonationResponse>(
    [endpoints.affiliate.getData.url],
    authQueryFnFactory<AffiliateWithDonationResponse>(session?.accessToken),
  )
}

export function useJoinAffiliateProgramMutation() {
  const { t } = useTranslation()
  const mutation = useMutation<AxiosResponse<AffiliateResponse>>([endpoints.affiliate.join], {
    mutationFn: joinAffiliateProgram,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })
  return mutation
}

export function useCancelGuaranteedDonationMutation() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<DonationResponse>,
    CancelAffiliateDonation
  >({
    mutationFn: (data) => cancelAffiliateDonation(data),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries({ queryKey: [endpoints.affiliate.getData.url] })
    },
  })
  return mutation
}
