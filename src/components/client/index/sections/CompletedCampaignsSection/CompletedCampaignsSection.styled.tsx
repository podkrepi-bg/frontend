import Slider from 'react-slick'

import styled from '@emotion/styled'

import theme from 'common/theme'
import { Typography, Link } from '@mui/material'

export const CarouselWrapper = styled(Slider)(() => ({
  margin: '0 auto',
  maxWidth: theme.spacing(162),
}))

export const CompletedCampaignLink = styled(Link)(() => ({
  height: theme.spacing(37.5),
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '&:hover': {
    opacity: 0.9,
  },
}))

export const CampaignTitle = styled('h6')(() => ({
  height: theme.spacing(5),
  margin: theme.spacing(1.8, 1.25),
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(16),
  lineHeight: '150%',
  color: theme.palette.secondary.light,
}))

export const ReachedMoneyWrapper = styled(Typography)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(0.5, 0, 0, 1),
  minWidth: theme.spacing(12.5),
  minHeight: theme.spacing(7.5),
  background: '#323232',
  borderRadius: theme.spacing(0, 0, 0, 2),
  color: '#B0E5FF',
  marginLeft: 'auto',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(17),
}))

export const ReachedMoney = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(17),
}))

export const ReachedText = styled(Typography)(() => ({
  color: theme.palette.common.white,
  fontFamily: 'Lato, sans-serif',
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(17),
}))
