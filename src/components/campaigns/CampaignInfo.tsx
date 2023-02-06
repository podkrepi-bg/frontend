import React from 'react'
import { useTranslation } from 'next-i18next'
import { bg, enUS } from 'date-fns/locale'

import { CampaignResponse } from 'gql/campaigns'
import { Grid, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { getExactDate } from 'common/util/date'
import CampaignInfoOrganizer from './CampaignInfoOrganizer'

const PREFIX = 'CampaignInfo'

const classes = {
  personWrapper: `${PREFIX}-personWrapper`,
  infoBlockWrapper: `${PREFIX}-infoBlockWrapper`,
  infoDetailsWrapper: `${PREFIX}-infoDetailsWrapper`,
  campaignText: `${PREFIX}-campaignText`,
  campaignTextWithIcon: `${PREFIX}-campaignTextWithIcon`,
  divider: `${PREFIX}-divider`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.infoBlockWrapper}`]: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    rowSpacing: theme.spacing(5),
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'initial',
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

  [`& .${classes.campaignText}`]: {
    fontSize: theme.spacing(1.75),
    flexWrap: 'wrap',
  },

  [`& .${classes.campaignTextWithIcon}`]: {
    fontSize: theme.spacing(1.75),
    flexWrap: 'wrap',
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
      <Grid container item xs={12} gap={0} className={classes.infoBlockWrapper}>
        <Grid item container xs={4} spacing={0} className={classes.infoDetailsWrapper}>
          <Grid item>
            <Typography
              variant="subtitle2"
              component="p"
              display="block"
              gap="5px"
              className={classes.campaignTextWithIcon}>
              {campaign.campaignType.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle2"
              component="p"
              display="flex"
              gap="5px"
              className={classes.campaignTextWithIcon}>
              <strong>{t('campaigns:campaign.start-date')}</strong>
              {getExactDate(campaign.startDate, locale)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" component="p" className={classes.campaignTextWithIcon}>
              <strong>{t('campaigns:campaign.end-date')}</strong>{' '}
              {campaign.endDate ? getExactDate(campaign.endDate, locale) : 'безсрочна'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" component="p" className={classes.campaignText}>
              <strong>{t('campaigns:campaign.status')}</strong>{' '}
              {t(`campaigns:campaign-status.${campaign.state}`)}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={8}>
          <CampaignInfoOrganizer campaign={campaign} />
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
