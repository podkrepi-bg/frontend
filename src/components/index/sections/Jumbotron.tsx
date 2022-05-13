import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Theme, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'

import Typewriter from '../helpers/Typewriter'

export default function Jumbotron() {
  const { t } = useTranslation()
  //Check if the media query is match and breakpoint is up sm device
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'))
  const imgSource = matches ? '/img/family.jpg' : '/img/family.jpg'
  return (
    <Grid
      container
      direction="column"
      component="section"
      sx={(theme) => ({
        height: '730px',
        background:
          'linear-gradient(99deg, rgba(0,0,0,0.7707457983193278) 0%, rgba(27,54,75,0) 100%)',
        xs: {
          padding: theme.spacing(9, 1, 0, 1),
        },
        padding: theme.spacing(15, 1, 0, 1),
        mb: 12,
        mt: 10,
        textAlign: 'center',
        color: theme.palette.common.white,
        position: 'relative',
        lg: {
          height: '950px',
        },
      })}>
      <Image
        priority
        src={imgSource}
        alt="Podkrepi.bg jumbotron heading"
        layout="fill"
        objectFit="cover"
        style={{ zIndex: -1 }}
      />
      <Container maxWidth="xl">
        <Grid item textAlign="left" sx={{ xs: { mb: 4 }, mb: 8 }}>
          <Typography
            variant="h1"
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: 500,
              mb: 4,
              [theme.breakpoints.down('lg')]: {
                fontSize: theme.typography.pxToRem(65),
              },
              [theme.breakpoints.down('md')]: {
                fontSize: theme.typography.pxToRem(55),
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(45),
              },
              [theme.breakpoints.only('xs')]: {
                fontSize: theme.typography.pxToRem(35),
              },
            })}>
            {t('index:title')}
            <Typography variant="h5" component="p" sx={{ mt: 2, fontWeight: 400 }}>
              {t('index:jumbotron.heading')}
            </Typography>
          </Typography>
          <Typewriter />
        </Grid>
      </Container>
    </Grid>
  )
}
