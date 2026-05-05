import { useSession } from 'next-auth/react'

import { featureEnabledForSession, Features } from 'common/util/featureFlag'
import {
  useStartPaymentSession,
  useCreatePaymentSession,
  IrisCreateCustomerDto,
} from 'service/irisPayment'

export function usePaymentSession() {
  const { data: session } = useSession()
  const enabled = featureEnabledForSession(Features.IRISPAY, session)

  const startMutation = useStartPaymentSession()
  const createMutation = useCreatePaymentSession()

  const startSession = () => {
    if (!enabled) return
    startMutation.mutate()
  }

  const createSession = (data: IrisCreateCustomerDto) => {
    if (!enabled) throw new Error('Payment session disabled')
    return createMutation.mutateAsync(data)
  }

  return { startSession, createSession }
}
