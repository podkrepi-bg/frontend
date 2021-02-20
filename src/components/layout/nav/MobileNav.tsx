import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/client'
import { SwipeableDrawer, Hidden, Box, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { routes } from 'common/routes'
import Link from 'components/common/Link'
import CloseModalButton from 'components/common/CloseModalButton'

import PrivateMenu from './PrivateMenu'
import PublicMenu from './PublicMenu'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '&&': {
        // Mobile drawer should be above drawer.zIndex and under modal.zIndex
        zIndex: `${theme.zIndex.drawer + 50} !important`,
      },
    },
    navMenuDrawer: {
      flexShrink: 0,
    },
    navMenuPaper: {
      width: theme.spacing(10) * 3,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        flexShrink: 0,
      },
    },
    searchIcon: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
  }),
)

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileNav({ mobileOpen, setMobileOpen }: NavDeckProps) {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation()
  const [session] = useSession()
  const closeNavMenu = () => setMobileOpen(false)

  // Register route change event handlers
  useEffect(() => {
    router.events.on('routeChangeStart', closeNavMenu)

    return () => {
      router.events.off('routeChangeStart', closeNavMenu)
    }
  }, [])

  return (
    <nav className={classes.navMenuDrawer}>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          anchor="right"
          open={mobileOpen}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          onOpen={() => setMobileOpen(true)}
          onClose={closeNavMenu}
          classes={{ root: classes.root, paper: classes.navMenuPaper }}>
          <CloseModalButton edge="end" fontSize="default" onClose={closeNavMenu} />
          <Box height="100%" display="flex" justifyContent="center" mt={10} px={2}>
            <Grid container justify="center" direction="column" spacing={2}>
              {session ? (
                <>
                  <Grid item>
                    <LinkButton fullWidth variant="outlined" href={routes.profile}>
                      {t('nav.profile')}
                    </LinkButton>
                  </Grid>
                  <Grid item>
                    <LinkButton fullWidth variant="outlined" href={routes.logout}>
                      {t('nav.logout')}
                    </LinkButton>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item>
                    <LinkButton fullWidth variant="outlined" href={routes.login}>
                      {t('nav.login')}
                    </LinkButton>
                  </Grid>
                  <Grid item>
                    <LinkButton fullWidth variant="outlined" href={routes.register}>
                      {t('nav.register')}
                    </LinkButton>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </SwipeableDrawer>
      </Hidden>
    </nav>
  )
}
