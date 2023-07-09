import { Settings } from 'react-slick'

export const settings: Settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  lazyLoad: 'ondemand',
  autoplay: true,
  autoplaySpeed: 2000,

  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}
