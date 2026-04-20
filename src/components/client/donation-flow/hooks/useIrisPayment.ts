import { useRouter } from 'next/router'
import { FormikProps } from 'formik'
import { AxiosError } from 'axios'

import { routes } from 'common/routes'
import { useFinalizePayment, FinalizePaymentError } from 'service/irisPayment'
import { useIrisElements } from 'components/client/iris-pay/irisContextHooks'
import type {
  OnPaymentEventError,
  OnPaymentEventLastStep,
} from 'components/client/iris-pay/IRISPaySDK'
import { useDonationFlow } from '../contexts/DonationFlowProvider'
import { DonationFormData } from '../helpers/types'

interface UseIrisPaymentProps {
  formikRef: React.RefObject<FormikProps<DonationFormData> | null>
  setShowPaymentElement: (show: boolean) => void
}

const ERROR_MESSAGES: Record<string, string> = {
  unknown_payment: 'Payment session could not be found. Please try again.',
  payment_integrity: 'Payment could not be verified due to a data integrity error.',
}

// Let IRIS's own success/failure screen show before we navigate away.
const IRIS_RESULT_SCREEN_DISPLAY_MS = 3500

export function useIrisPayment({ setShowPaymentElement }: UseIrisPaymentProps) {
  const router = useRouter()
  const { campaign } = useDonationFlow()
  const iris = useIrisElements()
  const finalizeMutation = useFinalizePayment()

  const handleOnPaymentElementLoad = (_data: CustomEvent) => {
    setShowPaymentElement(true)
  }

  const redirectToStatus = (params: Record<string, string | undefined>) => {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, value)
      }
    }
    router.push(`${routes.campaigns.donationStatus(campaign.slug)}?${query.toString()}`)
  }

  const finalizeAndRedirect = async () => {
    try {
      const result = await finalizeMutation.mutateAsync()
      redirectToStatus({
        p_status: result.status,
        payment_intent: result.donationId,
      })
    } catch (err) {
      const axiosErr = err as AxiosError<FinalizePaymentError>
      const errorCode = axiosErr?.response?.data?.error
      const httpStatus = axiosErr?.response?.status

      // IRIS unreachable or other transient BE failure — fall back to pending and
      // let the webhook reconcile the donation status. The hookHash from the IRIS
      // session doubles as ext_payment_intent_id, which the status page looks up by.
      if (errorCode === 'iris_unavailable' || httpStatus === 503 || !httpStatus) {
        redirectToStatus({
          p_status: 'pending',
          payment_intent: iris?.paymentSession?.hookHash,
        })
        return
      }

      const message = (errorCode && ERROR_MESSAGES[errorCode]) || 'Payment completion failed.'
      redirectToStatus({
        p_status: 'canceled',
        p_error: message,
      })
    }
  }

  const handleOnPaymentSuccess = async (data: CustomEvent<OnPaymentEventLastStep>) => {
    // Dispatch finalize first so the XHR is in flight before the router
    // tears this component down — webhook backstops if it's still aborted.
    finalizeMutation.mutateAsync().catch(() => {})

    // Let the SDK's success/failure screen show briefly before leaving.
    setTimeout(() => {
      if (data.detail.payload.success) {
        redirectToStatus({
          p_status: 'succeeded',
          payment_intent: iris?.paymentSession?.hookHash,
        })
      } else {
        redirectToStatus({
          p_status: 'canceled',
          p_error: 'Payment was not completed.',
        })
      }
    }, IRIS_RESULT_SCREEN_DISPLAY_MS)
  }

  const handleOnPaymentError = async (_data: CustomEvent<OnPaymentEventError>) => {
    await finalizeAndRedirect()
  }

  return {
    handleOnPaymentElementLoad,
    handleOnPaymentSuccess,
    handleOnPaymentError,
    isCompleting: finalizeMutation.isLoading,
  }
}
