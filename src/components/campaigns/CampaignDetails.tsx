import React from 'react'
import { CampaignResponse } from 'gql/campaigns'
import DonationWishes from './DonationWishes'
import CampaignSlider from './CampaignSlider'
import { campaignSliderUrls } from 'common/util/campaignImageUrls'
import CampaignInfo from './CampaignInfo'
import { styled } from '@mui/material/styles'
import { Divider, Grid, Typography } from '@mui/material'
import CampaignInfoCoordinator from './CampaignInfoCoordinator'
import SecurityIcon from '@mui/icons-material/Security'
import { useTranslation } from 'next-i18next'
import LinkButton from 'components/common/LinkButton'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.bubble.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const PREFIX = 'CampaignDetails'

const classes = {
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  linkButton: `${PREFIX}-linkButton`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.banner}`]: {
    zIndex: -1,
    maxHeight: '504px !important',
    marginTop: `${theme.spacing(10)} !important`,
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      marginTop: `${theme.spacing(30.5)} !important`,
    },
  },

  [`& .${classes.campaignTitle}`]: {
    fontFamily: "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: theme.typography.pxToRem(45),
    letterSpacing: '-1.5px',
  },

  ['& .ql-editor']: {
    fontSize: theme.spacing(2),
    fontWeight: 500,
    lineHeight: theme.spacing(4),
    paddingLeft: '0',
    paddingRight: '0',
  },
  [`& .${classes.linkButton}`]: {
    textDecoration: 'underline',
    fontSize: theme.spacing(1.5),
    color: 'initial',
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignDetails({ campaign }: Props) {
  const { t } = useTranslation()
  const sliderImages = campaignSliderUrls(campaign)

  return (
    <StyledGrid item xs={12} md={8}>
      <Typography variant="h1" component="h1" mb={8} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <CampaignInfo campaign={campaign} />
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <ReactQuill readOnly theme="bubble" value={campaign.description} />
        </Grid>
        <Grid item xs={12}>
          <CampaignSlider sliderImages={sliderImages} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <CampaignInfoCoordinator campaign={campaign} />
        </Grid>
        <Grid item xs={12}>
          <DonationWishes campaignId={campaign?.id} />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <LinkButton
              startIcon={<SecurityIcon color="action" />}
              href={'/contact'}
              className={classes.linkButton}>
              {t('campaigns:campaign.feedback')}
            </LinkButton>
          </Grid>
          <Grid item xs={12}>
            <LinkButton
              startIcon={<SecurityIcon color="action" />}
              href={`/campaigns/${campaign.slug}/irregularity`}
              className={classes.linkButton}>
              {t('campaigns:campaign.report-irregularity')}
            </LinkButton>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
