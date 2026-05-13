import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'

export type DonationType = 'donation' | 'corporate'

export type PaymentSessionResponse = {
  hookHash: string
  userHash: string
}

export type IrisCreateCustomerDto = {
  companyName?: string
  uic?: string
  name?: string
  middleName?: string
  family?: string
  identityHash?: string
  email: string
  webhookUrl?: string
  campaignId: string
  amount: number
  type: DonationType
  isAnonymous: boolean
  personId: string | null
  billingName: string
  billingEmail: string
  successUrl?: string
  errorUrl?: string
}

export function useStartPaymentSession() {
  const { data: session } = useSession()
  return useMutation({
    mutationFn: async () => {
      return await apiClient.post(
        '/iris-pay/start-session',
        {},
        { ...authConfig(session?.accessToken), withCredentials: true },
      )
    },
  })
}

export function useCreatePaymentSession() {
  const { data: session } = useSession()
  return useMutation({
    mutationFn: async (data: IrisCreateCustomerDto) => {
      const response = await apiClient.post<PaymentSessionResponse>(
        '/iris-pay/create-payment-session',
        data,
        { ...authConfig(session?.accessToken), withCredentials: true },
      )
      return response.data
    },
  })
}

export type FinalizePaymentResponse = {
  status: string
  donationId?: string
  reason?: string
}

export type FinalizePaymentError = {
  error: 'unknown_payment' | 'payment_integrity' | 'iris_unavailable' | string
  reason?: string
}

export function useFinalizePayment() {
  const { data: session } = useSession()
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<FinalizePaymentResponse>(
        '/iris-pay/finalize',
        {},
        { ...authConfig(session?.accessToken), withCredentials: true },
      )
      return response.data
    },
  })
}
