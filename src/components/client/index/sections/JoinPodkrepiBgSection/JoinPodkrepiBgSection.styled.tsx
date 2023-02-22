import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Root = styled('section')(() => ({
  display: 'flex',
  padding: theme.spacing(10, 3),
  marginBottom: theme.spacing(12),
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.light,
  marginTop: theme.spacing(8),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(12),
  },
}))

export const BecomeVolunteerButton = styled(LinkButton)(() => ({
  marginTop: theme.spacing(6),
  fontWeight: 'bold',

  [theme.breakpoints.up('sm')]: {
    minWidth: theme.spacing(35),
  },
}))
