import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Box, Unstable_Grid2 as Grid2, Typography, useMediaQuery } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import { useViewCampaign } from 'common/hooks/campaigns'
import Layout from 'components/layout/Layout'
import CenteredSpinner from 'components/common/CenteredSpinner'

import { DonationFlowForm } from './DonationFlowForm'
import { DonationFlowProvider } from './DonationFlowContext'
import { StripeElementsProvider } from './StripeElementsProvider'

const StyledBannerWrapper = styled(Box)(() => ({
  '& span': {
    position: 'inherit !important',
  },
}))

const StyledBanner = styled(Image)(({ theme }) => ({
  zIndex: -1,
  maxHeight: '350px !important',
  marginTop: `${theme.spacing(10)} !important`,
  [theme.breakpoints.up('md')]: {
    marginTop: `${theme.spacing(14)} !important`,
  },
  objectFit: 'cover',
}))

const StyledBeneficiaryAvatarWrapper = styled(Grid2)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'center',
  },
}))

const StyledBeneficiaryAvatar = styled(Image)(({ theme }) => ({
  borderRadius: '50%',
  border: `4px solid ${theme.palette.common.white} !important`,
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    border: `4px solid ${theme.palette.common.white} !important`,
  },
}))

const StyledStepsWrapper = styled(Grid2)(() => ({
  width: '100%',
  maxWidth: '960px',
}))

export default function DonationFlowPage({ slug }: { slug: string }) {
  const { data, isLoading } = useViewCampaign(slug)
  const matches = useMediaQuery('sm')
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data

  const bannerSource = backgroundCampaignPictureUrl(campaign)
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  return (
    <DonationFlowProvider>
      <StripeElementsProvider>
        <Layout maxWidth={false}>
          <Grid2
            container
            component="section"
            maxWidth="lg"
            justifyContent="center"
            m="0 auto"
            marginTop={theme.spacing(matches ? 20 : 25)}>
            <StyledBannerWrapper>
              {/* A11Y TODO: Translate alt text */}
              <StyledBanner src={bannerSource} alt="Campaign banner image" sizes="100vw" fill />
            </StyledBannerWrapper>
            <StyledBeneficiaryAvatarWrapper xs={12} justifyContent="center" p={4}>
              <StyledBeneficiaryAvatar
                src={beneficiaryAvatarSource}
                alt={`Image of ${campaign.beneficiary.person?.firstName} ${campaign.beneficiary.person?.lastName}`}
                width={250}
                height={250}
              />
            </StyledBeneficiaryAvatarWrapper>

            <StyledStepsWrapper>
              <Link href={routes.campaigns.viewCampaignBySlug(campaign.slug)} passHref>
                <Typography
                  variant="h4"
                  color="info.dark"
                  sx={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
                  {campaign.title}
                </Typography>
              </Link>
              <DonationFlowForm />
            </StyledStepsWrapper>
          </Grid2>
        </Layout>
      </StripeElementsProvider>
    </DonationFlowProvider>
  )
}
