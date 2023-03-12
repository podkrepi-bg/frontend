import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const DiscordTeamImage = styled(Box)(() => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',

  '& img': {
    width: '100%',
    height: 'auto',
  },
}))
