import { Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Root = styled(Stack)(() => ({
  alignItems: 'center',
  gap: theme.spacing(5),
  marginTop: theme.spacing(8),
}))

export const ErrorMessage = styled(Typography)(() => ({
  maxWidth: theme.spacing(80),
}))

export const BackButton = styled(LinkButton)(() => ({
  color: theme.palette.primary.dark,
  borderColor: theme.palette.primary.dark,
}))
