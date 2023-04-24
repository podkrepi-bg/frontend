import { Divider, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const StatisticsSectionWrapper = styled(Grid)(() => ({
  margin: '0 auto',
}))

export const SubtitleSectionNumber = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.light,
  fontWeight: 'bold',
  fontSize: theme.typography.pxToRem(40),
  marginLeft: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(50),
    marginTop: theme.spacing(1),
  },
}))

export const SubtitleSectionText = styled(Typography)(() => ({
  display: 'inline-block',
  marginLeft: theme.spacing(2),
}))

export const SectionDivider = styled(Divider)(() => ({
  marginBottom: theme.spacing(1),
}))
