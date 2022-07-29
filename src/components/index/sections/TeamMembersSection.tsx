import React from 'react'
import { useTranslation } from 'next-i18next'
import { Navigation, A11y, Autoplay } from 'swiper'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Container, Grid, IconButton, Typography } from '@mui/material'

import theme from 'common/theme'
import { staticUrls } from 'common/routes'
import Heading from 'components/common/Heading'
import LinkButton from 'components/common/LinkButton'

import MemberCard from '../helpers/teamMembers/MemberCard'
import { data } from '../helpers/teamMembers/memberData'

import 'swiper/css'
import 'swiper/css/a11y'

const swiperOptions: SwiperProps = {
  loop: true,
  observer: true,
  loopAdditionalSlides: 3,
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
  spaceBetween: 30,
}

export default function TeamMembersSection() {
  const { t } = useTranslation()
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  return (
    <Container maxWidth="lg">
      <Heading
        textAlign="center"
        variant="h4"
        component="h2"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}
        paddingTop={theme.spacing(10)}
        paddingBottom={theme.spacing(7)}>
        {t('index:team-section.heading')}
      </Heading>
      <Typography textAlign="center" fontFamily="Montserrat" fontSize={16}>
        {t('index:team-section.content')}
      </Typography>
      <Grid
        container
        justifyContent="center"
        paddingTop={theme.spacing(3)}
        paddingBottom={theme.spacing(7)}>
        {/* TODO: fix swiper as it displays mixed names and images when they are more than 3
        // 
        <Grid item xs={12} display="flex" alignItems="center" position="relative">
          <IconButton style={{ order: 1 }} ref={navigationPrevRef} aria-label="Previouos slide">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton style={{ order: 3 }} ref={navigationNextRef} aria-label="Next slide">
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
            {data.map((member) => (
              <SwiperSlide key={member.title}>
                <MemberCard info={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid> */}
        <Grid item xs={12} textAlign="center">
          <LinkButton
            href={staticUrls.blog + '/tag/team'}
            variant="outlined"
            endIcon={<ChevronRightIcon />}>
            {t('index:team-section.meet-our-team')}
          </LinkButton>
        </Grid>
      </Grid>
    </Container>
  )
}
