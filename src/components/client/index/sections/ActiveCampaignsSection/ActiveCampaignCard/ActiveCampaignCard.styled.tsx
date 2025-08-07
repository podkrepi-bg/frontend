import { Card, CardActions, CardContent, Grid2 } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Root = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'initial',
  boxShadow: 'none',
  position: 'relative',
  borderRadius: theme.spacing(0.37),

  '&:hover': {
    filter: 'grayscale(15%)',
    backgroundColor: '#F8F8F8	',
  },

  [theme.breakpoints.up('lg')]: {
    '&:nth-of-type(1)': {
      gridArea: '1 / 1 / 3 / 3',

      img: {
        height: theme.spacing(60.625),
      },
    },
  },

  [theme.breakpoints.up(1430)]: {
    '&:nth-of-type(1)': {
      img: {
        height: theme.spacing(71.6),
      },
    },
  },
}))

export const StyledContent = styled(CardContent)(() => ({
  padding: 0,

  '&:last-child': { paddingBottom: 0 },
}))

export const CampaignTitle = styled('h3')(() => ({
  fontSize: theme.typography.pxToRem(16),
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  textAlign: 'left',
  margin: theme.spacing(1, 0, 0),
  minHeight: theme.spacing(6.25),
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  whiteSpace: 'pre-wrap',
}))

export const SumWrapper = styled(Grid2)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  padding: theme.spacing(0.6, 0),
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(17),
}))

export const Sum = styled('span')(() => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(16),
  fontFamily: 'sans-serif',
}))

export const SumNumber = styled('span')(() => ({
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'inline',
  },
}))

export const StyledCardActions = styled(CardActions)(() => ({
  position: 'absolute',
  bottom: theme.spacing(14.37),
  right: theme.spacing(0.75),
  padding: 0,
}))

export const DonateButton = styled(LinkButton)(() => ({
  fontFamily: 'Montserrat, sans-serif',
  width: theme.spacing(11.125),
  height: theme.spacing(4.5),
  padding: theme.spacing(0.75, 2),
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  borderRadius: theme.borders.round,
  fontWeight: '500',
  fontSize: theme.typography.pxToRem(16),
  letterSpacing: '0.4px',

  '&:hover': {
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  },

  '&.Mui-disabled': {
    backgroundColor: 'rgba(152, 152, 152, 0.8)',
    color: 'rgba(0, 0, 0, 0.4)',
  },

  [theme.breakpoints.up(1111)]: {
    display: 'inline-flex',
    marginBottom: 0,
  },
}))
