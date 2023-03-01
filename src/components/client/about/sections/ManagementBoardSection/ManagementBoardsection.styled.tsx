import { styled } from '@mui/material/styles'
import { Button, Grid, Link, Typography } from '@mui/material'

import theme from 'common/theme'

export const ManagementBoardHeading = styled(Typography)(() => ({
  fontWeight: 500,
  marginBottom: theme.spacing(8),
  textAlign: 'center',
}))

export const ТeamMemberWrapper = styled(Grid)(() => ({
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
    flex: '1 0 10%',
  },
}))

export const LinkedInButton = styled(Link)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginTop: theme.spacing(3),

  '&:hover': {
    '&>svg, &>h6': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },

  [theme.breakpoints.up('sm')]: {
    float: 'left',
  },
}))

export const ShowMoreButton = styled(Button)(() => ({
  display: 'inherit',
  padding: 0,

  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
}))

export const Description = styled(Typography)(() => ({
  textAlign: 'initial',
  marginBottom: theme.spacing(3),
  overflow: 'hidden',
}))
