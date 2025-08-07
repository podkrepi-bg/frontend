import { Grid2 } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

export const Root = styled('section')(() => ({
  padding: theme.spacing(0, 2),

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
  },
}))

export const ActiveCampaignsWrapper = styled(Grid2)(() => ({
  display: 'grid',
  gap: theme.spacing(4.62),
  marginTop: theme.spacing(8),

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(3),
    marginTop: theme.spacing(10),
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `${theme.spacing(7)} auto ${theme.spacing(4)} auto`,
  },
}))

export const SeeAllButtonWrapper = styled(Grid2)(() => ({
  display: 'flex',
  placeContent: 'center',
  marginTop: theme.spacing(6),
}))

export const SeeAllButton = styled(LinkButton)(() => ({
  fontFamily: 'sans-serif',
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 600,
  color: '#252222',
  letterSpacing: '0.46px',
  backgroundColor: theme.palette.primary.light,
  lineHeight: theme.spacing(3.25),
  width: theme.spacing(28.5),
  height: theme.spacing(6),
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)',

  '&:hover': {
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
  },
}))
