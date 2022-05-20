import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Theme, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'

import Typewriter from '../helpers/Typewriter'
import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'
import { routes } from 'common/routes'

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
        padding: {
          xs: theme.spacing(9, 1, 0, 1),
          xl: theme.spacing(12, 1, 0, 1),
        },
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
        objectPosition="70% 50%"
        style={{ zIndex: -1 }}
      />
      <Container maxWidth="lg">
        <Grid item textAlign="left" sx={{ xs: { mb: 4 }, mb: 8 }}>
          <Typography
            maxWidth="lg"
            component={'h1'}
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: 500,
              mb: 4,
              fontSize: `${theme.typography.pxToRem(75)}`,
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
            {t('index:podkrepi')} -
            <br />
            {t('index:title')}
            {/* <Typewriter /> */}
            <Typography maxWidth="md" variant="h5" component="p" sx={{ mt: 2, fontWeight: 400 }}>
              {t('index:jumbotron.heading')}
            </Typography>
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              flexWrap: 'wrap',
            }}>
            <LinkButton
              sx={{ minWidth: 320, marginRight: theme.spacing(4), marginBottom: theme.spacing(3) }}
              size="large"
              variant="outlined"
              color="primary"
              href={routes.support}>
              {t('common:nav.about.support-us')}
            </LinkButton>
            <LinkButton
              sx={{ minWidth: 320, marginBottom: theme.spacing(3) }}
              size="large"
              variant="contained"
              color="secondary"
              href={routes.campaigns.index}>
              {t('index:jumbotron.support-a-cause')}
            </LinkButton>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
