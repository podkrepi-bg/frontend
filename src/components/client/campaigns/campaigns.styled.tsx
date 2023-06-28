import { styled } from '@mui/system'
import { Typography } from '@mui/material'

import theme from 'common/theme'

export const Heading = styled(Typography)(() => ({
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(25),
}))

export const SectionHeading = styled(Typography)(() => ({
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(35),
  lineHeight: theme.typography.pxToRem(45),
}))
