import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const CardWrapper = styled(Card)(() => ({
  border: 'none',

  '&:hover': {
    'a button': {
      display: 'flex',
    },
  },
}))

export const CampaignTitle = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 600,
  position: 'relative',
  color: theme.palette.common.white,
}))

export const SupportNowButton = styled(LinkButton)(() => ({
  //   display: 'none',
  fontWeight: 'bold',
}))
