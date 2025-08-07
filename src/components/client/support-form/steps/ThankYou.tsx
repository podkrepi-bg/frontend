import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid2, Typography } from '@mui/material'

import HeaderTypography from '../helpers/HeaderTypography'

export default function ThankYou() {
  const { t } = useTranslation()

  return (
    <Grid2 container spacing={6} justifyContent="center">
      <Grid2 size={12}>
        <HeaderTypography>{t('support:steps.thank-you.content')}</HeaderTypography>
      </Grid2>
      <Typography align="center" sx={{ mt: 5 }}>
        {t('support:steps.thank-you.await-instructions')}
      </Typography>
    </Grid2>
  )
}
