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

const BankAccount = () => (
  <div>
    Открихме дарителска сметка в <br />
    <i>Уникредит Булбанк</i>
    <br />
    <strong>IBAN: {ibanNumber}</strong>
    <br />с титуляр <strong>Сдружение Подкрепи БГ</strong>.
  </div>
)

const leftColumnLabels: CheckedLineProps[] = [
  // { label: 'about-project:volunteers' },
  // { label: 'about-project:meetings' },
  // { label: 'about-project:infoSite' },
  // { label: 'about-project:businessModel' },
  // { label: 'about-project:organizationWork' },
  // { label: 'about-project:hostingPartners' },
  {
    label:
      'Създадохме организация на работата (discord, drive, github, ora.pm, разделяне по екипи)',
  },
  {
    label:
      'Имахме вътрешно гласуване и се спряхме на име (измежду 150 предложения), лого и дизайн.',
  },
  {
    label: 'Регистрирахме сдружение с нестопанска цел "Подкрепи БГ" и запазихме търговската марка.',
  },
  { label: 'Сключихме партньорства за безплатен хостинг със Superhosting и ICN.bg' },
  {
    label:
      'За момента оперираме със следните модели за самоиздръжка - годишен членски внос, физически или корпоративни дарения към сдружението, потенциално мислим да кандидатстваме по някоя програма, но това в по-дългосрочен план.',
  },
  {
    label: <BankAccount />,
  },
]
const rightColumnLabels: CheckedLineProps[] = [
  // { label: 'about-project:nameSuggestions' },
  // { label: 'about-project:internalMeetings' },
  // { label: 'about-project:npoConversations' },
  // { label: 'about-project:featuresList' },
  // { label: 'about-project:trademark' },
  // { label: 'about-project:association' },
  // {
  //   label: 'about-project:architecture',
  //   href: 'https://docs.podkrepi.bg/general/arkhitektura/architecture',
  // },
  {
    label:
      'Проведохме серия от разговори с НПО представители с цел по-добро разбиране и дефиниране на - проблема, който трябва да решим.',
  },
  {
    label:
      'Разписахме 270 user story-та и сме избрали пътя към постигане на Minimum Lovable Product. ',
  },
  {
    label:
      'Имаме активни екипи работещи по фронтенда и по основните модули за създаване на кампании и управление на плащания',
  },
  {
    label:
      'Обединихме се около microservice architecture за да може да се включат повече хора с различни технологии',
  },
  { label: 'Проекта се разработва в Github', href: staticUrls.github },
  { label: 'Документацията на проекта поддържаме в GitBook', href: staticUrls.docs },
  {
    label: 'Приготвили сме High-level архитектурнo/организационна карта на платформата тук',
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
