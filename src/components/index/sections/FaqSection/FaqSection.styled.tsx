import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(0, 3),
}))

export const FaqWrapper = styled(Grid)(() => ({
  justifyContent: 'center',
  marginBottom: theme.spacing(12),
}))
