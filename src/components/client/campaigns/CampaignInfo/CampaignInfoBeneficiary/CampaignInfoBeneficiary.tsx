import React from 'react'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { CampaignResponse } from 'gql/campaigns'

import { Button, Grid, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import { styled } from '@mui/material/styles'

import { beneficiaryCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { BeneficiaryType } from 'components/admin/beneficiary/BeneficiaryTypes'

const PREFIX = 'CampaignInfoOrganizer'

const classes = {
  infoButtonIcon: `${PREFIX}-infoButtonIcon`,
  personAvatar: `${PREFIX}-personAvatar`,
  avatarWrapper: `${PREFIX}-avatarWrapper`,
  trustedButton: `${PREFIX}-trustedButton`,
  organizer: `${PREFIX}-organizer`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.avatarWrapper}`]: {
    paddingLeft: theme.spacing(2.5),

    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(0),
    },
  },

  [`& .${classes.personAvatar}`]: {
    borderRadius: '50%',
    objectFit: 'cover',
  },

  [`& .${classes.trustedButton}`]: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: theme.spacing(1.75),
    padding: 0,
    paddingLeft: 2,

    '&:hover': {
      backgroundColor: 'unset',
      textDecoration: 'underline',
    },
  },

  [`& .${classes.infoButtonIcon}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.organizer}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontWight: 700,
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfoOrganizer({ campaign }: Props) {
  const { t } = useTranslation()
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)

  return (
    <StyledGrid container item gap={3}>
      <Grid item>
        <Image src={beneficiaryAvatarSource} alt={campaign.title} width={250} height={250} />
        <Typography variant="subtitle2" component="p">
          {campaign.beneficiary.type === BeneficiaryType.individual
            ? campaign.beneficiary.person?.firstName + ' ' + campaign.beneficiary.person?.lastName
            : campaign.beneficiary.company.companyName}
        </Typography>
      </Grid>
    </StyledGrid>
  )
}
