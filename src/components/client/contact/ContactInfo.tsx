import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import MailIcon from './icons/MailIcon'

export default function ActivitySection() {
  const { t } = useTranslation()

  return (
    <Grid container component="section">
      <Typography variant="h6" component="p" sx={{ width: '100%', textAlign: 'center', mb: 5 }}>
        {t('contact:subtitle')}
      </Typography>
      <Grid container justifyContent="center" sx={{ mb: 7 }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <MailIcon
            sx={(theme) => ({
              fontSize: theme.typography.pxToRem(64),
              fill: theme.palette.primary.main,
              stroke: theme.palette.primary.main,
              p: 1,
            })}
          />
          <Typography variant="body2" sx={(theme) => ({ color: theme.palette.primary.dark })}>
            {t('contact:email')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
