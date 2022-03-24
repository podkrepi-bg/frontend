import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import { darken, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'

import Typewriter from '../helpers/Typewriter'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: '730px',
      padding: theme.spacing(15, 1, 0, 1),
      marginBottom: theme.spacing(12),
      marginTop: theme.spacing(6),
      textAlign: 'center',
      color: theme.palette.common.white,
      position: 'relative',
      [theme.breakpoints.up(1600)]: {
        height: '950px',
      },
    },
    image: {
      zIndex: -1,
    },
    title: {
      color: theme.palette.common.white,
      fontWeight: 500,
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(45),
      },
    },
    subTitle: {
      marginTop: theme.spacing(2),
      fontWeight: 400,
    },
    aboutProjectButton: {
      color: darken(theme.palette.secondary.main, 0.8),
      border: `none`,
      borderRadius: '500px',
      padding: theme.spacing(1.5, 4),
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(15),
      minWidth: theme.spacing(27),
      height: theme.spacing(7),
      margin: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(3),
      },
    },
    podkrepiButton: {
      border: `none`,
      borderRadius: '500px',
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(15),
      minWidth: theme.spacing(27),
      height: theme.spacing(7),
      margin: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(3),
      },
    },
    scrollButton: {
      marginTop: theme.spacing(7),
      zIndex: 10,
      [theme.breakpoints.up(1600)]: {
        marginTop: theme.spacing(20),
      },
    },
    scrollButtonIcon: {
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: '50%',
      width: theme.spacing(5),
      height: theme.spacing(5),
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.secondary.main,
      },
    },
  }),
)

export default function Jumbotron() {
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  //Check if the media query is match and breakpoint is up sm device
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const imgSource = matches ? '/img/happy-family.jpg' : '/img/happy-family.jpg'
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Image
        src={imgSource}
        alt="Podkrepi.bg jumbotron heading"
        layout="fill"
        objectFit="cover"
        className={classes.image}
      />
      <Grid item>
        <Typography variant="h1" className={classes.title}>
          {t('index:title')}
          <Typography variant="h5" component="p" className={classes.subTitle}>
            {t('index:jumbotron.heading')}
          </Typography>
        </Typography>
        <Typewriter />
      </Grid>
    </Grid>
  )
}
