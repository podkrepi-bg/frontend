import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.borders.round,
  border: `3px solid ${theme.palette.info.light}`,
  color: theme.palette.common.black,
  display: 'flex',
  width: theme.spacing(5),
  height: theme.spacing(5),
  zIndex: 1,
  fontSize: theme.typography.pxToRem(28),
}))
