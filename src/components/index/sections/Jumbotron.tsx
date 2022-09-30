import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Theme, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import theme from 'common/theme'

export default function Jumbotron() {
  const { t } = useTranslation()
  //Check if the media query is match and breakpoint is up sm device
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'))
  const imgSource = matches ? '/img/family.jpg' : '/img/family-mobile.png'

  return (
    <Grid
      container
      direction="column"
      component="section"
      sx={(theme) => ({
        height: {
          lg: '554px',
          md: '535px',
        },
        padding: {
          xs: theme.spacing(5, 1, 0, 1),
          lg: theme.spacing(11, 1, 0, 1),
        },
        mb: {
          xs: 5,
          lg: 10,
        },
        mt: {
          xs: 3,
          md: 5,
          lg: 7,
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
        alt="Podkrepi.bg banner"
        layout="fill"
        objectFit="cover"
        objectPosition="75%"
        style={{ zIndex: -1 }}
      />
      <Container maxWidth="xl">
        <Grid item textAlign="left" sx={{ xs: { mb: 4 }, mb: 8 }}>
          <Typography
            component={'h1'}
            sx={(theme) => ({
              color: theme.palette.common.white,
              fontWeight: 500,
              mb: 4,
              fontSize: theme.typography.pxToRem(30),
              [theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(48),
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
                  xs: 200,
                  sm: 320,
                },
                fontWeight: 600,
                fontSize: {
                  xs: 14,
                  sm: 22,
                },
                borderRadius: theme.borders.round,
                backgroundColor: '#4AC3FF',
                '&:hover': {
                  backgroundColor: '#32A9FE',
                },
              }}
              size="large"
              variant="contained"
              href={routes.campaigns.index}>
              {t('common:nav.donatе')}
            </LinkButton>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
