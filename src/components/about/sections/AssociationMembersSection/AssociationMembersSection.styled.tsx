import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

import theme from 'common/theme'

export const TeamMemberWrapper = styled(Grid)(() => ({
  flexGrow: 1,
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    width: '10%',
    flex: '1 0 40%',
    marginBottom: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
    flex: '1 0 30%',
  },
  [theme.breakpoints.up('lg')]: {
    flex: '1 0 12%',
  },
}))
