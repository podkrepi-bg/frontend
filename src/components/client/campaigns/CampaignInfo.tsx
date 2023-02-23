import React from 'react'

import { useTranslation } from 'next-i18next'

import { CampaignResponse } from 'gql/campaigns'

import { bg, enUS } from 'date-fns/locale'

import { Grid, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import { getExactDate } from 'common/util/date'
import CampaignInfoOrganizer from './CampaignInfoOrganizer'

const PREFIX = 'CampaignInfo'

const classes = {
  personWrapper: `${PREFIX}-personWrapper`,
  infoBlockWrapper: `${PREFIX}-infoBlockWrapper`,
  infoDetailsWrapper: `${PREFIX}-infoDetailsWrapper`,
  campaignTextWithIcon: `${PREFIX}-campaignTextWithIcon`,
  divider: `${PREFIX}-divider`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.infoBlockWrapper}`]: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    rowSpacing: theme.spacing(5),
    gap: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'initial',
      gap: 0,
    },
  },

  [`& .${classes.divider}`]: {
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 0,

    [theme.breakpoints.up('lg')]: {
      borderRightWidth: 1,
      margin: theme.spacing(0, 5, 0, 0),
    },
  },

  [`& .${classes.infoDetailsWrapper}`]: {
    flexDirection: 'column',
  },

  [`& .${classes.campaignTextWithIcon}`]: {
    flexWrap: 'wrap',
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '150%',
    fontWeight: 700,
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfo({ campaign }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS

  return (
    <StyledGrid mb={5}>
      <Grid container item xs={12} className={classes.infoBlockWrapper}>
        <Grid item container xs={12} lg={5} spacing={0} className={classes.infoDetailsWrapper}>
          <Grid item>
            <Typography
              variant="subtitle2"
              component="p"
              fontWeight={700}
              className={classes.campaignTextWithIcon}>
              {campaign.campaignType.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" component="p" className={classes.campaignTextWithIcon}>
              {t('campaigns:campaign.start-date')} {getExactDate(campaign.startDate, locale)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" component="p" className={classes.campaignTextWithIcon}>
              {t('campaigns:campaign.end-date')}{' '}
              {campaign.endDate
                ? getExactDate(campaign.endDate, locale)
                : t('campaigns:campaign.indefinite')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" component="p" className={classes.campaignTextWithIcon}>
              {t('campaigns:campaign.status')} {t(`campaigns:campaign-status.${campaign.state}`)}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} lg={7}>
          <CampaignInfoOrganizer campaign={campaign} />
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
