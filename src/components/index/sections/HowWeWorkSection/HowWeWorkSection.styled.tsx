import { Grid } from '@mui/material'
import { styled } from '@mui/system'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(0, 3),
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(12),
  },
}))

export const InfoText = styled(Grid)(() => ({
  display: 'inline-block',
  textAlign: 'center',
}))

export const InfographicWrapper = styled(Grid)(() => ({
  marginTop: theme.spacing(5),
}))
