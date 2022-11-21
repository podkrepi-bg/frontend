import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

import theme from 'common/theme'

export const DiscordTeamImage = styled(Typography)(() => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',
}))
