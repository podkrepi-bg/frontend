import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import CloseModalButton from 'components/common/CloseModalButton'
import Grid from 'components/recurring-donation/grid/Grid'

export const CloseButton = styled(CloseModalButton)(() => ({
  marginRight: theme.spacing(1.25),
}))

export const StyledPodkrepiIcon = styled(PodkrepiIcon)(() => ({
  margin: theme.spacing(3, 0, 1.5, 0),
}))

export const DonateButtonWrapper = styled(Grid)(() => ({
  borderTop: '2px solid lightgrey',
  textAlign: 'center',
  minHeight: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',
  paddingTop: theme.spacing(3),
}))

export const StyledLocaleButton = styled(Grid)<{ children: React.ReactNode }>(() => ({
  borderTop: '2px solid lightgrey',
  display: 'flex',
  minHeight: theme.spacing(8),
  background: 'red !important',

  '& button': {
    // justifyContent: 'start',
    // marginLeft: theme.spacing(1.3),
    // fontSize: theme.spacing(1.75),
    // background: 'red !important',
  },
}))
