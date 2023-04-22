import { Divider, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const SubtitleSectionNumber = styled(Typography)(() => ({
  display: 'inline-block',
  color: theme.palette.primary.light,
  fontWeight: 'bold',

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(50),
    marginTop: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(40),
    marginLeft: theme.spacing(3),
  },
}))

export const SubtitleSectionText = styled(Typography)(() => ({
  display: 'inline-block',
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
  },
}))

export const SectionDivider = styled(Divider)(() => ({
  marginBottom: theme.spacing(1),
}))
