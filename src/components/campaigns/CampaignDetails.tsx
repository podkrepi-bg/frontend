import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import LatestNews from './LatestNews'
import CampaignComments from './CampaignComments'
import CampaignSlider from './CampaignSlider'
import { Grid, Typography } from '@mui/material'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
  coordinatorCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import { getExactDate } from 'common/util/date'

const PREFIX = 'CampaignDetails'

const classes = {
  bannerWrapper: `${PREFIX}-bannerWrapper`,
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  campaignSubtitle: `${PREFIX}-campaignSubtitle`,
  beneficiaryAvatarWrapper: `${PREFIX}-beneficiaryAvatarWrapper`,
  beneficiaryAvatar: `${PREFIX}-beneficiaryAvatar`,
  campaignInfoWrapper: `${PREFIX}-campaignInfoWrapper`,
  coordinatorAvatar: `${PREFIX}-coordinatorAvatar`,
  campaignDate: `${PREFIX}-campaignDate`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.bannerWrapper}`]: {
    '& span': {
      position: 'inherit !important',
    },
  },

  [`& .${classes.banner}`]: {
    zIndex: -1,
    minHeight: '504px !important',
    marginTop: `${theme.spacing(10)} !important`,
    [theme.breakpoints.up('md')]: {
      marginTop: `${theme.spacing(14)} !important`,
    },
  },

  [`& .${classes.campaignTitle}`]: {
    color: theme.palette.common.white,
    fontWeight: 500,
    margin: 0,
  },

  [`& .${classes.campaignSubtitle}`]: {
    color: theme.palette.common.white,
    padding: theme.spacing(0, 4.7),
    fontSize: theme.spacing(4),
    height: theme.spacing(16),
  },

  [`& .${classes.beneficiaryAvatarWrapper}`]: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },

  [`& .${classes.beneficiaryAvatar}`]: {
    borderRadius: '50%',
    border: `4px solid ${theme.palette.common.white} !important`,
    textAlign: 'center',
  },

  [`& .${classes.campaignInfoWrapper}`]: {
    gap: theme.spacing(2),
    display: 'grid',
  },

  [`& .${classes.coordinatorAvatar}`]: {
    borderRadius: '50%',
  },

  [`& .${classes.campaignDate}`]: {
    fontSize: '14px',
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignDetails({ campaign }: Props) {
  const { t } = useTranslation()

  const bannerSource = backgroundCampaignPictureUrl(campaign)
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  const coordinatorAvatarSource = coordinatorCampaignPictureUrl(campaign)

  return (
    <StyledGrid item xs={12} md={8}>
      <Grid className={classes.bannerWrapper}>
        <Image
          src={bannerSource}
          alt="Campaign banner image"
          layout="fill"
          objectFit="cover"
          className={classes.banner}
        />
      </Grid>
      <Typography paragraph variant="h2" component="h1" p={4} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <Typography
        paragraph
        variant="subtitle1"
        component="p"
        p={4}
        className={classes.campaignSubtitle}>
        Subheader {/* This value has to come from db */}
      </Typography>
      <Grid item p={4} className={classes.beneficiaryAvatarWrapper}>
        <Image
          src={beneficiaryAvatarSource}
          alt={campaign.title}
          width={250}
          height={250}
          className={classes.beneficiaryAvatar}
        />
      </Grid>
      <Grid className={classes.campaignInfoWrapper}>
        <Typography variant="body1" component="p" className={classes.campaignDate}>
          {t('campaigns:campaign.start-date')} {getExactDate(campaign.startDate)}
        </Typography>
        <Typography variant="body1" component="p" className={classes.campaignDate}>
          {t('campaigns:campaign.end-date')} {getExactDate(campaign.endDate)}
        </Typography>

        <Typography variant="h6" component="p">
          {t('campaigns:campaign.description')}
        </Typography>
        <Typography variant="body1" component="p">
          {campaign.description}
        </Typography>
        <CampaignSlider />
        <Typography variant="h6" component="h6">
          {t('campaigns:campaign.coordinator.name')}
        </Typography>
        <Grid container alignItems="center" gap={4}>
          <Image
            src={coordinatorAvatarSource}
            alt={campaign.title}
            width={100}
            height={100}
            className={classes.coordinatorAvatar}
          />
          <Typography variant="h6" component="h6">
            {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
          </Typography>
        </Grid>
        <LatestNews />
        <CampaignComments />
      </Grid>
    </StyledGrid>
  )
}
