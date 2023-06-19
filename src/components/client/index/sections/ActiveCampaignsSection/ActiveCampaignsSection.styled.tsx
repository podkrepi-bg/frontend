import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  marginTop: theme.spacing(3.875),
  display: 'grid',
  // gridTemplateRows: 'repeat(5, 1fr)',

  // 'div:nth-of-type(1)': {
  //   minHeight: '488px',
  //   gridArea: '1 / 1 / 3 / 3',
  // },

  // [theme.breakpoints.down('md')]: { display: 'flex' },

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    // gridTemplateRows: 'repeat(4, 1fr)',
    marginTop: theme.spacing(7),
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
