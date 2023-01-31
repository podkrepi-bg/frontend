import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  margin: theme.spacing(7, 3, 0, 3),

  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(12, 4, 0, 4),
  },

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `${theme.spacing(4)} auto`,
  },
}))

export const UrgentCampaignsHeading = styled(Typography)(() => ({
  marginBottom: theme.spacing(6),
  color: theme.palette.common.black,
  textAlign: 'center',
  fontWeight: 500,

  [theme.breakpoints.up('lg')]: {
    fontSize: theme.typography.pxToRem(48),
  },
}))
