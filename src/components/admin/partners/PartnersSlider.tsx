import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'
import Slider, { CustomArrowProps, Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { StyledArrow } from './Partners.styled'

interface Props {
  children: ReactNode
}

const PartnersSlider: FC<Props> = ({ children }: Props) => {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
    <StyledArrow
      {...props}
      className={
        'slick-prev slick-arrow' + (slideCount && currentSlide === 0 ? ' slick-disabled' : '')
      }
      alt="next-arrow"
      src={'/img/partners/organizations/previousArrow.svg'}
      width={26}
      height={40}
    />
  )

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
    <StyledArrow
      {...props}
      className={
        'slick-next slick-arrow' +
        (slideCount && currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      alt="next-arrow"
      src={'/img/partners/organizations/nextArrow.svg'}
      width={26}
      height={40}
    />
  )

  const sliderSettings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  }

  return (
    <Box width={'100%'}>
      <Slider {...sliderSettings}>{children}</Slider>
    </Box>
  )
}

export default PartnersSlider
