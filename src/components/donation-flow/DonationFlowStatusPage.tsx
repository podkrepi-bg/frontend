import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, CircularProgress, Typography } from '@mui/material'

import { stripe } from 'service/stripeClient'
import { routes } from 'common/routes'

import SuccessGraphic from './icons/SuccessGraphic'
import { DonationFormPaymentStatus } from './helpers/types'
import DonationFlowLayout from './DonationFlowLayout'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { useSession } from 'next-auth/react'
import { Form, Formik } from 'formik'
import FormTextField from 'components/common/form/FormTextField'
import theme from 'common/theme'
import { Email, Share } from '@mui/icons-material'
import SubmitButton from 'components/common/form/SubmitButton'
import StepSplitter from './common/StepSplitter'
import SocialShareList from 'components/common/SocialShareList'

export default function DonationFlowStatusPage({ slug }: { slug: string }) {
  const { data, isLoading } = useViewCampaign(slug)
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const [status, setStatus] = useState<DonationFormPaymentStatus | null>(null)
  const router = useRouter()
  const session = useSession()
  const { payment_intent_client_secret, payment_intent_id, bank_payment } = router.query

  useEffect(() => {
    if (bank_payment === 'true') {
      // If we are redirected on that page means that the payment is a bank payment and we can clear the form state
      sessionStorage.removeItem('donation-form')
      setStatus(DonationFormPaymentStatus.SUCCEEDED)
      return
    }
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
        if (paymentIntent?.status === DonationFormPaymentStatus.SUCCEEDED) {
          // If the status is succeeded we can clear the form state
          sessionStorage.removeItem('donation-form')
        }
        setStatus(paymentIntent?.status as DonationFormPaymentStatus)
      })
  }, [])

  return (
    <DonationFlowLayout campaign={data.campaign}>
      {status === DonationFormPaymentStatus.SUCCEEDED ? (
        <Box>
          <Typography textAlign="center" variant="h4" mb={1}>
            {session.data?.user?.name && ', благодарим ви, за доверието и подкрепата!'}
            Благодарим ви, за доверието и подкрепата!
          </Typography>
          <Typography display="flex" justifyContent="center" alignItems="center">
            <Email sx={{ mr: 1, fill: theme.palette.grey[400] }} />
            Пратихме Ви и мейл с повече информация на адреса, който сте посочили.
          </Typography>
          <SuccessGraphic />
          <Formik
            initialValues={{
              wish: '',
            }}
            onSubmit={(values) => {
              console.log(values)
            }}
            validateOnMount
            validateOnBlur>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="flex-end" flexDirection="column">
                  <Box width="100%">
                    <Typography variant="h5" mb={2} color={theme.palette.primary.dark}>
                      Помогнете на бенефициента/ите със добро пожелание:
                    </Typography>
                    <FormTextField
                      type="text"
                      name="wish"
                      label="Напишете пожелание..."
                      multiline
                      fullWidth
                      rows={7}
                    />
                  </Box>
                  <SubmitButton
                    // loading={submitPaymentLoading}
                    // disabled={!isValid || !stripe || !elements || submitPaymentLoading}
                    sx={{ mt: 1 }}
                    label="Изпрати"
                  />
                </Box>
              </Form>
            )}
          </Formik>
          <StepSplitter />
          <Box>
            <Typography variant="h5" mb={1}>
              Подкрепи на кампания като споделиш с приятели.
            </Typography>
            <Typography>
              Кампаниите сподели във вашите социални мрежи могат да съберат много повече средства
            </Typography>
            <SocialShareList
              url={`${window.location.host}${routes.campaigns.viewCampaignBySlug(slug)}`}
            />
          </Box>
        </Box>
      ) : (
        <Box height="calc(100vh - 88px)" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={100} />
        </Box>
      )}
    </DonationFlowLayout>
  )
}
