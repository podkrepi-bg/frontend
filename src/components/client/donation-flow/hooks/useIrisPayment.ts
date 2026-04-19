import { useRouter } from 'next/router'
import { FormikProps } from 'formik'
import { AxiosError } from 'axios'

import { routes } from 'common/routes'
import { useFinalizePayment, FinalizePaymentError } from 'service/irisPayment'
import { useIrisElements } from 'components/client/iris-pay/irisContextHooks'
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

export function useIrisPayment({ setShowPaymentElement }: UseIrisPaymentProps) {
  const router = useRouter()
  const { campaign } = useDonationFlow()
  const iris = useIrisElements()
  const finalizeMutation = useFinalizePayment()

  const handleOnPaymentElementLoad = (data: CustomEvent) => {
    console.log('Payment element loaded successfully:', data.detail)
    setShowPaymentElement(true)
  }

  const redirectToStatus = (params: Record<string, string | undefined>) => {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, value)
      }
    }
    router.push(
      `${window.location.origin}${routes.campaigns.donationStatus(campaign.slug)}?${query.toString()}`,
    )
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

  const handleOnPaymentSuccess = async (data: CustomEvent) => {
    console.log('Iris payment success event:', data.detail)
    await finalizeAndRedirect()
  }

  const handleOnPaymentError = async (data: CustomEvent) => {
    console.log('Iris payment error event:', data.detail)
    // Still call finalize — IRIS is the authority on the final payment state,
    // not the SDK's error event. If IRIS confirms a failure, the status page
    // will show it; if IRIS actually succeeded, the user gets the right outcome.
    await finalizeAndRedirect()
  }

  return {
    handleOnPaymentElementLoad,
    handleOnPaymentSuccess,
    handleOnPaymentError,
    isCompleting: finalizeMutation.isLoading,
  }
}
