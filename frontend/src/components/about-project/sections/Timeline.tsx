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
import { routes, socialUrls } from 'common/routes'

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
  }),
)

export default function Timeline() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h4" component="h2" className={classes.heading}>
        {t('about-project:timeline')}
      </Typography>
      <Grid item>
        <TimelineMaterial align="alternate">
          <TimelineItem Icon={PlayCircleFilledWhite} title="Октомври 2020">
            <ul>
              <li>Зараждане на идеята за изграждане на дарителска платформа от доброволци.</li>
              <li>Събиране на екип от доброволци с разнообразна експертиза и опит.</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={DiscordIcon} title="Ноември 2020">
            <ul>
              <li>
                Стартиране на{' '}
                <a href={socialUrls.discord} target="_blank" rel="noreferrer noopener">
                  Discord
                </a>{' '}
                сървър за проекта.
              </li>
              <li>Подготовка на манифесто на ценности и работни принципи.</li>
              <li>Срещи и дискусии с експерти.</li>
              <li>Онлайн панел с медици и НПО представители.</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={Folder} title="Декември 2020">
            <ul>
              <li>Разпределение по експертни направелния и избор на лийдове.</li>
              <li>Избор на име на платформата измежду 197 предложения.</li>
              <li>Проучени бизнес модели за самоиздръка на платормата.</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={PodkrepiIcon} title="Януари 2021">
            <ul>
              <li>Подготовка на 270 User Stories за основа на платформата.</li>
              <li>Избор на лого от предложени 150 варианта.</li>
              <li>Запазена търговска марка.</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={VerifiedUser} title="Февруари 2021">
            <ul>
              <li>Регистрация на сдружението. </li>
              <li>
                Старт на дейността на първите три основни екипа - фронтенд, плащания и кампании.
              </li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={ChecklistIcon} title="Март 2021">
            <ul>
              <li>Старт на информационния сайт на проекта.</li>
              <li>Настройка на хостинга на платформата.</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={GlobeIcon} title="Април 2021">
            <ul>
              <li>Старт на дейността на други основни екипи.</li>
              <li>Откриване на банкови сметки.</li>
              <li>Регистрация и настройка на платежни системи.</li>
            </ul>
          </TimelineItem>
          <TimelineItem Icon={HandIcon} title="Май 2021">
            Избор на бизнес модел за самоиздръжка на платформата
          </TimelineItem>
          <TimelineItem Icon={Update} title="Юли 2021">
            Пускане на пилотна версия на платформата.
          </TimelineItem>
          <TimelineItem Icon={PlaylistAddCheck} title="Август 2021">
            Извършване на тестове на платформата в реална среда.
          </TimelineItem>
          <TimelineItem Icon={Telegram} lastItem title="Септември 2021">
            Пускане на бета версия на платформата.
          </TimelineItem>
        </TimelineMaterial>
      </Grid>
    </Grid>
  )
}
