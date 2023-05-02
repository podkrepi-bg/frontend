import { Typography, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

export const Root = styled('section')(() => ({
  backgroundColor: theme.palette.secondary.light,
  marginTop: theme.spacing(10),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0),
  },
}))

export const SectionGridWrapper = styled(Grid)(() => ({
  display: 'flex',
  margin: '0 auto',
  maxWidth: theme.spacing(162),
  alignItems: 'start',

  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}))

export const Heading = styled(Typography)(() => ({
  color: theme.palette.primary.dark,
  textAlign: 'center',
  fontWeight: 500,
  margin: theme.spacing(2, 0),
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(35),
  letterSpacing: '-1px',
}))

export const Subtitle = styled(Typography)(() => ({
  display: 'inline-block',
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
  margin: theme.spacing(1, 2),
}))

export const HelpButtonWrapper = styled(Grid)(() => ({
  display: 'fkex',
  justifyContent: 'center',
}))

export const HelpThoseInNeedButton = styled(LinkButton)(() => ({
  display: 'block',
  fontWeight: 600,
  borderRadius: theme.borders.round,
  backgroundColor: theme.palette.primary.light,
  minWidth: theme.spacing(3.75),
  fontSize: theme.typography.pxToRem(15),
  marginBottom: theme.spacing(5),
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
    margin: theme.spacing(4),
    minWidth: theme.spacing(50),

    '& span': {
      display: 'inline-block',
    },
  },
}))
