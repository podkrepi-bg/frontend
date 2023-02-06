import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Form, Formik, FormikProps } from 'formik'
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Unstable_Grid2 as Grid2,
} from '@mui/material'
import { Email } from '@mui/icons-material'

import { stripe } from 'service/stripeClient'
import { routes } from 'common/routes'

import { useViewCampaign } from 'common/hooks/campaigns'
import FormTextField from 'components/common/form/FormTextField'
import SocialShareListButton from 'components/common/SocialShareListButton'
import SubmitButton from 'components/common/form/SubmitButton'
import theme from 'common/theme'

import SuccessGraphic from './icons/SuccessGraphic'
import { DonationFormPaymentStatus } from './helpers/types'
import DonationFlowLayout from './DonationFlowLayout'
import StepSplitter from './common/StepSplitter'
import { useMutation } from '@tanstack/react-query'
import { createDonationWish } from 'service/donationWish'
import { AlertStore } from 'stores/AlertStore'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import { CampaignResponse } from 'gql/campaigns'

function LinkCard({ href, text }: { href: string; text: string }) {
  return (
    <Card sx={{ backgroundColor: '#eee' }}>
      <CardActionArea sx={{ p: 3 }} LinkComponent={Link} href={href}>
        <CardContent>
          <Typography textAlign="center" variant="h6" component="div">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function DonationFlowStatusPage({ slug }: { slug: string }) {
  const { data } = useViewCampaign(slug)
  //This query needs to be prefetched in the pages folder
  //otherwise on the first render the data will be undefined
  const campaign = data?.campaign as CampaignResponse
  const [status, setStatus] = useState<DonationFormPaymentStatus | null>(null)
  const [disableWishForm, setDisableWishForm] = useState<boolean>(false)
  const router = useRouter()
  const formikRef = useRef<FormikProps<{ wish: string }> | null>(null)
  const session = useSession()
  const { data: { user: person } = { user: null } } = useCurrentPerson()
  const { mutate: createDonationWishMutate, isLoading: isWishSendLoading } = useMutation(
    createDonationWish,
    {
      onSuccess: () => {
        setDisableWishForm(true)
        AlertStore.show('Благодарим ви за желанието ви!', 'success', 3000)
        formikRef.current?.resetForm()
      },
      onError: () => {
        setDisableWishForm(false)
        AlertStore.show('Не можахме да запазим желанието ви. Моля опитайте отново.', 'error')
      },
    },
  )
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
          router.push(routes.campaigns.donation(slug), {
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
    <DonationFlowLayout campaign={campaign}>
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
              createDonationWishMutate({
                message: values.wish,
                campaignId: campaign.id,
                personId: person?.id ? person.id : null,
              })
            }}
            validateOnMount
            validateOnBlur
            innerRef={formikRef}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Stack alignItems="flex-end" direction="column">
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
                      disabled={disableWishForm}
                      rows={7}
                    />
                  </Box>
                  <SubmitButton
                    loading={isWishSendLoading}
                    disabled={disableWishForm || isWishSendLoading}
                    sx={{ mt: 1 }}
                    label="Изпрати"
                  />
                </Stack>
              </Form>
            )}
          </Formik>
          <StepSplitter />
          <Stack alignItems="flex-end">
            <Box width="100%">
              <Typography variant="h5" mb={1}>
                Подкрепи на кампания като споделиш с приятели.
              </Typography>
              <Typography mb={1}>
                Кампаниите сподели във вашите социални мрежи могат да съберат много повече средства
              </Typography>
            </Box>
            <SocialShareListButton
              url={`${window.location.host}${routes.campaigns.viewCampaignBySlug(slug)}`}
            />
          </Stack>
          <StepSplitter />
          <Grid2 spacing={2} container>
            <Grid2 xs={12} md={6}>
              <LinkCard href={routes.campaigns.viewCampaignBySlug(slug)} text="Виж кампанията" />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <LinkCard href={routes.campaigns.index} text="Виж други кампании" />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <LinkCard href={routes.profile.index} text="Твоите дарения" />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <LinkCard href={routes.support} text="Стани доброволец" />
            </Grid2>
          </Grid2>
        </Box>
      ) : (
        <Box height="calc(100vh - 88px)" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={100} />
        </Box>
      )}
    </DonationFlowLayout>
  )
}
