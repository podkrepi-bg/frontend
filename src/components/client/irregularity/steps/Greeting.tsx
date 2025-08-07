import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Grid2, Typography } from '@mui/material'

import Subtitle from '../helpers/Subtitle'

const greetingStyles = {
  fontWeight: 'bold',
}

export default function Greeting() {
  const { t } = useTranslation('irregularity')
  const { data: session } = useSession()

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <Grid2 container spacing={3} alignContent="center">
      <Grid2 size={12}>
        <Subtitle label={t('steps.greeting.subtitle')} />
      </Grid2>
      <Grid2 size={12}>
        <Typography variant="h6" sx={greetingStyles}>
          {t('steps.greeting.welcome')}{' '}
          {session &&
            session.user &&
            (session.user.preferred_username
              ? session.user.preferred_username
              : session.user.given_name)}
        </Typography>
      </Grid2>
      <Grid2 container spacing={3}>
        <Grid2>
          <Typography variant="body1">{t('steps.greeting.text-info')}</Typography>
        </Grid2>
        <Grid2>
          <Typography variant="body1">
            {t('steps.greeting.text-description-first')}
            {t('steps.greeting.text-description-second')}
          </Typography>
        </Grid2>
        <Grid2>
          <Typography variant="body1">{t('steps.greeting.text-thanks')}</Typography>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
