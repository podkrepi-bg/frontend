import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import CloseModalButton from 'components/common/CloseModalButton'
import Grid from 'components/admin/recurring-donation/grid/Grid'
import LinkButton from 'components/common/LinkButton'

export const CloseButton = styled(CloseModalButton)(() => ({
  right: theme.spacing(0.5),
  top: theme.spacing(0.25),
}))

export const OpenMenuHeader = styled(Box)(() => ({
  margin: theme.spacing(0.5, 0, 1.5),
  height: theme.spacing(5),
  display: 'flex',
}))

export const NavMenuWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1, 2),
  flexDirection: 'column',
}))

export const DonateButtonWrapper = styled(Grid)(() => ({
  borderTop: '2px solid lightgrey',
  textAlign: 'center',
  minHeight: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',
  paddingTop: theme.spacing(3),
}))

export const DonateButton = styled(LinkButton)(() => ({
  padding: theme.spacing(1, 6),
  marginTop: theme.spacing(3),
}))

export const LocaleButtonWrapper = styled(Box)(() => ({
  borderTop: '2px solid lightgrey',
  borderBottom: '2px solid lightgrey',
  display: 'flex',
  minHeight: theme.spacing(8),

  '& button': {
    justifyContent: 'start',
    marginLeft: theme.spacing(1),
    padding: 0,
    fontSize: theme.typography.pxToRem(14),
  },
}))
