import { Typography } from '@mui/material'
import { styled } from '@mui/system'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(12),
}))

export const PlatformDescriptionText = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(17.6),
  marginBottom: theme.spacing(5),
}))
