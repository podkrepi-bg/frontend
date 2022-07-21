import React from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import theme from 'common/theme'

function LoggedUserDialog() {
  const { t } = useTranslation('one-time-donation')
  const { data: session } = useSession()

  return (
    <Grid sx={{ marginBottom: theme.spacing(4) }} container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" fontWeight="bold">
          {t('second-step.logged-user')}
        </Typography>
      </Grid>
      <Grid item xs={12} color="#343434" sx={{ opacity: 0.9 }}>
        {session && session.user ? (
          <Typography>
            {t('second-step.info-logged-user', {
              fullName: session.user.name,
              email: session.user.email,
            })}
          </Typography>
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  )
}

export default LoggedUserDialog
