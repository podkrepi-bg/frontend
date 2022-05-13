import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Theme, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'

import Typewriter from '../helpers/Typewriter'

export default function Jumbotron() {
  const { t } = useTranslation()
  //Check if the media query is match and breakpoint is up sm device
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'))
  const imgSource = matches ? '/img/happy-family.jpg' : '/img/happy-family.jpg'
  return (
    <Grid
      container
      direction="column"
      component="section"
      sx={(theme) => ({
        height: '730px',
        padding: theme.spacing(15, 1, 0, 1),
        mb: 12,
        mt: 10,
        textAlign: 'center',
        color: theme.palette.common.white,
        position: 'relative',
        [theme.breakpoints.up(1600)]: {
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
      <Grid item>
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.common.white,
            fontWeight: 500,
            mb: 4,
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.typography.pxToRem(45),
            },
          })}>
          {t('index:title')}
          <Typography variant="h5" component="p" sx={{ mt: 2, fontWeight: 400 }}>
            {t('index:jumbotron.heading')}
          </Typography>
        </Typography>
        <Typewriter />
      </Grid>
    </Grid>
  )
}
