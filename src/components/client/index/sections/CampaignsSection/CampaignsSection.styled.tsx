import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(12),
  },

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `${theme.spacing(4)} auto`,
  },
}))
