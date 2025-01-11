import { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { IconButton, Modal, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import theme from 'common/theme'
import { type ImageSlider} from 'components/common/campaign-file/roles'
import Gallery from './Gallery'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'

const PREFIX = 'ImageSlider'
const classes = {
  container: `${PREFIX}-container`,
  slider: `${PREFIX}-slider`,
  carouselFullScreen: `${PREFIX}-fullScreen`,
  minimizeFullScreenBtn: `${PREFIX}-minimizeFullScreenBtn`,
  singleImageContainer: `${PREFIX}-singleImageContainer`,
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
      right: theme.spacing(4),
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
    width: '100vw',
    '& .slick-prev': {
      left: '5vw',
    },
    '& .slick-slide': {
      position: 'relative',
    },

    '& .slick-next': {
      right: '5vw',
    },

    '& .slick-track img': {
      maxWidth: '100%',
      objectFit: 'contain',
    },

    '& .slick-track': {
      height: '42vh',
      [theme.breakpoints.up(600)]: {
        height: '80vh',
      },
      [theme.breakpoints.up(800)]: {
        height: '88vh',
      },
      [theme.breakpoints.up(1024)]: {
        height: '90vh',
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
  [`& .${classes.minimizeFullScreenBtn}`]: {
    position: 'absolute',
    color: 'white',
    right: 0,
    top: 0,
    cursor: 'pointer',
    zIndex: 9999,

    ['svg']: {
      fontSize: 50,
    },
  },
  [`& .${classes.singleImageContainer}`]: {
    textAlign: 'center',
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

export function ImageSlider({ sliderImages }: Props) {
  const { t } = useTranslation()
  if (sliderImages.length === 0) {
    return null
  }

  if (sliderImages.length === 1) {
    return (
      <Root className={classes.container}>
        <div className={classes.singleImageContainer}>
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
      <Gallery images={sliderImages}>
        <Slider {...settings} className={classes.slider}>
          {sliderImages.map((image, index) => (
            <Image
              src={image.src}
              alt={image.fileName}
              height={300}
              width={500}
              style={{ objectFit: 'contain' }}
              key={index}
            />
          ))}
        </Slider>
      </Gallery>
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
      hideBackdrop
      onClose={onClose}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
        cursor: 'grab',
      }}>
      <Root>
        <IconButton
          size="large"
          onClick={onClose}
          className={classes.minimizeFullScreenBtn}
          aria-label="minimize gallery">
          <FullscreenExitIcon />
        </IconButton>
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
