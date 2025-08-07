import { styled } from '@mui/material/styles'
import { Button, Grid2 } from '@mui/material'

import LinkButton from 'components/common/LinkButton'
import SubmitButton from 'components/common/form/SubmitButton'

import theme from 'common/theme'

const commonButtonStyles = {
  padding: theme.spacing(1, 5),
  border: `1px solid ${theme.palette.common.black}`,
  borderRadius: theme.borders.round,
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(15),
  fontWeight: 800,
}

export const Root = styled(Grid2)(() => ({
  marginTop: theme.spacing(15),
  textAlign: 'center',
}))

export const ActionLinkButton = styled(LinkButton)(() => ({
  ...commonButtonStyles,
  backgroundColor: theme.palette.common.white,
}))

export const ActionButton = styled(Button)(() => ({
  ...commonButtonStyles,
  backgroundColor: theme.palette.common.white,
}))

export const ActionSubmitButton = styled(SubmitButton)(() => ({
  ...commonButtonStyles,
  backgroundColor: '#62C4FB',
}))
