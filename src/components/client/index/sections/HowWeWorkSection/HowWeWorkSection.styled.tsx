import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  marginTop: theme.spacing(8),
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(14),
  },
}))
