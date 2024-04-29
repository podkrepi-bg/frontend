//Map formik field names to HTML ids.

export type DonationFormSections = {
  finalAmount: 'select-donation-amount'
  amountChosen: 'select-donation-amount'
  payment: 'select-payment-method'
  authentication: 'select-authentication-method'
  mode: 'select-recurring-payment'
  loginEmail: 'authentication-login'
  loginPassword: 'authentication-login'
  registerEmail: 'authentication-register'
  registerPassword: 'authentication-register'
  registerFirstName: 'authentication-register'
  registerLastName: 'authentication-register'
  registerConfirmPassword: 'authentication-register'
  stripeCardField: 'stripe-card-field'
}

export const ids: DonationFormSections = {
  finalAmount: 'select-donation-amount',
  amountChosen: 'select-donation-amount',
  payment: 'select-payment-method',
  authentication: 'select-authentication-method',
  mode: 'select-recurring-payment',
  loginEmail: 'authentication-login',
  loginPassword: 'authentication-login',
  registerEmail: 'authentication-register',
  registerPassword: 'authentication-register',
  registerFirstName: 'authentication-register',
  registerLastName: 'authentication-register',
  registerConfirmPassword: 'authentication-register',
  stripeCardField: 'stripe-card-field',
}
