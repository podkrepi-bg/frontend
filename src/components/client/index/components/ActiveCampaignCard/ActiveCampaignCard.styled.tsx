import { CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const Content = styled(CardContent)(() => ({
  padding: theme.spacing(0, 4),
}))

export const CampaignTitle = styled('h6')(() => ({
  visibility: 'hidden',
  fontWeight: 'bold',
  width: '290px',
  height: '40px',
}))

export const SupportNowButton = styled(LinkButton)(() => ({
  //   display: 'none',
  fontWeight: 'bold',
}))
