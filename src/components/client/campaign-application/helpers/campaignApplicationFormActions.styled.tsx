import { styled } from '@mui/material/styles'
import { Button, Grid } from '@mui/material'

import LinkButton from 'components/common/LinkButton'
import SubmitButton from 'components/common/form/SubmitButton'

import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  marginTop: theme.spacing(15),
  textAlign: 'center',
}))

export const ActionLinkButton = styled(LinkButton)(() => ({
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.black}`,
  padding: theme.spacing(1, 5),
  borderRadius: theme.borders.round,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(15),
  width: theme.spacing(50),
  fontWeight: 800,
}))

export const ActionButton = styled(Button)(() => ({
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.black}`,
  padding: theme.spacing(1, 5),
  borderRadius: theme.borders.round,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(15),
  width: theme.spacing(50),
  fontWeight: 800,
}))

export const ActionSubmitButton = styled(SubmitButton)(() => ({
  backgroundColor: '#62C4FB',
  border: `1px solid ${theme.palette.common.black}`,
  padding: theme.spacing(1, 5),
  borderRadius: theme.borders.round,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(15),
  width: theme.spacing(50),
  fontWeight: 800,
}))
