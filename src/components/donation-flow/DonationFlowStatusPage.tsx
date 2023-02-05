import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, CircularProgress, Typography } from '@mui/material'

import { stripe } from 'service/stripeClient'
import { routes } from 'common/routes'

import SuccessGraphic from './icons/SuccessGraphic'
import { DonationFormPaymentStatus } from './helpers/types'
import CenteredSpinner from 'components/common/CenteredSpinner'
import Layout from 'components/layout/Layout'

export default function DonationFlowStatusPage({ slug }: { slug: string }) {
  const [status, setStatus] = useState<DonationFormPaymentStatus | null>(null)
  const router = useRouter()
  const { payment_intent_client_secret, payment_intent_id } = router.query
  useEffect(() => {
    if (!stripe || !payment_intent_client_secret) {
      throw new Error('Stripe is not loaded or you were not redirected from Stripe')
    }

    stripe
      .retrievePaymentIntent(payment_intent_client_secret as string)
      .then(({ paymentIntent, error }) => {
        if (!paymentIntent || paymentIntent.status === DonationFormPaymentStatus.REQUIRES_PAYMENT) {
          router.push(routes.campaigns.donationV2(slug), {
            query: {
              payment_intent_id,
              payment_intent_client_secret,
              status: paymentIntent?.status,
              error: error?.message,
            },
          })
          return
        }
        setStatus(paymentIntent?.status as DonationFormPaymentStatus)
      })
  }, [])
  return (
    <Layout>
      {status ? (
        <Box>
          <Typography variant="h2">{status}</Typography>
          <SuccessGraphic />
        </Box>
      ) : (
        <Box height="calc(100vh - 88px)" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={100} />
        </Box>
      )}
    </Layout>
  )
}
