import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const BankDetailsLabel = styled(Typography)(() => ({
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(2),
  },
}))
