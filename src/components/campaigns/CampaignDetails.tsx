import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'
import CampaignMessages from './CampaignMessages'
import CampaignSlider from './CampaignSlider'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import CampaignInfo from './CampaignInfo'
import { styled } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.bubble.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const PREFIX = 'CampaignDetails'

const classes = {
  bannerWrapper: `${PREFIX}-bannerWrapper`,
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  beneficiaryAvatarWrapper: `${PREFIX}-beneficiaryAvatarWrapper`,
  beneficiaryAvatar: `${PREFIX}-beneficiaryAvatar`,
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
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'initial',
    },
  },

  [`& .${classes.beneficiaryAvatarWrapper}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(47),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      flexDirection: 'initial',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(41),
    },
  },

  [`& .${classes.beneficiaryAvatar}`]: {
    borderRadius: '50%',
    textAlign: 'center',
  },

  [`& .${classes.beneficiaryName}`]: {
    fontSize: theme.spacing(4),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(8),
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
      <Grid item className={classes.beneficiaryAvatarWrapper}>
        <Image
          src={beneficiaryAvatarSource}
          alt={campaign.title}
          width={250}
          height={250}
          className={classes.beneficiaryAvatar}
        />
        <Typography variant="subtitle2" component="p" className={classes.beneficiaryName}>
          {campaign.beneficiary.person.firstName} {campaign.beneficiary.person.lastName}
        </Typography>
      </Grid>
      <Typography paragraph variant="h2" component="h2" my={8} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <CampaignInfo campaign={campaign} />
      <Grid>
        <ReactQuill readOnly theme="bubble" value={campaign.description} />
        <CampaignSlider />
        <CampaignMessages />
      </Grid>
    </StyledGrid>
  )
}
