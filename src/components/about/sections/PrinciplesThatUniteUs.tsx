import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid } from '@mui/material'
import PrincipleCard from './PrincipleCard'
import Heading from 'components/common/Heading'
import { principlesData } from '../helpers/principlesData'

export default function PrinciplesThatUniteUs() {
  const { t } = useTranslation('about')

  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
        <Heading variant="h4" component="h2" textAlign="center" fontWeight="500" mt={15} mb={8}>
          {t('principlesThatUniteUs.title')}
        </Heading>
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
