import Slider from 'react-slick'

import styled from '@emotion/styled'

import theme from 'common/theme'
import { Typography } from '@mui/material'

export const CarouselWrapper = styled(Slider)(() => ({
  margin: '0 auto',
  maxWidth: theme.spacing(162),
}))

export const CampaignTitle = styled('h6')(() => ({
  height: theme.spacing(5),
  margin: '15px 10px',
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(16),
  lineHeight: '150%',
  color: '#FAFAFA',
}))

export const ReachedMoneyWrapper = styled(Typography)(() => ({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 0, 0, 1),
  minWidth: theme.spacing(12.5),
  minHeight: theme.spacing(7.5),
  background: '#323232',
  borderRadius: theme.spacing(0, 0, 0, 2),
  color: '#B0E5FF',
  marginLeft: 'auto',
  fontFamily: 'Montserrat, sans-serif',
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
