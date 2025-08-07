import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu } from '@mui/icons-material'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { AppBar, Toolbar, IconButton, Grid2, ButtonBase, Theme } from '@mui/material'

import { routes } from 'common/routes'
import PodkrepiLogo from 'components/common/brand/PodkrepiLogo'

import LocaleButton from './LocaleButton'
import PublicMenu from './nav/PublicMenu'
import PrivateMenu from './nav/PrivateMenu'
import MainNavMenu from './nav/MainNavMenu'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

type AppBarDeckProps = {
  navMenuToggle: () => void
}
export default function AppNavBar({ navMenuToggle }: AppBarDeckProps) {
  const { locale } = useRouter()
  const { status } = useSession()
  const shrink = useScrollTrigger()
  const { t } = useTranslation()

  return (
    <AppBar
      position="fixed"
      className={clsx({ shrink })}
      sx={(theme) => ({
        overflow: 'hidden',
        transition: 'height .5s, background-color .5s ease 0s',
        height: theme.spacing(11),
        [theme.breakpoints.down('sm')]: {
          height: theme.spacing(8),
        },
        '&.shrink': {
          height: theme.spacing(8),
          lineHeight: theme.spacing(8),
          backgroundColor: 'hsla(0,0%,100%,0.85)',
          backdropFilter: 'saturate(180%) blur(5px)',

          [theme.breakpoints.down('sm')]: {
            height: theme.spacing(7),
          },
        },
        backgroundColor: theme.palette.common.white,
      })}>
      <Toolbar
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: 0,
        }}>
        <Link href={routes.index} passHref>
          <ButtonBase
            className={clsx({ shrink })}
            aria-label={t('meta.title')}
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
                height: theme.spacing(5),
              },
              '& > svg': {
                display: 'block',
                height: '100%',
              },
            })}>
            <PodkrepiLogo locale={locale} variant="adaptive" />
          </ButtonBase>
        </Link>
        <Grid2
          container
          wrap="nowrap"
          direction="row"
          justifyContent="flex-end"
          sx={(theme: Theme) => ({
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(5),
            [theme.breakpoints.up('lg')]: {
              marginRight: theme.spacing(10),
            },
            display: { md: 'flex', xs: 'none' },
          })}>
          <Grid2>
            <MainNavMenu>
              {status === 'authenticated' ? <PrivateMenu /> : <PublicMenu />}
              <Grid2>
                <LocaleButton />
              </Grid2>
            </MainNavMenu>
          </Grid2>
        </Grid2>
        <Grid2 sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="small"
            edge="end"
            onClick={navMenuToggle}
            aria-labelledby="navigation menu">
            <Menu fontSize="large" />
          </IconButton>
        </Grid2>
      </Toolbar>
    </AppBar>
  )
}
