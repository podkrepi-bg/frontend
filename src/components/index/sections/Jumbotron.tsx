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
      marginTop: theme.spacing(10),
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
    scrollButton: {
      marginTop: theme.spacing(7),
      zIndex: 10,
      [theme.breakpoints.up(1600)]: {
        marginTop: theme.spacing(20),
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
        priority
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
