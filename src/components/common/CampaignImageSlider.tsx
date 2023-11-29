import { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Modal, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import theme from 'common/theme'
import { ImageSlider } from 'components/common/campaign-file/roles'
import withFullScreenSlider from './withFullScreenSlider'

const classes = {
  container: 'container',
  slider: 'slider',
  carouselFullScreen: 'carouselFullScreen',
}

const Root = styled('div')(() => ({
  [`& .${classes.container}`]: {
    margin: theme.spacing(5, 0),
  },
  [`& .${classes.slider}`]: {
    '& .slick-slide': {
      width: '100%',
      height: '100%',
    },
    '& .slick-prev': {
      left: theme.spacing(1),
      zIndex: 3,
    },
    '& .slick-next': {
      right: theme.spacing(3.5),
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
      color: theme.palette.primary.main,
    },
  },
  [`& .${classes.carouselFullScreen}`]: {
    maxWidth: '100%',
    maxHeight: '100%',
    '& .slick-prev': {
      left: theme.spacing(1),
      zIndex: 3,
    },
    '& .slick-slide': {
      position: 'relative',
    },

    '& .slick-next': {
      right: theme.spacing(3.5),
      zIndex: 3,
    },

    '& .slick-track img': {
      maxWidth: '100%',
      objectFit: 'contain',
    },

    '& .slick-track': {
      aspectRatio: 20,
      minHeight: 350,
      [theme.breakpoints.up(600)]: {
        aspectRatio: 45,
      },
      [theme.breakpoints.up(800)]: {
        minHeight: 370,
        aspectRatio: 49,
      },
      [theme.breakpoints.up(1024)]: {
        minHeight: 540,
        aspectRatio: 34,
      },
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
      color: theme.palette.primary.main,
    },
  },
}))

type Props = {
  sliderImages: ImageSlider[]
}
const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        speed: 500,
      },
    },
  ],
}

export default function CampaignImageSlider({ sliderImages }: Props) {
  const { t } = useTranslation()
  const WithFullScreenSlider = withFullScreenSlider(Image)
  if (sliderImages.length === 0) {
    return null
  }

  if (sliderImages.length === 1) {
    return (
      <Root className={classes.container}>
        <div style={{ textAlign: 'center' }}>
          <Image
            src={sliderImages[0].src}
            alt={sliderImages[0].fileName}
            height={300}
            width={500}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Root>
    )
  }
  return (
    <Root className={classes.container}>
      <Typography variant="h4" sx={{ my: theme.spacing(3), fontWeight: '500' }}>
        {t('campaigns:campaign.gallery')}
      </Typography>
      <Slider {...settings} className={classes.slider}>
        {sliderImages.map((image, index) => (
          <div key={index}>
            <WithFullScreenSlider
              images={sliderImages}
              src={image.src}
              alt={image.fileName}
              height={300}
              width={500}
              style={{ objectFit: 'contain' }}
              index={index}
            />
          </div>
        ))}
      </Slider>
    </Root>
  )
}

type ModalProps = Props & {
  onOpen: boolean
  onClose: () => void
  initialImage: React.MutableRefObject<number>
}
export const FullScreenImageSlider = ({
  sliderImages,
  onOpen,
  onClose,
  initialImage,
}: ModalProps) => {
  const sliderRef = useRef<Slider | null>(null)
  const newSettings: Settings = {
    ...settings,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    beforeChange(currentSlide, nextSlide) {
      sliderRef.current?.slickGoTo(nextSlide)
    },
    initialSlide: initialImage.current ?? 0,
  }

  return (
    <Modal
      open={onOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}>
      <Root style={{ width: 1000, maxWidth: '100%' }}>
        <Slider {...newSettings} className={classes.carouselFullScreen} ref={sliderRef}>
          {sliderImages.map((image, index) => (
            <div key={index} style={{ position: 'relative', maxWidth: '100%' }}>
              <Image src={image.src} alt={image.fileName} fill />
            </div>
          ))}
        </Slider>
      </Root>
    </Modal>
  )
}
