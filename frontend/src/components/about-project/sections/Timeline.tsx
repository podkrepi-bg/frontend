import React from 'react'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { Timeline as TimelineMaterial } from '@material-ui/lab'
import {
  Folder,
  PlayCircleFilledWhite,
  PlaylistAddCheck,
  Telegram,
  Update,
  VerifiedUser,
} from '@material-ui/icons'

import HandIcon from '../icons/HandIcon'
import TimelineItem from './TimelineItem'
import GlobeIcon from '../icons/GlobeIcon'
import DiscordIcon from '../icons/DiscordIcon'
import ChecklistIcon from '../icons/ChecklistIcon'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import { socialUrls } from 'common/routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
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
      <Typography variant="h3" component="h2" className={classes.heading}>
        {t('about-project:timeline')}
      </Typography>
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
                <a href={socialUrls.discord} target="_blank" rel="noreferrer noopener">
                  Discord
                </a>{' '}
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
            {t('about-project:pilot-version-launch')}
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
