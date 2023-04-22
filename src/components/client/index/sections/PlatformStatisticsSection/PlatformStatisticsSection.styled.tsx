import { Typography } from '@mui/material'
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

export const SectiongGridWrapper = styled('section')(() => ({
  margin: '0 auto',
  maxWidth: theme.spacing(162),
  display: 'flex',
  alignItems: 'start',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}))

export const Heading = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.dark,
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(5),
  },
}))

export const Subtitle = styled(Typography)(() => ({
  display: 'inline-block',
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    fontFamily: 'Raleway',
  },
}))

export const DonateButton = styled(LinkButton)(() => ({
  fontWeight: 600,
  borderRadius: theme.borders.round,
  backgroundColor: theme.palette.primary.light,
  minWidth: theme.spacing(25),

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },

  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(4),
    fontSize: theme.typography.pxToRem(17),
  },

  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(4),
    fontSize: theme.typography.pxToRem(20),
    minWidth: theme.spacing(40),
  },
}))
