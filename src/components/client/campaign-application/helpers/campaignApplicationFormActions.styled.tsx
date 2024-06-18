import { styled } from '@mui/material/styles'
import { Button, Grid } from '@mui/material'

import LinkButton from 'components/common/LinkButton'
import SubmitButton from 'components/common/form/SubmitButton'
import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  marginTop: theme.spacing(15),
  textAlign: 'center',
}))

export const Icon = styled(Grid)(() => ({
  justifyContent: 'center',
  marginBottom: theme.spacing(4),

  '& svg': {
    fontSize: theme.typography.pxToRem(120),
  },
}))

export const ButtonsWrapper = styled(Grid)(() => ({
  justifyContent: 'space-evenly',
}))

export const ActionLinkButton = styled(LinkButton)(() => ({
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.black}`,
  padding: theme.spacing(1, 5),
  borderRadius: theme.borders.round,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(20),
  width: theme.spacing(50),
}))

export const ActionButton = styled(Button)(() => ({
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.black}`,
  padding: theme.spacing(1, 5),
  borderRadius: theme.borders.round,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(20),
  width: theme.spacing(50),
}))

export const ActionSubmitButton = styled(SubmitButton)(() => ({
  backgroundColor: '#0098E3',
  border: `1px solid ${theme.palette.secondary.light}`,
  padding: theme.spacing(1, 5),
  borderRadius: theme.borders.round,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(20),
  width: theme.spacing(50),
}))
