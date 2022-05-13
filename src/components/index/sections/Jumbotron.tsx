import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Typography } from '@mui/material'
import { darken, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      background:
        'linear-gradient(99deg, rgba(0,0,0,0.7707457983193278) 0%, rgba(27,54,75,0) 100%)',
      height: '730px',
      padding: theme.spacing(15, 1, 0, 1),
      marginBottom: theme.spacing(12),
      marginTop: theme.spacing(10),
      textAlign: 'center',
      color: theme.palette.common.white,
      position: 'relative',
      [theme.breakpoints.up('lg')]: {
        height: '950px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(9, 1, 0, 1),
      },
    },
    image: {
      zIndex: -1,
    },
    title: {
      color: theme.palette.common.white,
      fontWeight: 500,
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
    },
    subTitle: {
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
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const imgSource = matches ? '/img/family.jpg' : '/img/family.jpg'
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Image
        src={imgSource}
        alt="Podkrepi.bg jumbotron heading"
        layout="fill"
        objectFit="cover"
        objectPosition={'70% 50%'}
        className={classes.image}
        priority
      />
      <Container maxWidth="xl">
        <Grid item textAlign="left" marginBottom={downMd ? theme.spacing(4) : theme.spacing(8)}>
          <Typography variant="h1" className={classes.title}>
            {t('index:podkrepi')} {downMd ? '' : '-'}
          </Typography>
          <Typography
            variant="h1"
            component="h2"
            className={classes.title}
            sx={{ marginBottom: downMd ? theme.spacing(4) : theme.spacing(8) }}>
            {t('index:title')}
          </Typography>
          <Typography
            maxWidth="770px"
            variant="h5"
            component="p"
            className={classes.subTitle}
            marginBottom={downMd ? theme.spacing(4) : theme.spacing(8)}>
            {t('index:jumbotron.heading')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          flexWrap={downMd ? 'wrap' : 'nowrap'}
          justifyContent="start">
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
      </Container>
    </Grid>
  )
}
