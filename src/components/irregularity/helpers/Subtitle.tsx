import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/styles'
import { Grid, Typography } from '@mui/material'

import theme from 'common/theme'

type Props = {
  label: string
}

export default function Subtitle({ label }: Props) {
  const { t } = useTranslation()
  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          {t(label)}
        </Typography>
      </Grid>
    </ThemeProvider>
  )
}
