import { styled } from '@mui/material/styles'
import { CardContent, CardHeader, Typography } from '@mui/material'

import theme from 'common/theme'

export const ContentContainer = styled(CardContent)(() => ({
  margin: theme.spacing(2, 0, 5, 0),

  '&:last-child': {
    paddingBottom: 0,
  },
}))

export const StyledCardHeader = styled(CardHeader)(() => ({
  flexGrow: 1,
  flex: 0,
  margin: theme.spacing(0),
  padding: theme.spacing(0),
  alignSelf: 'center',
  justifyContent: 'center',

  [theme.breakpoints.up('sm')]: {
    justifyContent: 'initial',
  },
}))

export const PrincipleHeading = styled(Typography)(() => ({
  display: 'block',
  color: theme.palette.primary.main,
  fontSize: theme.typography.pxToRem(18),
}))
