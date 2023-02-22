import React from 'react'

import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import TimelineItem from '../TimelineItem/TimelineItem'
import { timelineData } from 'components/client/about-project/helpers/timelineData'
import { Root, TimelineMaterial } from './Timeline.styled'
import { Heading } from 'components/client/about-project/AboutProject.styled'

export default function Timeline() {
  const { t } = useTranslation('about-project')

  return (
    <Root>
      <Heading variant="h3">{t('timeline')}</Heading>
      <Grid item>
        <TimelineMaterial position="alternate">
          {timelineData.map(({ icon, title, items }, index) => (
            <TimelineItem key={index} Icon={icon} title={t(title)}>
              {t(items)}
            </TimelineItem>
          ))}
        </TimelineMaterial>
      </Grid>
    </Root>
  )
}
