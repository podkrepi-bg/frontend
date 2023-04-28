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

export const SectionGridWrapper = styled('section')(() => ({
  display: 'flex',
  margin: '0 auto',
  maxWidth: theme.spacing(162),
  alignItems: 'start',

  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}))

export const Heading = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.dark,
  margin: theme.spacing(2),
}))

export const Subtitle = styled(Typography)(() => ({
  display: 'inline-block',
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.spacing(3),
  margin: theme.spacing(1, 2),
}))

export const HelpThoseInNeedButton = styled(LinkButton)(() => ({
  fontWeight: 600,
  borderRadius: theme.borders.round,
  backgroundColor: theme.palette.primary.light,
  minWidth: theme.spacing(45),
  fontSize: theme.typography.pxToRem(17),

  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(4),
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}))
