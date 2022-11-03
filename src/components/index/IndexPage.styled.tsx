import { styled } from '@mui/system'

import theme from 'common/theme'

export const Heading = styled('h2')(() => ({
  marginBottom: theme.spacing(6),
  color: theme.palette.primary.dark,
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(32),
}))
