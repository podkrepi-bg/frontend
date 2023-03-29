import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',

  'a:nth-of-type(1)': {
    minHeight: theme.spacing(60.25),
    gridRowStart: 1,
    gridColumnStart: 1,
    gridRowEnd: 3,
    gridColumnEnd: 3,
  },

  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(7),
  },

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `${theme.spacing(4)} auto`,
  },
}))
