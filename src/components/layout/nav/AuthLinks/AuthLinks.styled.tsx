import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

export const AuthLinksWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  borderTop: '2px solid lightgrey',
  marginLeft: theme.spacing(0.25),
  minHeight: theme.spacing(8),
}))

export const AuthLink = styled(LinkButton)(() => ({
  color: theme.palette.common.black,
}))

export const SlashSymbol = styled('span')(() => ({
  display: 'flex',
  alignItems: 'center',
}))
