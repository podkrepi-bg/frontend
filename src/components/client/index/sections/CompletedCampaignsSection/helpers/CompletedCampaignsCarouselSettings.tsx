import { Settings } from 'react-slick'

export const settings: Settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  lazyLoad: 'ondemand',
  autoplay: false,

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
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}
