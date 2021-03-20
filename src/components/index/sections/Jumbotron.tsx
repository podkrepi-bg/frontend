import React, { RefObject } from 'react'

import { useTranslation } from 'react-i18next'

import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import Typewriter from '../helpers/Typewriter'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      position: 'relative',
      height: '730px',
      padding: theme.spacing(15, 1, 0, 1),
      marginBottom: theme.spacing(12),
      textAlign: 'center',
      backgroundImage: 'url(img/header-image.png)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      color: theme.palette.common.white,
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(31),
      },
      [theme.breakpoints.up(1600)]: {
        height: '950px',
      },
    },
    title: {
      color: theme.palette.common.white,
      textShadow: '0px 2px 3px #000',
      fontWeight: 600,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.pxToRem(45),
      },
    },
    subTitle: {
      marginTop: theme.spacing(3),
      textShadow: '0px 2px 2px #000',
      fontWeight: 600,
    },
    podkrepiButton: {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      padding: theme.spacing(1.5, 5),
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(15),
    },
    scrollButton: {
      marginTop: theme.spacing(8),
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
  scrollElement: RefObject<HTMLAnchorElement>
}
export default function Jumbotron({ scrollElement }: JumbotronProps) {
  const classes = useStyles()
  const { t } = useTranslation()

  const executeScroll = () => {
    if (scrollElement.current) {
      window.scroll({
        top: scrollElement.current.offsetTop - 150, // AppBar offset
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
