import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  maxWidth: theme.spacing(150),
  margin: '0 auto',
  padding: theme.spacing(0, 3),
  marginBottom: theme.spacing(13),
}))

export const InfoText = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
  padding: theme.spacing(0, 8, 6, 8),
}))

export const SubscribeGrid = styled(Grid)(() => ({
  margin: theme.spacing(4, 'auto'),

  [`& .subscribeBtn`]: {
    fontSize: theme.typography.pxToRem(16),
    background: `${theme.palette.primary}`,

    '&:hover': {
      background: theme.palette.primary.main,
    },
  },

  [theme.breakpoints.up(768)]: {
    margin: theme.spacing(8, 'auto'),
  },
}))
