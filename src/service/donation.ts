import Stripe from 'stripe'
import { AxiosError, AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import {
  BankImportResult,
  CheckoutSessionInput,
  CheckoutSessionResponse,
  DonationBankInput,
  DonationResponse,
  StripeRefundResponse,
  SubscriptionPaymentInput,
  UpdateSetupIntentInput,
  UserDonationInput,
  CancelSetupIntentInput,
} from 'gql/donations'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig } from 'service/restRequests'
import { UploadBankTransactionsFiles } from 'components/admin/bank-transactions-file/types'
import { useMutation } from '@tanstack/react-query'
import { FilterData } from 'gql/types'
import { PaymentMode } from 'components/client/donation-flow/helpers/types'
import { Session } from 'next-auth'
import { SetupIntent } from '@stripe/stripe-js'

export const createCheckoutSession = async (data: CheckoutSessionInput) => {
  return await apiClient.post<CheckoutSessionInput, AxiosResponse<CheckoutSessionResponse>>(
    endpoints.donation.createCheckoutSession.url,
    data,
  )
}

export function useCreatePaymentIntent() {
  //Create payment intent useing the react-query mutation
  return useMutation({
    mutationKey: [endpoints.donation.createPaymentIntent.url],
    mutationFn: async (data: Stripe.PaymentIntentCreateParams) => {
      return await apiClient.post<
        Stripe.PaymentIntentCreateParams,
        AxiosResponse<Stripe.PaymentIntent>
      >(endpoints.donation.createPaymentIntent.url, data)
    },
  })
}

export function useUpdateSetupIntent() {
  //Create payment intent useing the react-query mutation
  const { data: session } = useSession()
  return useMutation({
    mutationFn: async ({ id, idempotencyKey, payload }: UpdateSetupIntentInput) => {
      return await apiClient.post<
        Stripe.SetupIntentUpdateParams,
        AxiosResponse<Stripe.SetupIntent>
      >(
        endpoints.donation.updateSetupIntent(id, idempotencyKey).url,
        payload,
        authConfig(session?.accessToken),
      )
    },
  })
}

export function useCancelSetupIntent() {
  return useMutation<AxiosResponse<SetupIntent>, AxiosError, CancelSetupIntentInput>({
    mutationFn: async ({ id }) => {
      return await apiClient.patch<CancelSetupIntentInput, AxiosResponse<SetupIntent>>(
        endpoints.donation.cancelSetupIntent(id).url,
      )
    },
  })
}

export function useCreateSubscriptionPayment() {
  const { data: session } = useSession()
  return useMutation(async (data: SubscriptionPaymentInput) => {
    return await apiClient.post<SubscriptionPaymentInput, AxiosResponse<Stripe.PaymentIntent>>(
      endpoints.donation.createSubscriptionPayment.url,
      data,
      authConfig(session?.accessToken),
    )
  })
}

export async function createIntentFromSetup(
  setupIntentId: string,
  idempotencyKey: string,
  mode: PaymentMode,
  session: Session | null,
): Promise<AxiosResponse<Stripe.PaymentIntent>> {
  return await apiClient.post<PaymentMode, AxiosResponse<Stripe.PaymentIntent>, AxiosError<Error>>(
    mode === 'one-time'
      ? endpoints.donation.createPaymentIntentFromSetup(setupIntentId, idempotencyKey).url
      : endpoints.donation.createSubscriptionFromSetup(setupIntentId, idempotencyKey).url,
    undefined,
    authConfig(session?.accessToken),
  )
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
