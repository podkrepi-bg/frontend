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
  beneficiaryWrapper: `${PREFIX}-beneficiaryWrapper`,
  beneficiaryAvatar: `${PREFIX}-beneficiaryAvatar`,
  beneficiaryName: `${PREFIX}-beneficiaryName`,
  linkButton: `${PREFIX}-linkButton`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.bannerWrapper}`]: {
    position: 'inherit !important',
  },
  [`& .${classes.banner}`]: {
    zIndex: -1,
    maxHeight: '504px !important',
    marginTop: `${theme.spacing(10)} !important`,
    objectFit: 'cover',
  },

  [`& .${classes.campaignTitle}`]: {
    fontSize: theme.spacing(4),
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'initial',
    },
  },

  [`& .${classes.beneficiaryWrapper}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(47),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'initial',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(41),
    },

    '& span:first-of-type': {
      minWidth: '250px !important',
    },
  },

  [`& .${classes.beneficiaryAvatar}`]: {
    borderRadius: '50%',
    textAlign: 'center',
  },

  [`& .${classes.beneficiaryName}`]: {
    fontSize: theme.spacing(3),
    marginTop: theme.spacing(3),
    textAlign: 'center',

    '&::first-letter': {
      textTransform: 'uppercase',
    },
    [theme.breakpoints.up('md')]: {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'left',
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(2),
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
        {/* A11Y TODO: Translate alt text or get the alt text based on the image */}
        <Image
          priority
          src={bannerSource}
          alt="Campaign banner image"
          fill
          sizes="100vw"
          className={classes.banner}
        />
      </Grid>
      <Grid item className={classes.beneficiaryWrapper}>
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
