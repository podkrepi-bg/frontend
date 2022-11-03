import { Typography } from '@mui/material'
import { styled } from '@mui/system'

import theme from 'common/theme'

export const InfoText = styled(Typography)(() => ({
  display: 'inline-block',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
  paddingBottom: theme.spacing(6),
}))
