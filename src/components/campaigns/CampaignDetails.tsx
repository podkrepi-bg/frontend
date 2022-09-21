import React from 'react'
import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import { BeneficiaryType } from 'components/beneficiary/BeneficiaryTypes'
import CampaignMessages from './CampaignMessages'
import CampaignSlider from './CampaignSlider'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
  campaignSliderUrls,
} from 'common/util/campaignImageUrls'
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
  bannerWrapper: `${PREFIX}-bannerWrapper`,
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  beneficiaryAvatarWrapper: `${PREFIX}-beneficiaryAvatarWrapper`,
  beneficiaryAvatar: `${PREFIX}-beneficiaryAvatar`,
  beneficiaryName: `${PREFIX}-beneficiaryName`,
  linkButton: `${PREFIX}-linkButton`,
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
    fontSize: theme.spacing(4),
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
    fontSize: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
    },
  },
  ['& .ql-editor']: {
    fontSize: theme.spacing(2),
    fontWeight: 500,
    fontFamily: 'Montserrat',
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
  const bannerSource = backgroundCampaignPictureUrl(campaign)
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  const sliderImages = campaignSliderUrls(campaign)

  return (
    <StyledGrid item xs={12} md={8}>
      <Grid className={classes.bannerWrapper}>
        <Image
          priority
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
          {campaign.beneficiary.type === BeneficiaryType.individual
            ? campaign.beneficiary.person.firstName + ' ' + campaign.beneficiary.person?.lastName
            : campaign.beneficiary.company.companyName}
        </Typography>
      </Grid>
      <Typography variant="h1" component="h1" my={8} className={classes.campaignTitle}>
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
          <CampaignMessages campaignId={campaign?.id} />
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
