import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'

interface SubtitleProps {
  label: string
}

export default function Subtitle({ label }: SubtitleProps) {
  const { t } = useTranslation()
  return (
    <Grid item xs={12}>
      <Typography variant="h6" align="center">
        {t(label)}
      </Typography>
    </Grid>
  )
}
