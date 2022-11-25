import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Root = styled(Grid)(() => ({
  marginTop: theme.spacing(15),
  textAlign: 'center',
}))

export const SuccessIcon = styled(Grid)(() => ({
  justifyContent: 'center',
  color: '#4BD12A',
  marginBottom: theme.spacing(4),

  '& svg': {
    fontSize: theme.typography.pxToRem(120),
  },
}))

export const SuccessButtonsWrapper = styled(Grid)(() => ({
  justifyContent: 'space-evenly',
}))

export const SuccessButton = styled(LinkButton)(() => ({
  backgroundColor: '#0098E3',
  border: '1px solid #909090',
  padding: theme.spacing(1, 5),
  borderRadius: theme.borders.round,
  color: theme.palette.common.white,
  fontSize: theme.typography.pxToRem(18),

  '&:hover': {
    backgroundColor: '#62C4FB',
    color: theme.palette.common.black,
    border: '1px solid #909090',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.pxToRem(12),
    marginBottom: theme.spacing(4),
  },
}))
