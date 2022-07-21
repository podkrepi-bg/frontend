import * as React from 'react'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Grid, Typography } from '@mui/material'
import FormTextField from 'components/common/form/FormTextField'
import CheckboxField from 'components/common/form/CheckboxField'

export default function AnonymousForm() {
  const { t } = useTranslation('one-time-donation')
  const { data: session } = useSession()
  function isLogged() {
    return session && session.accessToken ? true : false
  }
  return (
    <>
      <Typography variant="subtitle2" fontWeight="bold">
        {t('anonymous-menu.checkbox-label')}
      </Typography>

      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12} color="#343434" sx={{ opacity: 0.9 }}>
          <Typography>{t('anonymous-menu.info-start')}</Typography>
        </Grid>
        {isLogged() ? (
          <Grid item xs={12}>
            <CheckboxField
              name="isAnonymous"
              label={t('anonymous-menu.want-anonymous-donation').toString()}
            />
          </Grid>
        ) : (
          ''
        )}
        <Grid item xs={12} md={12}>
          <FormTextField name="personsEmail" type="text" label="Email" fullWidth />
        </Grid>
      </Grid>
    </>
  )
}
