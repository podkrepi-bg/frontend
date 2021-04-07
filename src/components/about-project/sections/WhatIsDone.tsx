import React from 'react'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'

import VolunteersIcon from '../icons/VolunteersIcon'
import MeetingsIcon from '../icons/MeetingsIcon'
import InvestedHoursIcon from '../icons/InvestedHoursIcon'
import NameSuggestionIcon from '../icons/NameSuggestionIcon'
import ActivityIcon from '../icons/ActivityIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      fontSize: theme.typography.pxToRem(40),
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    icons: {
      marginBottom: theme.spacing(5),
    },
    list: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
      '& span': {
        fontSize: theme.typography.pxToRem(17.6),
        textAlign: 'start',
      },
    },
    checkedLine: {
      display: 'flex',
      marginBottom: theme.spacing(1.5),
      marginRight: theme.spacing(2),
      '& span': {
        marginLeft: theme.spacing(1.5),
      },
    },
  }),
)

export default function WhatIsDone() {
  const { t } = useTranslation()
  const classes = useStyles()

  const leftColumnLabels = [
    t('about-project:volunteers'),
    t('about-project:meetings'),
    t('about-project:infoSite'),
    t('about-project:businessModel'),
    t('about-project:organizationWork'),
    t('about-project:hostingPartners'),
  ]
  const rightColumnLabels = [
    t('about-project:nameSuggestions'),
    t('about-project:internalMeetings'),
    t('about-project:npoConversations'),
    t('about-project:featuresList'),
    t('about-project:trademark'),
    t('about-project:association'),
  ]

  const renderCheckedLine = (label: string, index: number) => (
    <Grid key={index} item className={classes.checkedLine}>
      <CheckIcon />
      <Typography variant="body2" component="span">
        {label}
      </Typography>
    </Grid>
  )

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h4" component="h2" className={classes.heading}>
        {t('about-project:whatIsDoneTitle')}
      </Typography>
      <Grid item container className={classes.icons}>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            Icon={VolunteersIcon}
            count="700+"
            description={t('about-project:volunteersIcon')}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            Icon={MeetingsIcon}
            count="50+"
            description={t('about-project:meetingsIcon')}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            Icon={InvestedHoursIcon}
            count="500+"
            description={t('about-project:investedHoursIcon')}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            Icon={NameSuggestionIcon}
            count="150+"
            description={t('about-project:nameSuggestionIcon')}
          />
        </Grid>
      </Grid>
      <Grid item container justify="space-between" className={classes.list}>
        <Grid item xs={12} sm={6}>
          {leftColumnLabels.map(renderCheckedLine)}
        </Grid>
        <Grid item xs={12} sm={6}>
          {rightColumnLabels.map(renderCheckedLine)}
        </Grid>
      </Grid>
    </Grid>
  )
}
