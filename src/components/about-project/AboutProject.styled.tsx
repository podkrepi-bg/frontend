import { styled } from '@mui/system'
import { Grid, Typography } from '@mui/material'

import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.primary.dark,

  '& > svg': {
    fontSize: theme.typography.pxToRem(80),
    padding: theme.spacing(1),
  },
}))

export const Heading = styled(Typography)(() => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0, 7, 0),
}))

export const Count = styled('span')(() => ({
  fontSize: theme.typography.pxToRem(64),
  fontWeight: 'bold',
}))

export const Text = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(16),
  textAlign: 'center',
}))
