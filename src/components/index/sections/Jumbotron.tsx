import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Theme, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
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
        height: {
          xl: '623px',
          lg: '632px',
          md: '535px',
        },
        background:
          'linear-gradient(99deg, rgba(0,0,0,0.7707457983193278) 0%, rgba(27,54,75,0) 100%)',
        padding: {
          xs: theme.spacing(5, 1, 0, 1),
          lg: theme.spacing(7, 1, 0, 1),
          xl: theme.spacing(8, 1, 0, 1),
        },
        mb: {
          xs: 5,
          lg: 7,
          xl: 5,
        },
        mt: {
          xs: 3,
          md: 5,
          lg: 7,
          xl: 9,
        },
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
        objectPosition="70% 12%"
        style={{ zIndex: -1 }}
      />
      <Container maxWidth="lg">
        <Grid item textAlign="left" sx={{ xs: { mb: 4 }, mb: 8 }}>
          <Typography
            component={'h1'}
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: 500,
              mb: 3,
              fontSize: theme.typography.pxToRem(30),
              [theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(50),
              },
              [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(60),
                maxWidth: 'md',
              },
            })}>
            {t('index:podkrepi')} -
            <br />
            {t('index:title')}
          </Typography>
          <Typography
            maxWidth="md"
            variant="h5"
            component="p"
            sx={{
              mt: 2,
              mb: 4,
              fontWeight: 400,
              [theme.breakpoints.down('md')]: {
                fontSize: '1rem',
              },
              [theme.breakpoints.up('lg')]: {
                maxWidth: '65%',
              },
            }}>
            {t('index:jumbotron.heading')}
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              flexWrap: 'wrap',
              gap: {
                xs: '12px',
                md: '50px',
              },
            }}>
            <LinkButton
              sx={{
                minWidth: {
                  xs: 270,
                  md: 320,
                },
              }}
              size="large"
              variant="contained"
              color="secondary"
              href={routes.campaigns.index}>
              {t('index:jumbotron.donate')}
            </LinkButton>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
