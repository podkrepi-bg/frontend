import { createStyles, makeStyles } from '@mui/styles'
import { lighten, Theme } from '@mui/material'

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtitleText: {
      color: lighten(theme.palette.primary.dark, 0.1),
      width: '100%',
    },
  }),
)
