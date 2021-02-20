import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu } from '@material-ui/icons'
import { useSession } from 'next-auth/client'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Grid, Hidden } from '@material-ui/core'

import { routes } from 'common/routes'
import PublicMenu from './nav/PublicMenu'
import PrivateMenu from './nav/PrivateMenu'
import MainNavMenu from './nav/MainNavMenu'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      overflow: 'hidden',
      transition: 'height .5s',
      height: theme.spacing(14),
      lineHeight: theme.spacing(14),
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(10),
      },
      '&.shrink': {
        height: theme.spacing(10),
        lineHeight: theme.spacing(10),
      },
      background: theme.palette.common.white,
    },
    toolbar: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    toolboxGrid: {
      marginTop: theme.spacing(0),
      marginLeft: theme.spacing(5),
    },
    logo: {
      transition: 'height .5s',
      height: theme.spacing(7.5),
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '50%',
      },
      '&.shrink': {
        height: '50%',
      },
      '& > svg': {
        display: 'block',
        height: '100%',
      },
    },
  }),
)

type AppBarDeckProps = {
  navMenuToggle: () => void
}
export default function AppNavBar({ navMenuToggle }: AppBarDeckProps) {
  const { locale } = useRouter()
  const classes = useStyles()
  const [session] = useSession()
  const shrink = useScrollTrigger()
  return (
    <AppBar position="fixed" className={clsx(classes.appBar, { shrink })}>
      <Toolbar className={classes.toolbar}>
        <Link href={routes.index}>
          <a className={clsx(classes.logo, { shrink })}>
            <PodkrepiLogo locale={locale} variant="adaptive" className="logotype" />
          </a>
        </Link>
        <Hidden smDown>
          <Grid
            container
            spacing={1}
            wrap="nowrap"
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.toolboxGrid}>
            <Grid item>
              <MainNavMenu />
            </Grid>
            <Hidden mdDown>
              <Grid item>{session ? <PrivateMenu /> : <PublicMenu />}</Grid>
            </Hidden>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <IconButton size="small" edge="end" onClick={navMenuToggle} aria-label="navigation menu">
            <Menu fontSize="large" />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}
