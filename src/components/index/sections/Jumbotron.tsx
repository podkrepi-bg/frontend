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

    textWrapper: {
      textAlign: 'left',

      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(11),
      },
    },

    heading: {
      color: theme.palette.common.white,
      fontWeight: 500,
      marginBottom: theme.spacing(4),
      fontSize: theme.typography.pxToRem(30),
      maxWidth: theme.spacing(56),

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(32),
      },

      [theme.breakpoints.up('lg')]: {
        fontSize: theme.typography.pxToRem(42),
        maxWidth: theme.spacing(73),
      },
    },

    donateButton: {
      minWidth: theme.spacing(25),
      fontWeight: 600,
      borderRadius: theme.borders.round,
      backgroundColor: '#4AC3FF',

      '&:hover': {
        backgroundColor: '#32A9FE',
      },

      [theme.breakpoints.up('md')]: {
        minWidth: theme.spacing(40),
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
        <Grid item className={classes.textWrapper}>
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
