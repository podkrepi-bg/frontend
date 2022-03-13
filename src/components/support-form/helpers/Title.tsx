import { Grid, lighten, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'

export const useHeaderStyles = makeStyles(() =>
  createStyles({
    subtitleText: {
      color: lighten(theme.palette.primary.dark, 0.1),
      width: '100%',
    },
  }),
)

interface TitleProps {
  label: string
}

export default function Title({ label }: TitleProps) {
  const { t } = useTranslation()
  return (
    <Grid item xs={12}>
      <Typography variant="h4" align="center">
        {t(label)}
      </Typography>
    </Grid>
  )
}
