import { Button, Typography, Grid, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

export const Root = styled('section')(() => ({
  backgroundColor: theme.palette.secondary.light,
  marginTop: theme.spacing(14),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0),
  },
}))

export const SectionGridWrapper = styled(Grid)(() => ({
  display: 'flex',
  margin: '0 auto',
  padding: theme.spacing(0, 1.8),
  maxWidth: theme.spacing(162),
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}))

export const Heading = styled(Typography)<TypographyProps>(() => ({
  color: theme.palette.primary.dark,
  fontWeight: 500,
  margin: theme.spacing(7, 0, 2),
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(35),
  letterSpacing: '-1px',

  [theme.breakpoints.up(841)]: {
    margin: theme.spacing(0, 0, 2),
  },
}))

export const Subtitle = styled(Typography)(() => ({
  display: 'inline-block',
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
}))

export const HelpThoseInNeedButton = styled(LinkButton)(() => ({
  fontWeight: 600,
  borderRadius: theme.borders.round,
  backgroundColor: theme.palette.primary.light,
  minWidth: theme.spacing(3.75),
  fontSize: theme.typography.pxToRem(15),
  margin: theme.spacing(2, 0, 0, 'auto'),
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',

  '& span': {
    display: 'none',
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  },

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(17),
    minWidth: theme.spacing(50),

    '& span': {
      display: 'inline-flex',
    },
  },
}))

export const SubscribeHeading = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(16.5),
  marginBottom: theme.spacing(2),
}))

export const SubscribeButton = styled(Button)(() => ({
  fontWeight: 600,
  borderRadius: theme.borders.round,
  backgroundColor: theme.palette.secondary.main,
  minWidth: theme.spacing(3.75),
  fontSize: theme.typography.pxToRem(15),
  margin: theme.spacing(2, 0, 0, 'auto'),
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',

  '& span': {
    display: 'none',
  },

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(17),
    minWidth: theme.spacing(50),

    '& span': {
      display: 'inline-flex',
    },
  },
}))
