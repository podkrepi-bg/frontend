import { Slide, SnackbarOrigin } from '@mui/material'
import theme from 'common/theme'

export const globalSnackbarProps = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' } as SnackbarOrigin,
  autoHideDuration: 7000,
  transitionDuration: 2000,
  TransitionComponent: Slide,
}

export const globalSnackbarContentProps = {
  sx: {
    minWidth: '300px',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
}
