import React from 'react'

import { useTranslation } from 'next-i18next'

import { CampaignResponse } from 'gql/campaigns'

import { bg, enUS } from 'date-fns/locale'

import { Button, Grid, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Assessment } from '@mui/icons-material'

import { getExactDate } from 'common/util/date'

const PREFIX = 'CampaignInfo'

const classes = {
  personWrapper: `${PREFIX}-personWrapper`,
  infoDetailsWrapper: `${PREFIX}-infoDetailsWrapper`,
  campaignTextWithIcon: `${PREFIX}-campaignTextWithIcon`,
  divider: `${PREFIX}-divider`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
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
  showExpensesLink: boolean
}

export default function CampaignInfo({ campaign, showExpensesLink }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS

  return (
    <StyledGrid mb={5}>
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
      {showExpensesLink && (
        <Grid item>
          <Button
            startIcon={<Assessment />}
            href={'#expenses'}
            className={classes.campaignTextWithIcon}>
            {t('campaigns:campaign.financial-report')}
          </Button>
        </Grid>
      )}
    </StyledGrid>
  )
}
