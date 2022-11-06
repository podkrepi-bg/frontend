import { styled } from '@mui/system'
import { Grid, Typography } from '@mui/material'

import theme from 'common/theme'

export const ManagemtenBoardMembersWrapper = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
}))

export const ManagementBoardHeading = styled(Typography)(() => ({
  fontWeight: 500,
  marginBottom: theme.spacing(8),
  textAlign: 'center',
}))

export const ТeamMemberWrapper = styled(Typography)(() => ({
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
