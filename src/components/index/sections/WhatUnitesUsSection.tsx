import React from 'react'
import { Container, Grid, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useTranslation } from 'next-i18next'
import { Navigation, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import theme from 'common/theme'
import Heading from 'components/common/Heading'
import WhatUnitesUsCard from '../helpers/whatUnitesUs/WhatUnitesUsCard'
import { data } from '../helpers/whatUnitesUs/whatUnitesUsData'
import { createStyles, makeStyles } from '@mui/styles'

const swiperOptions: SwiperProps = {
  loop: true,
  loopAdditionalSlides: 1,
  modules: [Navigation, A11y, Autoplay],
  autoplay: { delay: 5000 },
  breakpoints: {
    [theme.breakpoints.values.xs]: {
      slidesPerView: 1,
    },
    [theme.breakpoints.values.md]: {
      slidesPerView: 2,
    },
    [theme.breakpoints.values.lg]: {
      slidesPerView: 3,
    },
  },
  spaceBetween: 20,
}

const useStyles = makeStyles(() =>
  createStyles({
    sliderNavNext: {
      order: 3,
    },
    sliderNavPrevious: {
      order: 1,
    },
  }),
)

export default function WhatUnitesUsSection() {
  const { t } = useTranslation()
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <Heading
        textAlign="center"
        variant="h4"
        color={theme.palette.primary.dark}
        paddingBottom={theme.spacing(7)}>
        {t('index:what-unites-us-section.heading')}
      </Heading>
      <Grid
        container
        display="flex"
        flexDirection="row"
        alignItems="baseline"
        paddingBottom={theme.spacing(12)}>
        <Grid item xs={12} display="flex" alignItems="center" position="relative">
          <IconButton
            className={classes.sliderNavPrevious}
            ref={navigationPrevRef}
            aria-label="Previouos slide">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            className={classes.sliderNavNext}
            ref={navigationNextRef}
            aria-label="Next slide">
            <ChevronRightIcon />
          </IconButton>
          <Swiper
            {...swiperOptions}
            style={{ marginLeft: theme.spacing(2), marginRight: theme.spacing(2), order: 2 }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (!swiper.params.navigation || swiper.params.navigation === true) {
                return
              }
              swiper.params.navigation.prevEl = navigationPrevRef.current
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}>
            {data.map((x) => (
              <SwiperSlide key={x.title}>
                <WhatUnitesUsCard info={x} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Container>
  )
}
