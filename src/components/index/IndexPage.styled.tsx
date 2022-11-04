import { Typography } from '@mui/material'
import { styled } from '@mui/system'

import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

export const Heading = styled(Typography)(() => ({
  color: theme.palette.primary.dark,
  textAlign: 'center',
  fontWeight: 500,
  marginBottom: theme.spacing(6),
}))

export const InfoText = styled(Typography)(() => ({
  display: 'inline-block',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
  paddingBottom: theme.spacing(6),
}))

export const OutlinedButton = styled(LinkButton)(() => ({
  marginTop: theme.spacing(6),
  fontWeight: 'bold',
  color: theme.palette.common.black,

  [theme.breakpoints.up('sm')]: {
    minWidth: theme.spacing(35),
  },
}))
