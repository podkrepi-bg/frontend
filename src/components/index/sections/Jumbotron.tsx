import React, { RefObject } from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

import Typewriter from '../helpers/Typewriter'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: '730px',
      padding: theme.spacing(15, 1, 0, 1),
      marginBottom: theme.spacing(12),
      marginTop: theme.spacing(6),
      textAlign: 'center',
      backgroundImage: 'url(img/jumbotron-background-image-mobile.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      color: theme.palette.common.white,
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(14),
        paddingTop: theme.spacing(19),
        backgroundImage: 'url(img/jumbotron-background-image-desktop.jpg)',
      },
      [theme.breakpoints.up(1600)]: {
        height: '950px',
      },
    },
    title: {
      color: theme.palette.common.white,
      fontWeight: 500,
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.pxToRem(45),
      },
    },
    subTitle: {
      marginTop: theme.spacing(2),
      fontWeight: 400,
    },
    aboutProjectButton: {
      color: theme.palette.common.white,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(3),
      padding: theme.spacing(1.5, 5),
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(15),
      width: theme.spacing(27),
      margin: theme.spacing(2),
    },
    podkrepiButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(3),
      padding: theme.spacing(1.5, 5),
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(15),
      width: theme.spacing(27),
      margin: theme.spacing(2),
      '&::after': {
        content: '"❤"',
        paddingLeft: theme.spacing(0.5),
        fontSize: theme.typography.pxToRem(11),
        height: theme.spacing(2),
      },
    },
    scrollButton: {
      marginTop: theme.spacing(7),
      [theme.breakpoints.up(1600)]: {
        marginTop: theme.spacing(15),
      },
    },
    scrollButtonIcon: {
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: '50%',
      width: theme.spacing(5),
      height: theme.spacing(5),
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }),
)

type JumbotronProps = {
  scrollTo: RefObject<HTMLAnchorElement>
}
export default function Jumbotron({ scrollTo }: JumbotronProps) {
  const classes = useStyles()
  const { t } = useTranslation()

  const executeScroll = () => {
    if (scrollTo.current) {
      window.scroll({
        top: scrollTo.current.offsetTop - 150, // AppBar offset
        behavior: 'smooth',
      })
    }
  }

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Grid item>
        <Typography variant="h1" className={classes.title}>
          {t('index:title')}
          <Typography variant="h5" component="p" className={classes.subTitle}>
            {t('index:jumbotron.heading')}
          </Typography>
        </Typography>
        <Typewriter />
      </Grid>
      <Grid item>
        <LinkButton
          href={routes.aboutProject}
          variant="outlined"
          className={classes.aboutProjectButton}>
          {t('index:jumbotron.about-project-button')}
        </LinkButton>
        <LinkButton href={routes.support} variant="outlined" className={classes.podkrepiButton}>
          {t('index:jumbotron.support-us-button')}
        </LinkButton>
      </Grid>
      <Grid item className={classes.scrollButton}>
        <a onClick={executeScroll}>
          <KeyboardArrowDownIcon className={classes.scrollButtonIcon} />
        </a>
      </Grid>
    </Grid>
  )
}
