import Slider from 'react-slick'

import styled from '@emotion/styled'

import theme from 'common/theme'
import { Link, Grid } from '@mui/material'

export const Root = styled('section')(() => ({
  marginTop: theme.spacing(12),
}))

export const CarouselWrapper = styled(Slider)(() => ({
  margin: '0 auto',
  maxWidth: theme.spacing(162),

  '.slick-list': {
    paddingBottom: theme.spacing(3),
  },

  '.slick-dots li button::before': {
    fontSize: theme.typography.pxToRem(10),
    color: '#D9D9D9',
    opacity: 1,
  },

  '.slick-dots li.slick-active button::before': {
    fontSize: theme.typography.pxToRem(10),
    color: '#B0E5FF',
    opacity: 1,
  },
}))

export const CardWrapper = styled(Grid)(() => ({
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 1.25),
    paddingRight: theme.spacing(2.5),
  },
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
  color: theme.palette.common.black,
}))

export const SumWrapper = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0.6, 0),
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(17),
}))

export const Sum = styled('span')(() => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(17),
  fontFamily: 'sans-serif',
}))
