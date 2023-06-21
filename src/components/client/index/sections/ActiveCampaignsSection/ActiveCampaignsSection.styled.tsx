import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  marginTop: theme.spacing(3.875),
  display: 'grid',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    marginTop: theme.spacing(7),
    gap: '20px',
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
  marginTop: '48px',
}))
