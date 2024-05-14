import Link from 'next/link'

import { Grid, Typography } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import { beneficiaryCampaignPictureUrl } from 'common/util/campaignImageUrls'
import Layout from 'components/client/layout/Layout'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'
import dynamic from 'next/dynamic'

import {
  BeneficiaryAvatar,
  BeneficiaryAvatarWrapper,
  StepperWrapper,
} from './OneTimeDonation.styles'

// import RadioAccordionGroup, { testRadioOptions } from 'components/donation-flow/common/RadioAccordionGroup'
// import RadioCardGroup, { testRadioOptions } from 'components/donation-flow/common/RadioCardGroup'
// import PaymentDetailsStripeForm from 'components/admin/donations/stripe/PaymentDetailsStripeForm'

const scrollWindow = () => {
  window.scrollTo({ top: 200, behavior: 'smooth' })
}

const DonationStepper = dynamic(() => import('../Steps'), { ssr: false })

export default function OneTimeDonation({ slug }: { slug: string }) {
  const { data, isLoading } = useViewCampaign(slug)
  // const paymentIntentMutation = useCreatePaymentIntent({
  //   amount: 100,
  //   currency: 'BGN',
  // })
  // useEffect(() => {
  //   paymentIntentMutation.mutate()
  // }, [])
  if (isLoading || !data) return <CenteredSpinner size="2rem" />

  const { campaign } = data

  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign.campaignFiles)

  return (
    <Layout maxWidth={false}>
      <Grid container component="section" maxWidth="lg" justifyContent="center" m="0 auto">
        <BeneficiaryAvatarWrapper item xs={12} p={4}>
          <BeneficiaryAvatar
            src={beneficiaryAvatarSource}
            // A11Y TODO: Translate alt text
            alt={`Image of ${campaign.beneficiary.person?.firstName} ${campaign.beneficiary.person?.lastName}`}
            width={250}
            height={250}
          />
        </BeneficiaryAvatarWrapper>
        <StepperWrapper>
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
        </StepperWrapper>
      </Grid>
    </Layout>
  )
}
