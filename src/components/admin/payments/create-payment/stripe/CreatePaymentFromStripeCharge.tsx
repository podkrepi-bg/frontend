import { useField } from 'formik'
import { CreatePaymentFromStripeChargeTable } from './StripeCreatePaymentDialog'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { useGetStripeChargeFromPID } from 'common/hooks/donation'

export function CreatePaymentFromStripeCharge() {
  const [field] = useField('extPaymentIntentId')
  const data = useGetStripeChargeFromPID(field.value)
  if (data.isLoading) return <CenteredSpinner />
  if (data.isError) return
  return <CreatePaymentFromStripeChargeTable data={data.data} id={field.value} />
}
