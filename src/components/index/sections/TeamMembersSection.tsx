import React from 'react'
import { useTranslation } from 'next-i18next'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Container, Grid, Typography } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import Heading from 'components/common/Heading'
import LinkButton from 'components/common/LinkButton'

import 'swiper/css'
import 'swiper/css/a11y'
export default function TeamMembersSection() {
  const { t } = useTranslation()

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
        <Grid item xs={12} textAlign="center">
          <LinkButton href={routes.about} variant="outlined" endIcon={<ChevronRightIcon />}>
            {t('index:team-section.meet-our-team')}
          </LinkButton>
        </Grid>
      </Grid>
    </Container>
  )
}
