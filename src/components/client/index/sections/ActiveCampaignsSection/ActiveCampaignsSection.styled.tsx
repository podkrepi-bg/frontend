import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

export const Root = styled('section')(() => ({
  padding: theme.spacing(0, 2),
}))

export const ActiveCampaignsWrapper = styled(Grid)(() => ({
  display: 'grid',
  marginTop: theme.spacing(3.875),
  gap: theme.spacing(4.62),

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    marginTop: theme.spacing(7),
    gap: theme.spacing(2.5),
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: theme.spacing(0.875),
  },

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `${theme.spacing(7)} auto ${theme.spacing(4)} auto`,
  },
}))

export const SeeAllButtonWrapper = styled(Grid)(() => ({
  display: 'flex',
  placeContent: 'center',
  marginTop: theme.spacing(10),
}))

export const SeeAllButton = styled(LinkButton)(() => ({
  fontFamily: "'Lato', sans-serif",
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 600,
  color: theme.palette.common.black,
  letterSpacing: '0.4px',
  textDecoration: 'underline',
  marginTop: 0,

  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
}))
