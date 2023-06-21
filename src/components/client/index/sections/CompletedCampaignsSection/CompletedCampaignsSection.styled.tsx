import Slider from 'react-slick'

import { Link, Grid } from '@mui/material'
import styled from '@emotion/styled'

import theme from 'common/theme'

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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: theme.spacing(37.5),
  backgroundSize: 'cover',

  '&:hover': {
    opacity: 0.9,
  },
}))

export const CampaignTitle = styled('h6')(() => ({
  fontSize: theme.typography.pxToRem(16),
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
}))

export const SumWrapper = styled(Grid)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  padding: theme.spacing(0.6, 0),
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  fontSize: theme.typography.pxToRem(17),
}))

export const Sum = styled('span')(() => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(16),
  fontFamily: 'sans-serif',
}))
