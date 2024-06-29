import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
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
import FailGraphic from './icons/FailGraphic'
import getConfig from 'next/config'
import { useFindDonationById } from 'common/hooks/donation'
const { publicRuntimeConfig } = getConfig()
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
  const { t } = useTranslation('donation-flow')
  const { data } = useViewCampaign(slug)
  //This query needs to be prefetched in the pages folder
  //otherwise on the first render the data will be undefined
  const router = useRouter()
  const { p_status, p_error, payment_intent, bank_payment } = router.query
  const campaign = data?.campaign as CampaignResponse
  const [status] = useState<DonationFormPaymentStatus | null>(p_status as DonationFormPaymentStatus)
  const { data: donationData, isLoading } = useFindDonationById(payment_intent as string)

  const [error] = useState<string | undefined>(p_error as string)
  const [disableWishForm, setDisableWishForm] = useState<boolean>(
    (!isLoading && !donationData) || !!bank_payment,
  )

  const formikRef = useRef<FormikProps<{ wish: string }> | null>(null)
  const session = useSession()
  const { data: { user: person } = { user: null } } = useCurrentPerson()

  useEffect(() => {
    if (p_status === 'succeeded') {
      sessionStorage.removeItem(`donation-flow-${campaign.slug}`)
    }
  }, [])
  const { mutate: createDonationWishMutate, isLoading: isWishSendLoading } = useMutation(
    createDonationWish,
    {
      onSuccess: () => {
        setDisableWishForm(true)
        AlertStore.show(t('status.success.wish.thanks'), 'success', 3000)
        formikRef.current?.resetForm()
      },
      onError: () => {
        setDisableWishForm(false)
        AlertStore.show(t('status.success.wish.error'), 'error')
      },
    },
  )

  const Success = () => (
    <Box>
      <Typography textAlign="center" variant="h4" component="h1" mb={1}>
        {session.data?.user
          ? `${session.data?.user?.given_name} ${session.data.user.family_name}, ${t(
              'status.success.title-logged',
            )}`
          : t('status.success.title')}
        !
      </Typography>
      <Typography display="flex" justifyContent="center" alignItems="center">
        <Email sx={{ mr: 1, fill: theme.palette.grey[400] }} />
        {t('status.success.email')}
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
            donationId: donationData?.id,
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
                  {t('status.success.wish.title')}:
                </Typography>
                <FormTextField
                  type="text"
                  name="wish"
                  label={`${t('status.success.wish.write')}...`}
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
                label={t('status.success.wish.send')}
              />
            </Stack>
          </Form>
        )}
      </Formik>
      <StepSplitter />
      <Stack alignItems="flex-end">
        <Box width="100%">
          <Typography variant="h5" mb={1}>
            {t('status.success.share.title')}.
          </Typography>
          <Typography mb={1}>{t('status.success.share.description')}!</Typography>
        </Box>
        <SocialShareListButton
          url={`${publicRuntimeConfig.APP_URL}${routes.campaigns.viewCampaignBySlug(slug)}`}
        />
      </Stack>
      <StepSplitter />
      <Grid2 spacing={2} container>
        <Grid2 xs={12} md={6}>
          <LinkCard
            href={routes.campaigns.viewCampaignBySlug(slug)}
            text={t('status.success.link.return')}
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <LinkCard href={routes.campaigns.index} text={t('status.success.link.see')} />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <LinkCard href={routes.profile.index} text={t('status.success.link.donations')} />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <LinkCard href={routes.support} text={t('status.success.link.volunteer')} />
        </Grid2>
      </Grid2>
    </Box>
  )

  const Fail = () => (
    <Box>
      <Typography textAlign="center" variant="h4" mb={1}>
        {t('status.fail.title')}
      </Typography>
      {/* TODO: Provide a better <FailGraphic> instead of just an X */}
      <FailGraphic
        sx={{
          width: '100%',
          height: 'auto',
          maxHeight: '220px',
          my: 2,
        }}
      />
      <Typography color={theme.palette.error.dark} mb={1}>
        {error}
      </Typography>
      <StepSplitter />
      <Grid2 spacing={2} container>
        <Grid2 xs={12} md={6}>
          <LinkCard
            href={routes.campaigns.oneTimeDonation(slug)}
            text={t('status.fail.link.retry')}
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <LinkCard
            href={routes.campaigns.viewCampaignBySlug(slug)}
            text={t('status.fail.link.return')}
          />
        </Grid2>
      </Grid2>
    </Box>
  )

  const StatusToRender = () =>
    status === DonationFormPaymentStatus.SUCCEEDED ? <Success /> : error ? <Fail /> : null

  return (
    <DonationFlowLayout campaign={campaign} maxWidth={'960px'}>
      {status ? (
        <StatusToRender />
      ) : (
        <Box height="calc(80vh - 88px)" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={100} />
        </Box>
      )}
    </DonationFlowLayout>
  )
}
