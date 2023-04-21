import { CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Content = styled(CardContent)(() => ({
  padding: theme.spacing(0, 1),
  position: 'absolute',
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
  color: theme.palette.secondary.light,
  fontFamily: 'Montserrat, sans-serif',
}))

export const SupportNowButton = styled(LinkButton)(() => ({
  display: 'none',
  fontWeight: 'bold',
  fontFamily: 'Montserrat, sans-serif',

  [theme.breakpoints.down('md')]: { display: 'flex' },
}))
