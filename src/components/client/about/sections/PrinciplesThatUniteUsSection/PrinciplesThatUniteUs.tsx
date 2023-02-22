import React from 'react'

import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import PrincipleCard from './PrincipleCard'
import { principlesData } from '../../helpers/principlesData'

import { AboutHeading } from 'components/client/about/AboutPage.styled'

export default function PrinciplesThatUniteUs() {
  const { t } = useTranslation('about')

  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
        <AboutHeading variant="h4">{t('principlesThatUniteUs.title')}</AboutHeading>
      </Grid>
      {principlesData.map((principle) => (
        <Grid key={principle.heading} item xs={12} sm={6}>
          <PrincipleCard
            Icon={principle.icon}
            heading={t(principle.heading)}
            content={t(principle.content)}
          />
        </Grid>
      ))}
    </Grid>
  )
}
