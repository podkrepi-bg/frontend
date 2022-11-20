import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(0, 3),
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(12),
  },
}))
