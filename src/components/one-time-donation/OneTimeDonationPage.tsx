import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'

import theme, { montserrat } from 'common/theme'
import { routes } from 'common/routes'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import Layout from 'components/layout/Layout'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'

import DonationStepper from './Steps'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { Appearance, loadStripe } from '@stripe/stripe-js'
import { useCreatePaymentIntent } from 'service/donation'
import { Currencies } from 'components/withdrawals/WithdrawalTypes'
import { useEffect } from 'react'
import getConfig from 'next/config'
const {
  publicRuntimeConfig: { STRIPE_PUBLIC_KEY },
} = getConfig()

const PREFIX = 'OneTimeDonationPage'

const classes = {
  bannerWrapper: `${PREFIX}-bannerWrapper`,
  banner: `${PREFIX}-banner`,
  beneficiaryAvatarWrapper: `${PREFIX}-beneficiaryAvatarWrapper`,
  beneficiaryAvatar: `${PREFIX}-beneficiaryAvatar`,
  stepperWrapper: `${PREFIX}-stepperWrapper`,
}

const StyledLayout = styled(Layout)(({ theme }) => ({
  [`& .${classes.bannerWrapper}`]: {
    '& span': {
      position: 'inherit !important',
    },
  },

  [`& .${classes.banner}`]: {
    zIndex: -1,
    maxHeight: '350px !important',
    marginTop: `${theme.spacing(10)} !important`,
    [theme.breakpoints.up('md')]: {
      marginTop: `${theme.spacing(14)} !important`,
    },
    objectFit: 'cover',
  },

  [`& .${classes.beneficiaryAvatarWrapper}`]: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },

  [`& .${classes.beneficiaryAvatar}`]: {
    borderRadius: '50%',
    border: `4px solid ${theme.palette.common.white} !important`,
    textAlign: 'center',
  },

  [`& .${classes.stepperWrapper}`]: {
    gap: theme.spacing(2),
    display: 'grid',
  },
}))

const scrollWindow = () => {
  const bannerWrapper = document.getElementsByClassName(classes.bannerWrapper)[0]
  const avatarWrapper = document.getElementsByClassName(classes.beneficiaryAvatarWrapper)[0]
  let calculatedScrollY = 0
  if (bannerWrapper && avatarWrapper) {
    calculatedScrollY = bannerWrapper.clientHeight + avatarWrapper.clientHeight / 2
  }
  window.scrollTo({ top: calculatedScrollY, behavior: 'smooth' })
}
const stripePromise = loadStripe(
  process.env.STRIPE_PUBLIC_KEY ||
    'pk_test_51HmiW8JLlnbRmnT5Kb8o0mPGXdD1zee0ev97LZoDeaBv6JnH7S2UDYMNNBnVJhnQlZKCPCQ6BEbqb6h7an8ameJO00P1Mis8mw',
)

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
export default function OneTimeDonation({ slug }: { slug: string }) {
  const mutation = useCreatePaymentIntent({ amount: 100, currency: Currencies.BGN })
  useEffect(() => {
    mutation.mutate()
  }, [])
  const { data, isLoading } = useViewCampaign(slug)
  const matches = useMediaQuery('sm')
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data

  const bannerSource = backgroundCampaignPictureUrl(campaign)
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  return (
    <StyledLayout maxWidth={false}>
      <Grid
        container
        component="section"
        maxWidth="lg"
        justifyContent="center"
        m="0 auto"
        marginTop={theme.spacing(matches ? 20 : 25)}>
        <Box className={classes.bannerWrapper}>
          {/* A11Y TODO: Translate alt text */}
          <Image
            src={bannerSource}
            alt="Campaign banner image"
            sizes="100vw"
            fill
            className={classes.banner}
          />
        </Box>
        <Grid
          item
          xs={12}
          justifyContent="center"
          p={4}
          className={classes.beneficiaryAvatarWrapper}>
          <Image
            src={beneficiaryAvatarSource}
            // A11Y TODO: Translate alt text
            alt={`Image of ${campaign.beneficiary.person?.firstName} ${campaign.beneficiary.person?.lastName}`}
            width={250}
            height={250}
            className={classes.beneficiaryAvatar}
          />
        </Grid>
        <Grid className={classes.stepperWrapper}>
          <Link href={routes.campaigns.viewCampaignBySlug(campaign.slug)} passHref>
            <Typography
              variant="h4"
              color="info.dark"
              sx={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
              {campaign.title}
            </Typography>
          </Link>
          <DonationStepper onStepChange={scrollWindow} />
        </Grid>
        {mutation.isLoading ? (
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
        )}
      </Grid>
    </StyledLayout>
  )
}
