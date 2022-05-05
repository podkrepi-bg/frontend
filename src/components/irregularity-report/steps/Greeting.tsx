import React from 'react'
import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/styles'
import { Grid, Typography } from '@mui/material'

import theme from 'common/theme'
import { useSession } from 'common/util/useSession'

import Subtitle from '../helpers/Subtitle'

const greetingStyles = {
  fontWeight: 'bold',
}

export default function Greeting() {
  const { t } = useTranslation('irregularity-report')
  const { session } = useSession()

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} alignContent="center">
        <Grid item xs={12}>
          <Subtitle label={t('steps.greeting.subtitle')} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={greetingStyles}>
            {t('steps.greeting.welcome')}{' '}
            {session &&
              (session.preferred_username ? session.preferred_username : session.given_name)}
          </Typography>
        </Grid>
        <Grid container item spacing={3}>
          <Grid item>
            <Typography variant="body1">{t('steps.greeting.text-info')}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{t('steps.greeting.text-description')}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{t('steps.greeting.text-thanks')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
