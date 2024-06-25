import * as yup from 'yup'
import { BenevityDonation, BenevityRequest } from './benevity.types'

const benevityDonationValidationObject: yup.SchemaOf<BenevityDonation> = yup.object().shape({
  transactionId: yup.string().required(),
  email: yup.string().required(),
  donorFirstName: yup.string().required(),
  donorLastName: yup.string().required(),
  totalAmount: yup.number().required(),
  projectRemoteId: yup.string().required(),
})

export const benevityValidation: yup.SchemaOf<BenevityRequest> = yup
  .object()
  .defined()
  .shape({
    amount: yup.number().required(),
    extPaymentIntentId: yup.string().required(),
    exchangeRate: yup.number().required(),
    benevityData: yup
      .object()
      .defined()
      .shape({
        donations: yup.array().of(benevityDonationValidationObject).optional(),
      }),
  })

export const benevityInputValidation = yup.object({
  transactionId: yup.string().required(),
})
