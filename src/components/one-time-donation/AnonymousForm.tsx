import * as React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import FormTextField from 'components/common/form/FormTextField'

export default function AnonymousForm() {
  const { t } = useTranslation('one-time-donation')
  return (
    <>
      <Typography variant="subtitle2" fontWeight="bold">
        {t('anonymous-menu.checkbox-label')}
      </Typography>

      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12} color="#343434" sx={{ opacity: 0.9 }}>
          <Typography>{t('anonymous-menu.info-start')}</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormTextField name="personsEmail" type="text" label="Email" fullWidth />
        </Grid>
      </Grid>
    </>
  )
}
