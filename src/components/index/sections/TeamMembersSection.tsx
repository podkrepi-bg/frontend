import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Grid, Typography, Container } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import Heading from 'components/common/Heading'
import LinkButton from 'components/common/LinkButton'

import 'swiper/css'
import 'swiper/css/a11y'

export default function TeamMembersSection() {
  const { t } = useTranslation()
  const teamImagePath = '/img/team-photos/team-image.png'

  return (
    <Container
      component="section"
      maxWidth="lg"
      sx={{
        padding: theme.spacing(0, 3),
        marginTop: theme.spacing(8),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(12),
        },
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(0),
        },
      }}>
      <Heading
        textAlign="center"
        variant="h4"
        component="h2"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}
        marginBottom={theme.spacing(6)}
        fontWeight="500">
        {t('index:team-section.heading')}
      </Heading>
      <Typography
        textAlign="center"
        fontFamily="Montserrat"
        style={{ paddingBottom: theme.spacing(6), fontSize: 16 }}>
        {t('index:team-section.content')}
      </Typography>
      <Image alt="Team image" src={teamImagePath} width="1095px" height="150px" />
      <Grid item xs={12} textAlign="center">
        <LinkButton
          href={routes.about}
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          sx={{
            marginTop: theme.spacing(6),
            fontWeight: 'bold',
            color: theme.palette.common.black,
            minWidth: { sm: theme.spacing(35) },
          }}>
          {t('index:team-section.meet-our-team')}
        </LinkButton>
      </Grid>
    </Container>
  )
}
