import React from 'react'

import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import theme from 'common/theme'

import { Container, Grid, Typography } from '@mui/material'

export default function Jumbotron() {
  const { t } = useTranslation()

  const bannerSource = '/img/family.jpg'

  return (
    <Grid
      container
      direction="column"
      component="section"
      sx={{
        backgroundImage: `url(${bannerSource})`,
        height: theme.spacing(49.375),
        padding: theme.spacing(6.25, 1),
        margin: { xs: theme.spacing(4, 0, 8, 0), sx: theme.spacing(4, 0, 12, 0) },
        backgroundPosition: '75%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        marginTop: { md: theme.spacing(7) },
      }}>
      <Container maxWidth="xl">
        <Grid
          item
          sx={{
            textAlign: 'left',
            paddingLeft: { md: theme.spacing(11) },
          }}>
          <Typography
            component={'h1'}
            sx={{
              color: theme.palette.common.white,
              fontWeight: 500,
              marginBottom: theme.spacing(4),
              fontSize: {
                xs: theme.typography.pxToRem(30),
                md: theme.typography.pxToRem(32),
                lg: theme.typography.pxToRem(42),
              },
              maxWidth: { xs: theme.spacing(56), lg: theme.spacing(73) },
            }}>
            {t('index:podkrepi')} -
            <br />
            {t('index:title')}
          </Typography>
          <LinkButton
            size="large"
            variant="contained"
            href={routes.campaigns.index}
            sx={{
              minWidth: { xs: theme.spacing(25), md: theme.spacing(40) },
              fontWeight: 600,
              borderRadius: theme.borders.round,
              backgroundColor: '#4AC3FF',
              fontSize: { sm: theme.typography.pxToRem(22) },

              '&:hover': {
                backgroundColor: '#32A9FE',
              },
            }}>
            {t('common:nav.donatе')}
          </LinkButton>
        </Grid>
      </Container>
    </Grid>
  )
}
