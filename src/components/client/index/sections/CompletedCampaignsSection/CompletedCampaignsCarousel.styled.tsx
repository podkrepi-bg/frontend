import Slider from 'react-slick'

import styled from '@emotion/styled'

import theme from 'common/theme'

export const CampaignTitle = styled('h6')(() => ({
  maxWidth: theme.spacing(32),
  height: theme.spacing(5),
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(12),
}))

export const CompletedCampaignsCarousel = styled(Slider)(() => ({
  margin: '0 auto',
  maxWidth: theme.spacing(162),
}))
