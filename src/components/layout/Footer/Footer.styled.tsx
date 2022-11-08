import { Container, Grid, lighten } from '@mui/material'
import { styled } from '@mui/system'

import theme from 'common/theme'

export const Root = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'left',
  backgroundColor: theme.palette.primary.dark,
  color: lighten(theme.palette.primary.main, 0.75),

  '& a': {
    color: lighten(theme.palette.primary.main, 0.75),

    '&:hover': {
      color: lighten(theme.palette.primary.main, 0.55),
    },
  },
}))

export const FooterWrapper = styled(Grid)(() => ({
  padding: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: theme.spacing(4, 0),
  },
}))

export const InfoGridWrapper = styled(Grid)(() => ({
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3, 0),
  },
}))

export const FooterLinksWrapper = styled(Grid)(() => ({
  paddingTop: theme.spacing(3),
}))
