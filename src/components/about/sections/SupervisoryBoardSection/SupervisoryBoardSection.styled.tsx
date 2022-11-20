import { styled } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'

import theme from 'common/theme'

export const SupervisoryBoardMembersWrapper = styled(Grid)(() => ({
  flexGrow: 1,
  width: '100%',
  textAlign: 'center',
  flexWrap: 'wrap',

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    gap: theme.spacing(3),
  },
}))

export const TeamMemberWrapper = styled(Grid)(() => ({
  width: '100%',
  backgroundColor: theme.palette.secondary.light,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    width: '10%',
    flex: '1 0 40%',
    marginBottom: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(0),
    flex: '1 0 30%',
  },
}))

export const Wrapper = styled(Grid)(() => ({
  dispay: 'block',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
}))

export const TeamMemberName = styled(Typography)(() => ({
  fontWeight: 700,
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginTop: 0,
  },
}))

export const NameLinkedInWrapper = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))
