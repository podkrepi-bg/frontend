import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'

export default function CompletedCampaignsSectiom() {
  const { t } = useTranslation('campaigns')

  return (
    <Grid>
      <Typography>{t('completed-campaigns')}</Typography>
    </Grid>
  )
}
