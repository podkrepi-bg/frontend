import React from 'react'
import { useTranslation } from 'next-i18next'
import CheckIcon from '@material-ui/icons/Check'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

import { ibanNumber } from 'common/iban'
import { staticUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'

import ActivityIcon from '../icons/ActivityIcon'
import MeetingsIcon from '../icons/MeetingsIcon'
import VolunteersIcon from '../icons/VolunteersIcon'
import InvestedHoursIcon from '../icons/InvestedHoursIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
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
  label: string | React.ReactNode
  href?: string
}

const CheckedLine = ({ label, href }: CheckedLineProps) => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid item className={classes.checkedLine}>
      <CheckIcon />
      <Typography variant="body2" component="span">
        {typeof label === 'string' ? t(label) : label}{' '}
        {href && (
          <ExternalLink variant="body2" href={href}>
            ({t('link').toLocaleLowerCase()})
          </ExternalLink>
        )}
      </Typography>
    </Grid>
  )
}

export default function WhatIsDone() {
  const { t } = useTranslation()
  const classes = useStyles()

  const BankAccount = () => (
    <div>
      {t('about-project:opened-donations-account')} <br />
      <i>{t('about-project:bank-name')}</i>
      <br />
      <strong>IBAN: {ibanNumber}</strong>
      <br /> {t('about-project:with-holder')} <strong>{t('about-project:association-name')}</strong>
      .
    </div>
  )

  const leftColumnLabels: CheckedLineProps[] = [
    {
      label: t('about-project:work-organisation'),
    },
    {
      label: t('about-project:choice-of-logo-and-design'),
    },
    {
      label: t('about-project:register-association'),
    },
    { label: t('about-project:hosting-partnerships') },
    {
      label: t('about-project:self-sufficiency-measures'),
    },
    {
      label: <BankAccount />,
    },
  ]
  const rightColumnLabels: CheckedLineProps[] = [
    {
      label: t('about-project:ngo-talks'),
    },
    {
      label: t('about-project:user-stories'),
    },
    {
      label: t('about-project:active-teams'),
    },
    {
      label: t('about-project:microservice-architecture'),
    },
    { label: t('about-project:github-project'), href: staticUrls.github },
    {
      label: t('about-project:documentation-social'),
      href: staticUrls.docs,
    },
    { label: t('about-project:documentation-technical'), href: staticUrls.devDocs },
    {
      label: t('about-project:high-level-map'),
      href: 'https://docs.podkrepi.bg/general/arkhitektura/architecture',
    },
  ]

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h3" component="h2" className={classes.heading}>
        {t('about-project:whatIsDoneTitle')}
      </Typography>
      <Grid item container className={classes.icons}>
        <Grid item xs={12} sm={4}>
          <ActivityIcon Icon={VolunteersIcon} count="17" description={t('about-project:members')} />
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
