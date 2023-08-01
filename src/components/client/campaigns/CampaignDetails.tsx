import React, { memo } from 'react'

import dynamic from 'next/dynamic'

import { CampaignResponse } from 'gql/campaigns'

import 'react-quill/dist/quill.bubble.css'

import { Divider, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import CampaignSlider from './CampaignSlider'
import CampaignInfo from './CampaignInfo'
import CampaignInfoGraphics from './CampaignInfoGraphics'
import CampaignInfoOperator from './CampaignInfoOperator'
import { campaignSliderUrls } from 'common/util/campaignImageUrls'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const PREFIX = 'CampaignDetails'

const classes = {
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  linkButton: `${PREFIX}-linkButton`,
  securityIcon: `${PREFIX}-securityIcon`,
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
    marginTop: theme.spacing(6),
    letterSpacing: '-1.5px',
    fontSize: theme.typography.pxToRem(32),
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(45),
      marginTop: 0,
      marginBottom: theme.spacing(7),
    },
  },

  ['& .ql-editor']: {
    fontSize: theme.spacing(2),
    fontWeight: 500,
    lineHeight: theme.spacing(4),
    paddingLeft: '0',
    paddingRight: '0',
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default memo(function CampaignDetails({ campaign }: Props) {
  const sliderImages = campaignSliderUrls(campaign)

  return (
    <StyledGrid>
      <Typography variant="h1" component="h1" mb={8} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <CampaignInfo campaign={campaign} showExpensesLink={true} />
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
          <CampaignInfoOperator campaign={campaign} />
        </Grid>
        <CampaignInfoGraphics />
      </Grid>
    </StyledGrid>
  )
})
