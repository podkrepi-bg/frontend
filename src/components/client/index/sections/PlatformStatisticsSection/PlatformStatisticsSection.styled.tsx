import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

export const Root = styled('section')(() => ({
  backgroundColor: theme.palette.secondary.light,
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0),
  },
}))

export const Heading = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.dark,
}))

export const Subtitle = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.dark,
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
}))

export const DonateButton = styled(LinkButton)(() => ({
  fontWeight: 600,
  borderRadius: theme.borders.round,
  backgroundColor: theme.palette.primary.light,
  minWidth: theme.spacing(25),

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(7),
    fontSize: theme.typography.pxToRem(15),
    minWidth: theme.spacing(40),
  },

  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(20),
    minWidth: theme.spacing(40),
  },
}))
