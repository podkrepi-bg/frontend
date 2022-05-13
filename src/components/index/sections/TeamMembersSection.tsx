import React from 'react'
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
  spaceBetween: 30,
}

export default function TeamMembersSection() {
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
        {'Кой стои зад Подкрепи.бг?'}
      </Heading>
      <Typography textAlign="center" fontFamily="Montserrat" fontSize={16}>
        Подкрепи.бг представлява общност от специалисти в областта на програмирането, правото,
        маркетинга, дизайна, медицината, финансите, социалното предприемачество и др. Обединени сме
        от целта да създадем устойчива и прозрачна платформа за дарения, която подкрепя каузи и хора
        в нужда, като заедно с това популяризира и връща доверието към дарителството в България.
      </Typography>
      <Grid
        container
        justifyContent="center"
        paddingTop={theme.spacing(7)}
        paddingBottom={theme.spacing(12)}>
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
        </Grid>
        <Grid item xs={12} textAlign="center">
          <LinkButton
            href={staticUrls.blog}
            variant="outlined"
            endIcon={<ChevronRightIcon />}
            sx={{ marginTop: theme.spacing(8) }}>
            {'Запознай се с екипа ни'}
          </LinkButton>
        </Grid>
      </Grid>
    </Container>
  )
}
