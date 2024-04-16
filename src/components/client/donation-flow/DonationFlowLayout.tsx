import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Typography, Box, Unstable_Grid2 as Grid2, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'

import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { routes } from 'common/routes'
import Layout from 'components/client/layout/Layout'
import { CampaignResponse } from 'gql/campaigns'

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
}))

function DonationFlowLayout({
  children,
  campaign,
}: PropsWithChildren<{ campaign: CampaignResponse }>) {
  const bannerSource = backgroundCampaignPictureUrl(campaign)
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  const matches = useMediaQuery('sm')
  return (
    <Layout maxWidth={false}>
      <Grid2
        container
        component="section"
        justifyContent="center"
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
          {children}
        </StyledStepsWrapper>
      </Grid2>
    </Layout>
  )
}

export default DonationFlowLayout
