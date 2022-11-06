import { styled } from '@mui/system'
import theme from 'common/theme'
import { Typography } from '@mui/material'

export const AboutHeading = styled(Typography)(() => ({
  fontWeight: 500,
  margin: theme.spacing(15, 0, 8, 0),
  textAlign: 'center',
}))
