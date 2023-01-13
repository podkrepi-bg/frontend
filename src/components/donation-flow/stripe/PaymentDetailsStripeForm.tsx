import getConfig from 'next/config'
import { Appearance, loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'

import theme from 'common/theme'
import { Box, BoxProps } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
    fontSizeBase: theme.typography.pxToRem(14),
    fontSizeLg: theme.typography.pxToRem(18),
    fontSizeXl: theme.typography.pxToRem(20),
    spacingUnit: theme.spacing(0),
    borderRadius: theme.borders.round,
    focusBoxShadow: 'none',
    focusOutline: `2px solid ${theme.palette.primary.main}`,
  },
  rules: {
    '.Input': {
      boxShadow: 'none',
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    '.Input:focus': {
      border: 'none',
      boxShadow: 'none',
    },
  },
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
console.log('loadStripe')

export type PaymentDetailsStripeFormProps = {
  clientSecret: string
  containerProps?: BoxProps
}
export default function PaymentDetailsStripeForm({
  clientSecret,
  containerProps,
}: PaymentDetailsStripeFormProps) {
  const { i18n } = useTranslation()
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: clientSecret,
        appearance,
        locale: i18n.language,
      }}>
      <Box {...containerProps}>
        <PaymentElement onChange={console.log} />
      </Box>
    </Elements>
  )
}
