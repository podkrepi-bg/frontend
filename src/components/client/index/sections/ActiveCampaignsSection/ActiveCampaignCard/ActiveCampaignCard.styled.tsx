import { Box, CardContent } from '@mui/material'
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
  margin: theme.spacing(1.8, 1.2),
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(16),
  lineHeight: '150%',
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  minHeight: '66px',
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': '3',
  whiteSpace: 'pre-wrap',
}))

export const DonateButton = styled(LinkButton)(() => ({
  fontFamily: 'Montserrat, sans-serif',
  width: '89px',
  height: '36px',
  background: '#FFCB57',
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  borderRadius: '100px',
  fontWeight: '600',
  fontSize: '16px',
  letterSpacing: '0.4px',

  '&:hover': {
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  },
}))

export const CampaignProgressWrapper = styled(Box)(() => ({
  span: {
    background: '#B0E5FF',
    borderRadius: theme.borders.round,
    height: theme.spacing(2),
  },
}))
