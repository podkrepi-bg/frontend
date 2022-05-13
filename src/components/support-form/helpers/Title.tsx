import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

type Props = {
  label: string
}
export default function Title({ label }: Props) {
  const { t } = useTranslation()
  return (
    <Grid item xs={12}>
      <Typography variant="h4" align="center">
        {t(label)}
      </Typography>
    </Grid>
  )
}
