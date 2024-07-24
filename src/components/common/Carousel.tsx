import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { useEffect, useRef } from 'react'
import Slider from 'react-slick'
import { styled } from '@mui/material/styles'

import type { InnerSlider, Settings } from 'react-slick'

type Props = Settings & {
  children: React.JSX.Element[] | React.JSX.Element | undefined
}

type TInnerSlider = InnerSlider & {
  props: Settings
}

interface InternalSlider extends Slider {
  innerSlider: TInnerSlider
}

const SliderStyled = styled(Slider)(({ theme }) => ({
  '.slick-list': {
    paddingBottom: theme.spacing(3),
    transition: 'visibility 2000ms',
  },

  '.slick-track': {
    transition: 'visibility 3000ms',
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

  '.slick-slide[aria-hidden=false]': {
    visibility: 'visible',
  },

  '.slick-slide[aria-hidden=true]': {
    visibility: 'hidden',
    animation: 'fadeIn 400ms',
  },

  '@keyframes fadeIn': {
    from: { visibility: 'visible' },
    to: { visibility: 'hidden' },
  },
}))

export default function Carousel({ children, ...props }: Props) {
  const sliderRef = useRef<InternalSlider | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Clear setTimeout instance if created
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const afterChange = (currentSlide: number) => {
    const totalChilds = (sliderRef.current?.props?.children as []).length
    const isLastSlide =
      totalChilds - (sliderRef.current?.innerSlider.props.slidesToShow as number) === currentSlide
    if (
      sliderRef.current?.props.infinite === false &&
      sliderRef.current?.props.autoplay === true &&
      isLastSlide
    ) {
      timerRef.current = setTimeout(() => {
        sliderRef.current?.slickGoTo(0)
      }, sliderRef.current?.innerSlider?.props.autoplaySpeed)
    }
  }

  return (
    <SliderStyled ref={sliderRef} {...props} waitForAnimate={false} afterChange={afterChange}>
      {children}
    </SliderStyled>
  )
}
