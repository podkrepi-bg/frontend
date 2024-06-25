import * as yup from 'yup'
export const stripeInputValidation = yup.object({
  extPaymentIntentId: yup.string().required().matches(/^ch_/, 'Невалиден номер на Страйп'),
})
