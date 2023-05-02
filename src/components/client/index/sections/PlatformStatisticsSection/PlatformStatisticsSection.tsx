import React from 'react'
import { useTranslation } from 'next-i18next'

import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import { Grid } from '@mui/material'

import { routes } from 'common/routes'
import StatisticsSection from './StatisticsSection/StatisticsSection'

import {
  Heading,
  HelpButtonWrapper,
  HelpThoseInNeedButton,
  Root,
  SectionGridWrapper,
  Subtitle,
} from './PlatformStatisticsSection.styled'

export default function PlatformStatisticsSection() {
  const { t } = useTranslation('index')

  return (
    <Root>
      <SectionGridWrapper>
        <Grid
          sx={(theme) => ({
            margin: '0 auto',
            maxWidth: theme.spacing(67),
          })}>
          <Heading variant="h4">{t('platform-statistics.heading')}</Heading>
          <Subtitle>{t('platform-statistics.text')}</Subtitle>
          <HelpButtonWrapper>
            <HelpThoseInNeedButton
              href={routes.campaigns.index}
              variant="contained"
              endIcon={<ArrowForwardSharp />}>
              {t('platform-statistics.donate-to-those-in-need')}
            </HelpThoseInNeedButton>
          </HelpButtonWrapper>
        </Grid>
        <StatisticsSection />
      </SectionGridWrapper>
    </Root>
  )
}
