import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'

type SubtitleProps = {
  label: string
}

export default function Subtitle({ label }: SubtitleProps) {
  const { t } = useTranslation()
  return (
    <Grid item xs={12}>
      <Typography variant="h4" align="center">
        {t(label)}
      </Typography>
    </Grid>
  )
}
