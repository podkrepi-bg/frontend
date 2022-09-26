import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { SwipeableDrawer, Hidden, Box, Grid, Button } from '@mui/material'

import { isAdmin } from 'common/util/roles'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import CloseModalButton from 'components/common/CloseModalButton'

import LocaleButton from '../LocaleButton'
import DonationMenuMobile from './DonationMenuMobile'
import { useSession } from 'next-auth/react'
import ProjectMenuMobile from './ProjectMenuMobile'

const PREFIX = 'AuthLinks'

const classes = {
  navMenuDrawer: `${PREFIX}-navMenuDrawer`,
  navMenuPaper: `${PREFIX}-navMenuPaper`,
  accordion: `${PREFIX}-accordion`,
}

const Root = styled('nav')(({ theme }) => ({
  [`&.${classes.navMenuDrawer}`]: {
    flexShrink: 0,
  },

  [`& .${classes.navMenuPaper}`]: {
    width: parseFloat(theme.spacing(10)) * 4,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexShrink: 0,
    },
  },
}))

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthLinks = () => {
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  if (session) {
    return (
      <>
        <Grid item>
          <LinkButton fullWidth variant="outlined" href={routes.profile.index}>
            {t('nav.profile')}
          </LinkButton>
        </Grid>
        {status === 'authenticated' && isAdmin(session) && (
          <Grid item>
            <Button fullWidth variant="outlined" href={routes.admin.index}>
              {t('nav.admin.index')}
            </Button>
          </Grid>
        )}
        <Grid item>
          <LinkButton fullWidth variant="outlined" href={routes.logout}>
            {t('nav.logout')}
          </LinkButton>
        </Grid>
      </>
    )
  }
  return (
    <>
      <Grid item style={{ display: 'flex', borderTop: '2px solid lightgrey' }}>
        <LinkButton href={routes.login} style={{ color: '#000000', marginLeft: '2px' }}>
          {t('nav.login')}
        </LinkButton>
        /
        <LinkButton href={routes.register} style={{ color: '#000000' }}>
          {t('nav.register')}
        </LinkButton>
      </Grid>
    </>
  )
}

export default function MobileNav({ mobileOpen, setMobileOpen }: NavDeckProps) {
  const router = useRouter()
  const closeNavMenu = () => setMobileOpen(false)

  // Register route change event handlers
  useEffect(() => {
    router.events.on('routeChangeStart', closeNavMenu)

    return () => {
      router.events.off('routeChangeStart', closeNavMenu)
    }
  }, [])

  return (
    <Root className={classes.navMenuDrawer}>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          anchor="right"
          open={mobileOpen}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          onOpen={() => setMobileOpen(true)}
          onClose={closeNavMenu}
          classes={{ paper: classes.navMenuPaper }}>
          <CloseModalButton
            edge="end"
            fontSize="inherit"
            onClose={closeNavMenu}
            style={{ marginRight: '10px' }}
          />
          <Box display="flex" justifyContent="center" px={2}>
            <Grid container direction="column">
              <Grid item>
                <Box width="100%" textAlign="center">
                  <PodkrepiIcon style={{ margin: '23px 0 12px 0' }} />
                </Box>
              </Grid>
              <Grid item>
                <DonationMenuMobile />
              </Grid>
              <Grid item>
                <ProjectMenuMobile />
              </Grid>
              <AuthLinks />
              <Box
                style={{
                  borderTop: '2px solid lightgrey',
                }}>
                <LocaleButton />
              </Box>
            </Grid>
          </Box>
        </SwipeableDrawer>
      </Hidden>
    </Root>
  )
}
