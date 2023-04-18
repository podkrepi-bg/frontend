import React from 'react'
import { useTranslation } from 'next-i18next'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import { Grid } from '@mui/material'

import { routes } from 'common/routes'

import { DonateButton, Heading, Root, Subtitle } from './PlatformStatisticsSection.styled'
import StatisticsSection from './StatisticsSection/StatisticsSection'

export default function PlatformStatisticsSection() {
  const { t } = useTranslation('index')

  return (
    <Root>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Grid
          item
          xs={8}
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'start',
            [theme.breakpoints.down('md')]: {
              flexWrap: 'wrap',
            },
          })}>
          <Grid item md={8} pl={1} textAlign="left" xs={10}>
            <Heading variant="h5">{t('platform-statistics.heading')}</Heading>
            <Subtitle variant="subtitle1">{t('platform-statistics.text')}</Subtitle>
            <DonateButton
              href={routes.campaigns.index}
              variant="contained"
              endIcon={<ArrowForwardSharp />}>
              {t('platform-statistics.donate-to-those-in-need')}
            </DonateButton>
          </Grid>
          <StatisticsSection />
        </Grid>
      </Grid>
    </Root>
  )
}
