import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'

import theme from 'common/theme'

export const AuthLinksWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  borderTop: '2px solid lightgrey',
  paddingLeft: theme.spacing(1),
  minHeight: theme.spacing(8),
}))

export const AuthLink = styled(LinkButton)(() => ({
  color: theme.palette.common.black,
  display: 'contents',
  textAlign: 'start',
  padding: 0,
  fontSize: theme.typography.pxToRem(16),
}))

export const SlashSymbol = styled('span')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1.5),
  fontSize: theme.typography.pxToRem(16),
}))

export const StyledAuthButton = styled(LinkButton)(() => ({
  justifyContent: 'left',
  fontWeight: 500,
  minHeight: theme.spacing(8),
  padding: theme.spacing(0, 1),
  borderTop: '2px solid lightgrey',
  borderRadius: 0,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(16),
}))
