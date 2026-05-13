import * as yup from 'yup'
import { DonationFormAuthState } from './types'

export const validationSchema = yup.object().shape({
  // ... existing validation
  billingEmail: yup.string().when('authentication', {
    is: DonationFormAuthState.NOREGISTER,
    then: yup.string().email('donation-flow:general.error.email').required(),
  }),
  billingName: yup.string().when('authentication', {
    is: DonationFormAuthState.NOREGISTER,
    then: yup.string().required(),
  }),
})
