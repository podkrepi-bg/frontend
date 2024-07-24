import Stripe from 'stripe'
import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import {
  BankImportResult,
  CheckoutSessionInput,
  CheckoutSessionResponse,
  DonationBankInput,
  DonationResponse,
  StripeRefundResponse,
  UserDonationInput,
} from 'gql/donations'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig } from 'service/restRequests'
import { UploadBankTransactionsFiles } from 'components/admin/bank-transactions-file/types'
import { useMutation } from '@tanstack/react-query'
import { FilterData } from 'gql/types'
import { BenevityRequest } from 'components/admin/payments/create-payment/benevity/helpers/benevity.types'

export const createCheckoutSession = async (data: CheckoutSessionInput) => {
  return await apiClient.post<CheckoutSessionInput, AxiosResponse<CheckoutSessionResponse>>(
    endpoints.donation.createCheckoutSession.url,
    data,
  )
}

export function useCreatePaymentIntent(params: Stripe.PaymentIntentCreateParams) {
  //Create payment intent useing the react-query mutation
  const { data: session } = useSession()
  return useMutation(async () => {
    return await apiClient.post<
      Stripe.PaymentIntentCreateParams,
      AxiosResponse<Stripe.PaymentIntent>
    >(endpoints.donation.createPaymentIntent.url, params, authConfig(session?.accessToken))
  })
}

export function useCreateBankDonation() {
  // const { data: session } = useSession()
  return async (data: DonationBankInput) => {
    return await apiClient.post<DonationResponse, AxiosResponse<DonationResponse>>(
      endpoints.donation.createBankDonation.url,
      data,
    )
  }
}

export function useEditDonation(id: string) {
  const { data: session } = useSession()
  return async (data: UserDonationInput) => {
    return await apiClient.patch<DonationResponse, AxiosResponse<DonationResponse>>(
      endpoints.donation.editDonation(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteDonation(ids: string[]) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.post<DonationResponse, AxiosResponse<DonationResponse>>(
      endpoints.donation.deleteDonation.url,
      ids,
      authConfig(session?.accessToken),
    )
  }
}

export const useRefundStripeDonation = () => {
  const { data: session } = useSession()
  return async (extPaymentId: string) => {
    return await apiClient.post<StripeRefundResponse, AxiosResponse<StripeRefundResponse>>(
      endpoints.donation.refundStripePayment(extPaymentId).url,
      '',
      authConfig(session?.accessToken),
    )
  }
}
export const useInvalidateStripeDonation = () => {
  const { data: session } = useSession()
  return async (extPaymentId: string) => {
    return await apiClient.patch(
      endpoints.donation.invalidateStripePayment(extPaymentId).url,
      '',
      authConfig(session?.accessToken),
    )
  }
}

export const useUploadBankTransactionsFiles = () => {
  const { data: session } = useSession()
  return async ({
    files,
    types: filesType,
    bankTransactionsFileId,
  }: UploadBankTransactionsFiles) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    filesType.forEach((fileType) => {
      formData.append('types', fileType.type)
    })
    return await apiClient.post<FormData, AxiosResponse<BankImportResult[]>>(
      endpoints.donation.uploadBankTransactionsFile(bankTransactionsFileId).url,
      formData,
      {
        headers: {
          ...authConfig(session?.accessToken).headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}

export const useExportToExcel = (filterData?: FilterData, searchData?: string) => {
  const { data: session } = useSession()
  return async () => {
    return await apiClient(endpoints.donation.exportToExcel(filterData, searchData).url, {
      ...authConfig(session?.accessToken),
      responseType: 'blob',
    })
  }
}

export const useImportBenevityDonation = () => {
  const { data: session } = useSession()
  return async (data: BenevityRequest) => {
    return await apiClient.post(
      endpoints.payments.createFromBeneivty.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useCreatePaymentFromStripeMutation() {
  const { data: session } = useSession()
  return async (data: Stripe.Charge) => {
    return await apiClient.put(
      endpoints.payments.synchronizeWithStripe.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}
