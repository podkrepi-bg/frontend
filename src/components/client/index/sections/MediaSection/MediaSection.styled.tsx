import theme from 'common/theme'
import Slider from 'react-slick'

import { styled } from '@mui/material/styles'

export const Root = styled('section')(() => ({
  backgroundColor: '#EAF4FC',
  padding: theme.spacing(10, 0, 15),
}))

export const CarouselWrapper = styled(Slider)(() => ({
  display: 'contents',

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
