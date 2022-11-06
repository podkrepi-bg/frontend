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
