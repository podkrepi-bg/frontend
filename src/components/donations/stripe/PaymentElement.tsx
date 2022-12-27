import { useEffect } from 'react'
import getConfig from 'next/config'
import { Appearance, loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'

import theme from 'common/theme'
import { useCreatePaymentIntent } from 'service/donation'
import { Currencies } from 'components/withdrawals/WithdrawalTypes'
import CenteredSpinner from 'components/common/CenteredSpinner'
const {
  publicRuntimeConfig: { STRIPE_PUBLIC_KEY },
} = getConfig()

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: theme.palette.primary.main,
    colorBackground: theme.palette.background.paper,
    colorText: theme.palette.text.primary,
    colorDanger: theme.palette.error.main,
    fontFamily: "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSizeSm: theme.typography.pxToRem(12),
    fontSizeBase: theme.typography.pxToRem(16),
    fontSizeLg: theme.typography.pxToRem(18),
    fontSizeXl: theme.typography.pxToRem(20),
    spacingUnit: theme.spacing(0),
    borderRadius: theme.borders.round,
  },
}

const stripePromise = loadStripe(
  STRIPE_PUBLIC_KEY ||
    'pk_test_51HmiW8JLlnbRmnT5Kb8o0mPGXdD1zee0ev97LZoDeaBv6JnH7S2UDYMNNBnVJhnQlZKCPCQ6BEbqb6h7an8ameJO00P1Mis8mw',
)

export default function PaymentDetailsStripeForm() {
  const mutation = useCreatePaymentIntent({ amount: 100, currency: Currencies.BGN })
  useEffect(() => {
    mutation.mutate()
  }, [])
  return mutation.isLoading ? (
    <CenteredSpinner size="2rem" />
  ) : (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: mutation.data?.data.client_secret ?? undefined,
        appearance,
      }}>
      <PaymentElement />
    </Elements>
  )
}
