import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'

import Subtitle from '../helpers/Subtitle'
import Link from 'components/common/Link'
import { routes } from 'common/routes'

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
    <Grid container spacing={3} alignContent="center">
      <Grid item xs={12}>
        <Subtitle label={t('steps.greeting.subtitle')} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={greetingStyles}>
          {t('steps.greeting.welcome')}{' '}
          {session &&
            session.user &&
            (session.user.preferred_username
              ? session.user.preferred_username
              : session.user.given_name)}
        </Typography>
      </Grid>
      <Grid container item spacing={3}>
        <Grid item>
          <Typography variant="body1">{t('steps.greeting.text-info')}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {t('steps.greeting.text-description-first')}
            <Link href={routes.campaigns.create}>
              <span>{t('steps.greeting.text-link')}</span>
            </Link>
            {t('steps.greeting.text-description-second')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{t('steps.greeting.text-thanks')}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
