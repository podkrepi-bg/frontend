import { Settings } from 'react-slick'

export const settings: Settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: true,
  lazyLoad: 'ondemand',
  autoplay: true,
  autoplaySpeed: 2000,

  responsive: [
    {
      breakpoint: 1230,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}
