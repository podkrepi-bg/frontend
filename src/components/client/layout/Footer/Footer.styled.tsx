import { Grid, Typography } from '@mui/material'
import { lighten } from '@mui/material/styles'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('footer')(() => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'left',
  backgroundColor: theme.palette.primary.dark,
  color: lighten(theme.palette.primary.main, 0.75),

  '& a': {
    color: lighten(theme.palette.primary.main, 0.75),

    '&:hover': {
      color: lighten(theme.palette.primary.main, 0.55),
    },
  },
}))

export const FooterWrapper = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(5),
}))

export const FooterLinksWrapper = styled(Grid)(() => ({
  margin: theme.spacing(6, 0, 3, 0),

  [theme.breakpoints.up('sm')]: {
    marginTop: 0,
  },

  [theme.breakpoints.up('md')]: {
    display: 'inline-flex',
    gap: theme.spacing(1),
  },
}))

export const FooterLinkTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(16),
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(0.5),
  width: 'fit-content',
  borderBottom: `2px solid ${lighten(theme.palette.primary.main, 0.4)}`,
}))

export const FooterLink = styled(Grid)(() => ({
  padding: theme.spacing(0.5, 0),
}))

export const Copyright = styled(Grid)(() => ({
  borderTop: `2px solid ${lighten(theme.palette.primary.main, 0.4)}`,
  paddingTop: theme.spacing(3),
}))

export const SocialIconsWrapper = styled(Grid)(() => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}))

export const SubscribeLinkWrapper = styled(Grid)(({ theme }) => ({
  [`& p`]: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(17),
    marginRight: theme.spacing(0.7),
  },

  '&:hover': {
    textDecoration: 'underline',
    transform: 'scale(1.03)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}))

export const SubscriptionTitle = styled(Typography)(() => ({
  '&:hover': {
    textDecoration: 'underline',
    transform: 'scale(1.01)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}))
