import React from 'react'
import { useTranslation } from 'next-i18next'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import { Grid } from '@mui/material'

import { routes } from 'common/routes'

import {
  HelpThoseInNeedButton,
  Heading,
  Root,
  SectionGridWrapper,
  Subtitle,
} from './PlatformStatisticsSection.styled'
import StatisticsSection from './StatisticsSection/StatisticsSection'

export default function PlatformStatisticsSection() {
  const { t } = useTranslation('index')

  return (
    <Root>
      <Grid component="section" justifyContent="center">
        <SectionGridWrapper>
          <Grid
            sx={(theme) => ({
              margin: '0 auto',
              maxWidth: theme.spacing(67),
            })}>
            <Heading variant="h4">{t('platform-statistics.heading')}</Heading>
            <Subtitle variant="subtitle1">{t('platform-statistics.text')}</Subtitle>
            <HelpThoseInNeedButton
              href={routes.campaigns.index}
              variant="contained"
              endIcon={<ArrowForwardSharp />}>
              {t('platform-statistics.donate-to-those-in-need')}
            </HelpThoseInNeedButton>
          </Grid>
          <StatisticsSection />
        </SectionGridWrapper>
      </Grid>
    </Root>
  )
}
