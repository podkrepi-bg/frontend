import { Box, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Content = styled(CardContent)(() => ({
  padding: theme.spacing(0, 1),
  width: '100%',
  bottom: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 3),
  },
}))

export const CampaignTitle = styled('h6')(() => ({
  margin: '8px 0 0',
  fontSize: theme.typography.pxToRem(16),
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  minHeight: '50px',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  whiteSpace: 'pre-wrap',
}))

export const SumNumber = styled('span')(() => ({
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'inline',
  },
}))

export const CampaignProgressWrapper = styled(Box)(() => ({
  span: {
    background: '#B0E5FF',
    borderRadius: theme.borders.round,
    height: theme.spacing(2),
  },
}))

export const DonateButton = styled(LinkButton)(() => ({
  fontFamily: 'Montserrat, sans-serif',
  width: '89px',
  height: '36px',
  marginRight: theme.spacing(1),
  background: '#FFCB57',
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  borderRadius: '100px',
  fontWeight: '500',
  fontSize: '16px',
  letterSpacing: '0.4px',

  '&:hover': {
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  },

  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(1.5),
    display: 'block',
  },

  [theme.breakpoints.up(1111)]: {
    marginBottom: 0,
    display: 'inline-flex',
  },
}))

export const LearnMoreButton = styled(LinkButton)(() => ({
  fontFamily: "'Lato', sans-serif",
  fontSize: '16px',
  letterSpacing: '0.4px',
  color: theme.palette.common.black,
  border: '2px solid #FFCB57',
  height: '36px',

  '&:hover': {
    color: theme.palette.common.black,
  },
}))
