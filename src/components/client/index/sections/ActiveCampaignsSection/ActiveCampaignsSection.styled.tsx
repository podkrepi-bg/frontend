import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  display: 'grid',
  marginTop: theme.spacing(3.875),
  gap: theme.spacing(4.62),

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    marginTop: theme.spacing(7),
    gap: theme.spacing(2.5),
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
  marginTop: theme.spacing(10),
}))
