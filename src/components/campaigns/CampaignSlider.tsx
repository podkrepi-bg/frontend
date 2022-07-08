import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { styled } from '@mui/material/styles'

const classes = {
  container: 'container',
  slider: 'slider',
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.container}`]: {
    margin: theme.spacing(5, 0),
  },
  [`& .${classes.slider}`]: {
    '& .slick-slide': {
      width: '100%',
      height: '100%',
      padding: theme.spacing(0, 1),
    },
    '& .slick-prev': {
      left: theme.spacing(6),
      zIndex: 3,
    },
    '& .slick-next': {
      right: theme.spacing(6),
      zIndex: 3,
    },
    '& .slick-next::before, .slick-prev::before': {
      fontSize: theme.spacing(5),
      fontWeight: 'bold',
      [theme.breakpoints.down('lg')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('md')]: {
        fontSize: theme.spacing(3),
      },
    },
    '& .slick-dots li button:before': {
      fontSize: theme.spacing(1),
      color: '#32a9fe',
    },
  },
}))

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
        speed: 500,
      },
    },
  ],
}

type Props = {
  sliderImages: Array<string>
}

export default function CampaignSlider({ sliderImages }: Props) {
  if (sliderImages.length === 0) {
    return null
  }
  if (sliderImages.length === 1) {
    return (
      <Root className={classes.container}>
        <div style={{ textAlign: 'center' }}>
          <Image
            src={sliderImages[0]}
            alt="campaign"
            height="300px"
            width="400px"
            objectFit="cover"
          />
        </div>
      </Root>
    )
  }
  return (
    <Root className={classes.container}>
      <Slider {...settings} className={classes.slider}>
        {sliderImages.map((image, index) => (
          <div key={index}>
            <Image src={image} alt="campaign" height="300px" width="400px" objectFit="cover" />
          </div>
        ))}
      </Slider>
    </Root>
  )
}
