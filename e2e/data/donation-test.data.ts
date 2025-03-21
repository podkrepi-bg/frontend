export const stripeSuccessFormData = {
  cardNumber: '4242 4242 4242 4242',
  name: 'E2e_TEST_NAME',
  email: 'e2e_test_mail@test.bg',
  expiryDate: '04 / 42',
  cvc: '424',
  country: 'BG',
}

export const stripeErrorNoBalanceFormData = {
  cardNumber: '4000 0000 0000 9995',
  name: 'E2e_TEST_NAME',
  email: 'e2e_test_mail@test.bg',
  expiryDate: '04 / 42',
  cvc: '424',
  country: 'BG',
}

export const stripeAuthenticationRequiredFormData = {
  cardNumber: '4000 0027 6000 3184',
  name: 'E2e_TEST_NAME',
  email: 'e2e_test_mail@test.bg',
  expiryDate: '04 / 42',
  cvc: '424',
  country: 'BG',
}
