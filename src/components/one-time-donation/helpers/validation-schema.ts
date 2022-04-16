import * as yup from 'yup'
import { name, phone, email } from 'common/form/validation'
import { FirstStep, SecondStep, ThirdStep } from 'gql/donations'

export const validateFirst: yup.SchemaOf<FirstStep> = yup
  .object()
  .defined()
  .shape({
    message: yup.string().notRequired(),
    anonymous: yup.bool().required(),
    amount: yup.number().required().notOneOf([0], 'errors-fields.amount'),
  })

export const validateSecond: yup.SchemaOf<SecondStep> = yup
  .object()
  .defined()
  .shape({
    anonymousDonation: yup.boolean().when('anonymous', {
      is: false,
      then: yup.boolean().required().oneOf([true], 'errors-fields.checkbox-anonimus'),
    }),
    personsEmail: email.required(),
    personsFirstName: name.required(),
    personsLastName: name.required(),
    personsPhone: phone.required(),
  })

export const validateThird: yup.SchemaOf<ThirdStep> = yup
  .object()
  .defined()
  .shape({
    payment: yup.string().required().oneOf(['bank'], 'errors-fields.bank-payment'),
  })
