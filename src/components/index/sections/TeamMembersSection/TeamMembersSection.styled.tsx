import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  padding: theme.spacing(0, 3),
  marginTop: theme.spacing(8),
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(12),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0),
  },
}))
