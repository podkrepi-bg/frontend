import React from 'react'
import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'
import Subtitle from '../helpers/Subtitle'

const greetingStyles = {
  fontSize: '18px',
  lineHeight: '25px',
  textAlign: 'left',
  fontWeight: 'bold',
}

const textStyles = {
  fontSize: '16px',
  lineHeight: '25px',
  textAlign: 'justify',
  marginBottom: '20px',
}

export default function Greeting() {
  const { t } = useTranslation('irregularity-report')
  return (
    <Grid container spacing={3} justifyContent="flex-end" direction="column" alignContent="center">
      <Grid item xs={12}>
        <Subtitle label={t('steps.greeting.subtitle')} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={greetingStyles}>
          {t('steps.greeting.welcome')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={textStyles}>
          {t('steps.greeting.text-info')}
        </Typography>
        <Typography variant="body1" sx={textStyles}>
          {t('steps.greeting.text-description')}
        </Typography>
        <Typography variant="body1" sx={textStyles}>
          {t('steps.greeting.text-thanks')}
        </Typography>
      </Grid>
    </Grid>
  )
}
