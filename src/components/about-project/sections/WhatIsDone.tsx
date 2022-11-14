import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import CheckIcon from '@mui/icons-material/Check'
import { Grid, Typography } from '@mui/material'
import { staticUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'
import Heading from 'components/common/Heading'

import ActivityIcon from '../icons/ActivityIcon'
import MeetingsIcon from '../icons/MeetingsIcon'
import VolunteersIcon from '../icons/VolunteersIcon'
import InvestedHoursIcon from '../icons/InvestedHoursIcon'
import { BankAccount } from '../../common/BankAccount'

const PREFIX = 'WhatIsDone'

const classes = {
  heading: `${PREFIX}-heading`,
  container: `${PREFIX}-container`,
  icons: `${PREFIX}-icons`,
  list: `${PREFIX}-list`,
  checkedLine: `${PREFIX}-checkedLine`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.heading}`]: {
    paddingBottom: theme.spacing(7),
    textAlign: 'center',
  },

  [`& .${classes.container}`]: {
    marginBottom: theme.spacing(12),
    textAlign: 'center',
  },

  [`& .${classes.icons}`]: {
    marginBottom: theme.spacing(5),
  },

  [`& .${classes.list}`]: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    '& span': {
      textAlign: 'start',
    },
  },

  [`&.${classes.checkedLine}`]: {
    display: 'flex',
    marginBottom: theme.spacing(1.5),
    marginRight: theme.spacing(2),
    '& span': {
      marginLeft: theme.spacing(1.5),
    },
  },
}))

type CheckedLineProps = {
  label: string | React.ReactNode
  href?: string
}

const CheckedLine = ({ label, href }: CheckedLineProps) => {
  const { t } = useTranslation()

  return (
    <StyledGrid item className={classes.checkedLine}>
      <CheckIcon />
      <Typography variant="body2" component="span">
        {typeof label === 'string' ? t(label) : label}{' '}
        {href && (
          <ExternalLink variant="body2" href={href}>
            ({t('link').toLocaleLowerCase()})
          </ExternalLink>
        )}
      </Typography>
    </StyledGrid>
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
    href: staticUrls.projectDocs,
  },
  { label: 'about-project:documentation-technical', href: staticUrls.devDocs },
  // Currently the architecture map is not available
  // {
  //   label: 'about-project:high-level-map',
  //   href: 'https://docs.podkrepi.bg/general/arkhitektura/architecture',
  // },
]

export default function WhatIsDone() {
  const { t } = useTranslation()

  return (
    <StyledGrid container direction="column" className={classes.container}>
      <Heading variant="h3" component="h2" className={classes.heading}>
        {t('about-project:whatIsDoneTitle')}
      </Heading>
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
      <Grid item container justifyContent="space-between" className={classes.list}>
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
    </StyledGrid>
  )
}
