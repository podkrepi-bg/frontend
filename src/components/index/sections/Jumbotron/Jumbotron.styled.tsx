import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

const bannerSource = '/img/family.jpg'

export const Root = styled('section')(() => ({
  backgroundImage: `url(${bannerSource})`,
  height: theme.spacing(49.375),
  padding: theme.spacing(6.25, 1),
  margin: theme.spacing(4, 0, 8, 0),
  backgroundPosition: '75%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',

  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(4, 0, 12, 0),
  },

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(7),
  },
}))

export const JumbotronWrapper = styled(Grid)(() => ({
  textAlign: 'left',

  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(11),
  },
}))

export const MainTitle = styled('h1')(() => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  marginTop: 0,
  marginBottom: theme.spacing(4),
  fontSize: theme.typography.pxToRem(30),
  maxWidth: theme.spacing(56),

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(32),
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: theme.typography.pxToRem(42),
    maxWidth: theme.spacing(73),
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

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(22),
  },

  [theme.breakpoints.up('md')]: {
    minWidth: theme.spacing(40),
  },
}))
