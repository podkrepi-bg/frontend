import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const SubtitleSectionNumber = styled(Typography)(() => ({
  display: 'inline',
  fontSize: theme.typography.pxToRem(40),
  textAlign: 'left',
  color: theme.palette.primary.light,
  fontWeight: 'bold',
}))

export const SubtitleSectionText = styled(Typography)(() => ({
  display: 'inline',
  textAlign: 'left',
  ml: 1,
}))
