import theme from 'common/theme'
import Link from 'components/common/Link'
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

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `0 auto ${theme.spacing(4)} auto`,
  },
}))

export const ArticleLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.background.default,
  filter: 'grayscale(80%)',
  opacity: 0.8,
  boxShadow:
    '0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.20)',

    '&:hover': {
      filter: 'grayscale(0)',
      opacity: 1,
    }
}))
