import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  marginTop: theme.spacing(7),
  display: 'grid',
  gridTemplateRows: 'repeat(5, 1fr)',

  'a:nth-of-type(1)': {
    minHeight: theme.spacing(40),
  },

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',

    'a:nth-of-type(1)': {
      minHeight: theme.spacing(61),
      gridRowStart: 1,
      gridColumnStart: 1,
      gridRowEnd: 3,
      gridColumnEnd: 3,
    },
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `${theme.spacing(7)} auto ${theme.spacing(4)} auto`,
  },
}))

export const SeeAllButton = styled(Grid)(() => ({
  display: 'flex',
  placeContent: 'center',
}))
