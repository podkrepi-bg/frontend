import React from 'react'
import { useTranslation } from 'next-i18next'
import CheckIcon from '@material-ui/icons/Check'
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'

import { ibanNumber } from 'common/iban'
import { staticUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'
import Typography from 'components/common/Typography'

import ActivityIcon from '../icons/ActivityIcon'
import MeetingsIcon from '../icons/MeetingsIcon'
import VolunteersIcon from '../icons/VolunteersIcon'
import InvestedHoursIcon from '../icons/InvestedHoursIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(7),
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

const BankAccount = () => {
  const { t } = useTranslation()

  return (
    <div>
      {t('about-project:opened-donations-account')} <br />
      <i>{t('about-project:bank-name')}</i>
      <br />
      <strong>IBAN: {ibanNumber}</strong>
      <br /> {t('about-project:with-holder')} <strong>{t('about-project:association-name')}</strong>
      .
    </div>
  )
}

const leftColumnLabels: CheckedLineProps[] = [
  {
    label: 'about-project:work-organisation',
  },
  {
    label: 'about-project:choice-of-logo-and-design',
  },
  {
    label: 'about-project:register-association',
  },
  { label: 'about-project:hosting-partnerships' },
  {
    label: 'about-project:self-sufficiency-measures',
  },
  {
    label: <BankAccount />,
  },
]
const rightColumnLabels: CheckedLineProps[] = [
  {
    label: 'about-project:ngo-talks',
  },
  {
    label: 'about-project:user-stories',
  },
  {
    label: 'about-project:active-teams',
  },
  {
    label: 'about-project:microservice-architecture',
  },
  { label: 'about-project:github-project', href: staticUrls.github },
  {
    label: 'about-project:documentation-social',
    href: staticUrls.docs,
  },
  { label: 'about-project:documentation-technical', href: staticUrls.devDocs },
  {
    label: 'about-project:high-level-map',
    href: 'https://docs.podkrepi.bg/general/arkhitektura/architecture',
  },
]

export default function WhatIsDone() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography
        id="what-is-done"
        variant="h3"
        component="h2"
        className={classes.heading}
        linkable>
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
