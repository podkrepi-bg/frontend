import React from 'react'

import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import theme from 'common/theme'

import { Container, Grid, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    jumbotronWrapper: {
      height: theme.spacing(49.375),
      padding: theme.spacing(6.25, 1),
      margin: theme.spacing(4, 0, 10, 0),
      backgroundPosition: '76%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

      [theme.breakpoints.up('sm')]: {
        backgroundPosition: '75%',
      },

      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(7),
      },
    },

    heading: {
      color: theme.palette.common.white,
      fontWeight: 500,
      marginBottom: theme.spacing(4),
      fontSize: theme.typography.pxToRem(30),
      maxWidth: '320px',

      [theme.breakpoints.up('lg')]: {
        fontSize: theme.typography.pxToRem(60),
        maxWidth: '55%',
      },
    },

    donateButton: {
      minWidth: '200px',
      fontWeight: 600,
      borderRadius: theme.borders.round,
      backgroundColor: '#4AC3FF',

      '&:hover': {
        backgroundColor: '#32A9FE',
      },

      [theme.breakpoints.up('md')]: {
        minWidth: '320px',
      },

      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(22),
      },
    },
  }),
)

export default function Jumbotron() {
  const { t } = useTranslation()
  const classes = useStyles()

  const bannerSource = '/img/family.jpg'

  return (
    <Grid
      container
      direction="column"
      component="section"
      className={classes.jumbotronWrapper}
      style={{ backgroundImage: `url(${bannerSource})` }}>
      <Container maxWidth="xl">
        <Grid item textAlign="left">
          <Typography component={'h1'} className={classes.heading}>
            {t('index:podkrepi')} -
            <br />
            {t('index:title')}
          </Typography>
          <LinkButton
            className={classes.donateButton}
            size="large"
            variant="contained"
            href={routes.campaigns.index}>
            {t('common:nav.donatе')}
          </LinkButton>
        </Grid>
      </Container>
    </Grid>
  )
}
