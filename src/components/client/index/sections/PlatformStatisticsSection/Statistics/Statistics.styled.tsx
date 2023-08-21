import { Divider, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const StatisticsSectionWrapper = styled(Grid)(() => ({
  margin: '0 auto',
  padding: theme.spacing(7, 0),
}))

export const SubtitleSectionNumber = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.light,
  fontWeight: 'bold',
  fontSize: theme.typography.pxToRem(52),
  lineHeight: 1,

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(50),
    marginTop: theme.spacing(1),
  },
}))

export const Fraction = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.light,
  fontWeight: 'bold',
  lineHeight: 1,
  fontSize: theme.typography.pxToRem(20),
  marginTop: theme.spacing(0.7),

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(1.6),
  },
}))

export const StatisticsWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(1.87, 0),

  '&:last-of-type': { flexDirection: 'column' },

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1.87),

    '&:last-of-type': { flexDirection: 'row' },
  },
}))

export const SubtitleSectionText = styled(Typography)(() => ({
  display: 'inline-block',
  marginLeft: theme.spacing(2),
}))

export const SectionDivider = styled(Divider)(() => ({
  marginBottom: theme.spacing(1),
}))
