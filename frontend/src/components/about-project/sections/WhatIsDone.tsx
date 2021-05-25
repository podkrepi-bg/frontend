import React from 'react'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'

import VolunteersIcon from '../icons/VolunteersIcon'
import MeetingsIcon from '../icons/MeetingsIcon'
import InvestedHoursIcon from '../icons/InvestedHoursIcon'
import ActivityIcon from '../icons/ActivityIcon'
import ExternalLink from 'components/common/ExternalLink'

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

type CheckedLineProps = {
  label: string
  href?: string
}

const CheckedLine = ({ label, href }: CheckedLineProps) => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid item className={classes.checkedLine}>
      <CheckIcon />
      <Typography variant="body2" component="span">
        {t(label)}{' '}
        {href && <ExternalLink href={href}>({t('link').toLocaleLowerCase()})</ExternalLink>}
      </Typography>
    </Grid>
  )
}

const leftColumnLabels: CheckedLineProps[] = [
  { label: 'about-project:volunteers' },
  { label: 'about-project:meetings' },
  { label: 'about-project:infoSite' },
  { label: 'about-project:businessModel' },
  { label: 'about-project:organizationWork' },
  { label: 'about-project:hostingPartners' },
]
const rightColumnLabels: CheckedLineProps[] = [
  { label: 'about-project:nameSuggestions' },
  { label: 'about-project:internalMeetings' },
  { label: 'about-project:npoConversations' },
  { label: 'about-project:featuresList' },
  { label: 'about-project:trademark' },
  { label: 'about-project:association' },
  {
    label: 'about-project:architecture',
    href: 'https://docs.podkrepi.bg/general/arkhitektura/architecture',
  },
]

export default function WhatIsDone() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h4" component="h2" className={classes.heading}>
        {t('about-project:whatIsDoneTitle')}
      </Typography>
      <Grid item container className={classes.icons}>
        <Grid item xs={12} sm={4}>
          <ActivityIcon
            Icon={VolunteersIcon}
            count="700+"
            description={t('about-project:volunteersIcon')}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ActivityIcon
            Icon={MeetingsIcon}
            count="100+"
            description={t('about-project:meetingsIcon')}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ActivityIcon
            Icon={InvestedHoursIcon}
            count="1000+"
            description={t('about-project:investedHoursIcon')}
          />
        </Grid>
      </Grid>
      <Grid item container justify="space-between" className={classes.list}>
        <Grid item xs={12} sm={6}>
          {leftColumnLabels.map((props, key) => (
            <CheckedLine key={key} {...props} />
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          {rightColumnLabels.map((props, key) => (
            <CheckedLine key={key} {...props} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
