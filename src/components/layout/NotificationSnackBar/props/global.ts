import { Slide, SnackbarOrigin } from '@mui/material'

export const globalSnackbarProps = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' } as SnackbarOrigin,
  autoHideDuration: 3000,
  transitionDuration: 2000,
  TransitionComponent: Slide,
}

export const globalSnackbarContentProps = {
  sx: {
    minWidth: '300px',
    backgroundColor: 'white',
    color: 'black',
  },
}
