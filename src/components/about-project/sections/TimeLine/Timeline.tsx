import React from 'react'

import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import { Timeline as TimelineMaterial } from '@mui/lab'

import Heading from 'components/common/Heading'
import TimelineItem from '../TimelineItem'
import { timelineData } from 'components/about-project/helpers/timelineData'

export default function Timeline() {
  const { t } = useTranslation('about-project')

  return (
    <Grid container direction="column" component="section" sx={{ textAlign: 'center' }}>
      <Heading variant="h3" component="h2" align="center" sx={{ pt: 10, pb: 7 }}>
        {t('timeline')}
      </Heading>
      <Grid item>
        <TimelineMaterial position="alternate" sx={{ p: 0 }}>
          {timelineData.map(({ icon, title, items }, index) => (
            <TimelineItem key={index} Icon={icon} title={t(title)}>
              {t(items)}
            </TimelineItem>
          ))}
        </TimelineMaterial>
      </Grid>
    </Grid>
  )
}
