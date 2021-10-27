import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { Timeline as TimelineMaterial } from '@mui/lab'
import {
  Folder,
  PlayCircleFilledWhite,
  PlaylistAddCheck,
  Telegram,
  Update,
  VerifiedUser,
} from '@mui/icons-material'

import { socialUrls } from 'common/routes'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import ExternalLink from 'components/common/ExternalLink'
import Heading from 'components/common/Heading'

import HandIcon from '../icons/HandIcon'
import TimelineItem from './TimelineItem'
import GlobeIcon from '../icons/GlobeIcon'
import DiscordIcon from '../icons/DiscordIcon'
import ChecklistIcon from '../icons/ChecklistIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(7),
    },
    container: {
      textAlign: 'center',
    },
    timelineWrapper: {
      padding: 0,
    },
  }),
)

export default function Timeline() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Heading
        id="our-story"
        variant="h3"
        component="h2"
        align="center"
        className={classes.heading}
        linkable>
        {t('about-project:timeline')}
      </Heading>
      <Grid item>
        <TimelineMaterial align="alternate" className={classes.timelineWrapper}>
          <TimelineItem Icon={PlayCircleFilledWhite} title={t('about-project:october-2020-title')}>
            <ul>
              <li>{t('about-project:platform-idea')}</li>
              <li>{t('about-project:team-gathering')}</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={DiscordIcon} title={t('about-project:november-2020-title')}>
            <ul>
              <li>
                {t('about-project:starting')}{' '}
                <ExternalLink href={socialUrls.discord}>Discord</ExternalLink>{' '}
                {t('about-project:project-server')}
              </li>
              <li>{t('about-project:manifesto-preparation')}</li>
              <li>{t('about-project:meetings-discussions')}</li>
              <li>{t('about-project:online-panel')}</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={Folder} title={t('about-project:december-2020-title')}>
            <ul>
              <li>{t('about-project:distribution')}</li>
              <li>{t('about-project:name-choice')}</li>
              <li>{t('about-project:self-support')}</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={PodkrepiIcon} title={t('about-project:january-2021-title')}>
            <ul>
              <li>{t('about-project:user-stories-preparation')}</li>
              <li>{t('about-project:logo-choice')}</li>
              <li>{t('about-project:trademarking')}</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={VerifiedUser} title={t('about-project:february-2021-title')}>
            <ul>
              <li>{t('about-project:registration')}</li>
              <li>{t('about-project:work-start')}</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={ChecklistIcon} title={t('about-project:march-2021-title')}>
            <ul>
              <li>{t('about-project:start-info-site')}</li>
              <li>{t('about-project:hosting-setup')}</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={GlobeIcon} title={t('about-project:april-2021-title')}>
            <ul>
              <li>{t('about-project:involve-more-teams')}</li>
              <li>{t('about-project:bank-accounts-opening')}</li>
              <li>{t('about-project:payments')}</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={HandIcon} title={t('about-project:may-2021-title')}>
            {t('about-project:self-support-model')}
          </TimelineItem>
          <TimelineItem Icon={Update} title={t('about-project:september-2021-title')}>
            {t('about-project:hackathons')}
          </TimelineItem>
          <TimelineItem Icon={PlaylistAddCheck} title={t('about-project:october-2021-title')}>
            {t('about-project:tests-performing')}
          </TimelineItem>
          <TimelineItem Icon={Telegram} lastItem title={t('about-project:december-2021-title')}>
            {t('about-project:beta-version-launch')}
          </TimelineItem>
        </TimelineMaterial>
      </Grid>
    </Grid>
  )
}
