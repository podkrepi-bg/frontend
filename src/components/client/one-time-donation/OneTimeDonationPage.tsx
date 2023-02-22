import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import Layout from 'components/client/layout/Layout'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'

import DonationStepper from './Steps'
// import RadioAccordionGroup, { testRadioOptions } from 'components/donation-flow/common/RadioAccordionGroup'
// import RadioCardGroup, { testRadioOptions } from 'components/donation-flow/common/RadioCardGroup'
// import PaymentDetailsStripeForm from 'components/admin/donations/stripe/PaymentDetailsStripeForm'

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

export default function OneTimeDonation({ slug }: { slug: string }) {
  const { data, isLoading } = useViewCampaign(slug)
  const matches = useMediaQuery('sm')
  // const paymentIntentMutation = useCreatePaymentIntent({
  //   amount: 100,
  //   currency: 'BGN',
  // })
  // useEffect(() => {
  //   paymentIntentMutation.mutate()
  // }, [])
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
          {/* {paymentIntentMutation.isLoading ? (
            <CenteredSpinner size="2rem" />
          ) : (
            <PaymentDetailsStripeForm
              clientSecret={paymentIntentMutation.data?.data.client_secret as string}
              containerProps={{ maxWidth: 400 }}
            />
          )} */}
          <DonationStepper onStepChange={scrollWindow} />
          {/* <RadioCardGroup options={testRadioOptions} /> */}
          {/* <RadioAccordionGroup options={testRadioOptions} /> */}
        </Grid>
      </Grid>
    </StyledLayout>
  )
}
