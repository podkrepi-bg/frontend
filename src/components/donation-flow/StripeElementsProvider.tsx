import React, { PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Appearance } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import theme from 'common/theme'
import { useCreatePaymentIntent } from 'service/donation'
import CenteredSpinner from 'components/common/CenteredSpinner'

import { useDonationFlow } from './DonationFlowContext'

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: theme.palette.primary.main,
    colorBackground: theme.palette.background.paper,
    // colorText: theme.palette.text.primary resolves to rgba(0, 0, 0, 0.87) and Stripe doesn't accept rgba values
    colorText: 'rgb(0, 0, 0)',
    colorDanger: theme.palette.error.main,
    fontFamily: "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSizeSm: theme.typography.pxToRem(14),
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

export function StripeElementsProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation()

  const { stripePromise, setStripePaymentIntent, campaign } = useDonationFlow()

  //Initial amount is arbitarary, it will be updated when the user selects an amount
  const createPaymentIntentMutation = useCreatePaymentIntent()

  useEffect(() => {
    createPaymentIntentMutation.mutate({
      amount: 100,
      currency: 'BGN',
      metadata: {
        campaignId: campaign.id,
      },
    })
  }, [])

  useEffect(() => {
    const intent = createPaymentIntentMutation.data?.data
    setStripePaymentIntent(intent || null)
  }, [createPaymentIntentMutation])

  return (
    <>
      {createPaymentIntentMutation.isLoading ? (
        <CenteredSpinner />
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: createPaymentIntentMutation.data?.data.client_secret as string,
            appearance,
            locale: i18n.language,
          }}>
          {children}
        </Elements>
      )}
    </>
  )
}
