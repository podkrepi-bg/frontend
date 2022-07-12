import React from 'react'
import { useTranslation } from 'next-i18next'
import { bg, enUS } from 'date-fns/locale'

import { CampaignResponse } from 'gql/campaigns'
import { Grid, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
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
  stateActiveDivider: `${PREFIX}-stateActiveDivider`,
  stateCompletedDivider: `${PREFIX}-stateCompletedDivider`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.infoBlockWrapper}`]: {
    flexWrap: 'wrap',
    flexDirection: 'column',
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
    order: '-1',
    [theme.breakpoints.up('lg')]: {
      order: '2',
    },
  },

  [`& .${classes.campaignText}`]: {
    fontSize: theme.spacing(1.8),
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(3.5),
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.spacing(2),
    },
  },

  [`& .${classes.campaignTextWithIcon}`]: {
    fontSize: theme.spacing(1.8),
    flexWrap: 'wrap',
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.spacing(2),
    },
  },

  [`& .${classes.stateActiveDivider}`]: {
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#00FF00',
    marginLeft: theme.spacing(3.5),
    width: '145px',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  [`& .${classes.stateCompletedDivider}`]: {
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#00FF00',
    marginLeft: theme.spacing(3.5),
    width: '163px',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
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
      <Grid container gap={0} className={classes.infoBlockWrapper}>
        <Grid item xs={12} lg={5}>
          <CampaignInfoOrganizer campaign={campaign} />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container item xs={12} lg={6} mb={4} className={classes.infoDetailsWrapper}>
          <Typography
            variant="subtitle2"
            component="p"
            display="block"
            gap="5px"
            className={classes.campaignTextWithIcon}>
            <FavoriteIcon color="action" sx={{ mb: '-6px', mr: '3px' }} />
            <strong>
              {t('campaigns:filters.' + `${campaign.campaignType.category}`)}/{' '}
              {t('campaigns:campaign.types.' + `${campaign.campaignType?.slug}`)}
            </strong>
          </Typography>
          {/* TODO: Dynamic campaign tagging is needed here based on activity (urgent, hot, the long-shot, etc) 
         <Typography
         variant="subtitle2"
         component="p"
         display="flex"
         className={classes.campaignText}>
         <WhatshotIcon color="action" />
         <strong>{t('campaigns:campaign.profile')}</strong>Спешна
        </Typography>  */}
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.status')}</strong>{' '}
            {t(`campaigns:campaign-status.${campaign.state}`)}
          </Typography>
          {campaign.state === 'active' ? (
            <Divider className={classes.stateActiveDivider} />
          ) : (
            <Divider className={classes.stateCompletedDivider} />
          )}
          <Typography
            variant="subtitle2"
            component="p"
            display="flex"
            gap="5px"
            pr={2}
            className={classes.campaignTextWithIcon}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <strong>{t('campaigns:campaign.start-date')}</strong>{' '}
            {getExactDate(campaign.startDate, locale)}
          </Typography>
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.end-date')}</strong>{' '}
            {campaign.endDate ? getExactDate(campaign.endDate, locale) : 'не е въведена'}
          </Typography>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
