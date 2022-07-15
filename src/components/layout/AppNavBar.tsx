import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu } from '@mui/icons-material'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { AppBar, Toolbar, IconButton, Grid, Hidden, ButtonBase } from '@mui/material'

import { routes } from 'common/routes'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'

import LocaleButton from './LocaleButton'
import PublicMenu from './nav/PublicMenu'
import PrivateMenu from './nav/PrivateMenu'
import MainNavMenu from './nav/MainNavMenu'
import { useSession } from 'next-auth/react'

type AppBarDeckProps = {
  navMenuToggle: () => void
}
export default function AppNavBar({ navMenuToggle }: AppBarDeckProps) {
  const { locale } = useRouter()
  const { status } = useSession()
  const shrink = useScrollTrigger()

  return (
    <AppBar
      position="fixed"
      className={clsx({ shrink })}
      sx={(theme) => ({
        overflow: 'hidden',
        transition: 'height .5s, background-color .5s ease 0s',
        height: theme.spacing(14),
        lineHeight: theme.spacing(14),
        [theme.breakpoints.down('md')]: {
          height: theme.spacing(10),
        },
        '&.shrink': {
          height: theme.spacing(10),
          lineHeight: theme.spacing(10),
          backgroundColor: 'hsla(0,0%,100%,0.85)',
          backdropFilter: 'saturate(180%) blur(5px)',
        },
        backgroundColor: theme.palette.common.white,
      })}>
      <Toolbar
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Link href={routes.index} passHref>
          <ButtonBase
            component="a"
            className={clsx({ shrink })}
            sx={(theme) => ({
              transition: 'height .5s',
              height: theme.spacing(7.5),
              minWidth: theme.spacing(15),
              marginLeft: theme.spacing(5),
              [theme.breakpoints.up('lg')]: {
                marginLeft: theme.spacing(10),
              },
              [theme.breakpoints.down('md')]: {
                marginLeft: 0,
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
            })}>
            <PodkrepiLogo locale={locale} variant="adaptive" />
          </ButtonBase>
        </Link>
        <Hidden mdDown>
          <Grid
            container
            wrap="nowrap"
            direction="row"
            justifyContent="flex-end"
            sx={(theme) => ({
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(5),
              [theme.breakpoints.up('lg')]: {
                marginRight: theme.spacing(10),
              },
            })}>
            <Grid item>
              <MainNavMenu>
                {status === 'authenticated' ? <PrivateMenu /> : <PublicMenu />}
                <Grid item>
                  <LocaleButton />
                </Grid>
              </MainNavMenu>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            size="small"
            edge="end"
            onClick={navMenuToggle}
            aria-labelledby="navigation menu">
            <Menu fontSize="large" />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}
