import * as yup from 'yup'
import { name, phone, email, password } from 'common/form/validation'
import { FirstStep, SecondStep, ThirdStep } from 'gql/donations'

export const validateFirst: yup.SchemaOf<FirstStep> = yup
  .object()
  .defined()
  .shape({
    payment: yup.string().required().oneOf(['card', 'bank']),
    amount: yup.string().when('payment', {
      is: 'card',
      // Here we should fetch the possible payments to put into the oneOf, but it's not that important
      then: yup.string().required(),
    }),
    otherAmount: yup.number().when('amount', {
      is: 'other',
      then: yup.number().min(1, 'one-time-donation:errors-fields.other-amount').required(),
    }),
  })

export const validateSecond: yup.SchemaOf<SecondStep> = yup.object().defined().shape({
  isAnonymous: yup.boolean().required(),
  personsEmail: email.notRequired(),
  personsFirstName: name.notRequired(),
  personsLastName: name.notRequired(),
  personsPhone: phone.notRequired(),
  loginEmail: email.notRequired(),
  loginPassword: password.notRequired(),
  registerEmail: email.notRequired(),
  registerFirstName: yup.string().notRequired(),
  registerLastName: yup.string().notRequired(),
  registerPassword: password.notRequired(),
})

export const validateThird: yup.SchemaOf<ThirdStep> = yup.object().defined().shape({
  message: yup.string().notRequired(),
})
