import Slider from 'react-slick'

import { Grid, Box, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  marginTop: theme.spacing(12),
  padding: theme.spacing(0, 2),
}))

export const CarouselWrapper = styled(Slider)(() => ({
  margin: '0 auto',
  maxWidth: theme.spacing(162),

  '.slick-list': {
    paddingBottom: theme.spacing(7),
  },

  '.slick-dots': {
    position: 'relative',
    bottom: 'auto',
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

  '&:hover': {
    opacity: 0.9,
  },
}))

export const CompletedCampaignImage = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: theme.spacing(37.5),
  backgroundSize: 'cover',
}))

export const CampaignTitle = styled('h6')(() => ({
  fontSize: theme.typography.pxToRem(16),
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  margin: theme.spacing(1, 0, 0),
}))

export const CompletedSumWrapper = styled(Grid)(() => ({
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

export const SuccessfulCampaignLabel = styled(Grid)(() => ({
  display: 'flex',
  textTransform: 'uppercase',
  color: '#616161',
}))

export const SuccessfullCampiagnText = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(16),
}))

export const SuccessfullCampaignIcon = styled(DoneIcon)(() => ({
  fontSize: theme.typography.pxToRem(21),
  marginRight: theme.spacing(0.5),
}))

export const CampaignProgressWrapper = styled(Box)(() => ({
  background: '#62DE88',
  borderRadius: theme.borders.round,
  height: theme.spacing(2),
}))
