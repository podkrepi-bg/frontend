import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import CampaignMessages from './CampaignMessages'
import CampaignSlider from './CampaignSlider'
import { Grid, Typography } from '@mui/material'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
  coordinatorCampaignPictureUrl,
} from 'common/util/campaignImageUrls'

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
  beneficiaryName: `${PREFIX}-beneficiaryName`,
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
  },

  [`& .${classes.campaignTitle}`]: {
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
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(41.125),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      flexDirection: 'initial',
    },
  },

  [`& .${classes.beneficiaryAvatar}`]: {
    borderRadius: '50%',
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
    fontSize: theme.spacing(2),
  },

  [`& .${classes.beneficiaryName}`]: {
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(4),
    },
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

  const startDate = new Date(campaign.startDate)
  const formattedStartDate = startDate.toLocaleDateString('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: '2-digit',
  })

  const endDate = new Date(campaign.endDate)
  const formattedEndDate = endDate.toLocaleDateString('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: '2-digit',
  })

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
      <Grid item py={4} className={classes.beneficiaryAvatarWrapper}>
        <Image
          src={beneficiaryAvatarSource}
          alt={campaign.title}
          width={250}
          height={250}
          className={classes.beneficiaryAvatar}
        />
        <Typography variant="subtitle2" component="p" className={classes.beneficiaryName}>
          {campaign.beneficiary.person.firstName}
        </Typography>
      </Grid>
      <Typography paragraph variant="h2" component="h2" py={4} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <Grid container justifyContent="space-between" mb={4}>
        <Typography variant="subtitle2" component="p" className={classes.campaignDate}>
          {t('campaigns:campaign.start-date')} {formattedStartDate}
        </Typography>
        <Typography variant="subtitle2" component="p" className={classes.campaignDate}>
          {t('campaigns:campaign.end-date')} {formattedEndDate}
        </Typography>
      </Grid>
      <Grid className={classes.campaignInfoWrapper}>
        <Typography variant="subtitle2" component="p">
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
        <CampaignMessages />
      </Grid>
    </StyledGrid>
  )
}
