import { CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'

export const CardWrapper = styled(Typography)(() => ({
  border: 'none',

  '&:hover': {
    'a button': {
      display: 'flex',
    },
  },
}))

export const Card = styled(CardMedia)(() => ({
  height: 200,
}))

export const CampaignTitle = styled(Typography)(() => ({
  fontWeight: 500,
  position: 'relative',
  color: theme.palette.common.white,
}))

export const SupportNowButton = styled(LinkButton)(() => ({
  display: 'none',
  fontWeight: 'bold',
}))
