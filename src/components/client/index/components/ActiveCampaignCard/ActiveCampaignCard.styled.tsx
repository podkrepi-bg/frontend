import { CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Content = styled(CardContent)(() => ({
  padding: theme.spacing(0, 4),
  position: 'absolute',
  width: '100%',
  bottom: theme.spacing(2),
}))

export const CampaignTitle = styled('h6')(() => ({
  visibility: 'hidden',
  width: theme.spacing(36.25),
  height: theme.spacing(5),
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(12),
}))

export const SupportNowButton = styled(LinkButton)(() => ({
  //   display: 'none',
  fontWeight: 'bold',
}))
