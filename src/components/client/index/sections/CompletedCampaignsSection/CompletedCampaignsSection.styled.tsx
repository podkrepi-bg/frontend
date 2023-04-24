import Slider from 'react-slick'

import styled from '@emotion/styled'

import theme from 'common/theme'
import { Typography, Link, Grid, Stack } from '@mui/material'

export const Root = styled('section')(() => ({
  marginTop: theme.spacing(12),
}))

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
  margin: theme.spacing(1.8, 1.25),
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(16),
  lineHeight: '150%',
  color: theme.palette.secondary.light,
}))

export const MoneyWrapper = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(0.6, 0),
  minWidth: theme.spacing(17.5),
  background: '#323232',
  borderRadius: theme.spacing(0, 0, 0, 2),
  color: '#B0E5FF',
  marginLeft: 'auto',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(17),
  alignItems: 'center',
}))

export const MoneyUnit = styled('span')(() => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(17),
}))

export const MoneyFraction = styled('span')(() => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(10),
  marginTop: theme.spacing(0.5),

  [theme.breakpoints.up(1270)]: {
    marginTop: theme.spacing(0.3),
  },
}))

export const MoneyWrapperFlex = styled(Stack)(() => ({
  flexDirection: 'row',
}))

export const MoneyText = styled(Typography)(() => ({
  color: theme.palette.common.white,
  fontFamily: 'Lato, sans-serif',
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(17),
  padding: theme.spacing(0, 1),
}))
