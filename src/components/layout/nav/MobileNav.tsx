import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { SwipeableDrawer, Hidden, Box, Grid, Divider } from '@material-ui/core'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import CloseModalButton from 'components/common/CloseModalButton'

import { navItems } from './MainNavMenu'

const useStyles = makeStyles((theme) =>
  createStyles({
    navMenuDrawer: {
      flexShrink: 0,
    },
    navMenuPaper: {
      width: theme.spacing(10) * 4,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        flexShrink: 0,
      },
    },
    icon: {
      fontSize: theme.spacing(10),
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
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
          classes={{ paper: classes.navMenuPaper }}>
          <CloseModalButton edge="end" fontSize="default" onClose={closeNavMenu} />
          <Box display="flex" justifyContent="center" px={2}>
            <Grid container justify="center" direction="column" spacing={2}>
              <Grid item>
                <Box width="100%" textAlign="center">
                  <PodkrepiIcon className={classes.icon} />
                </Box>
              </Grid>
              {navItems.map(({ href, label }, key) => (
                <Grid item key={key}>
                  <LinkButton fullWidth variant="outlined" href={href}>
                    {t(label)}
                  </LinkButton>
                </Grid>
              ))}
              <Box my={4}>
                <Divider />
              </Box>
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
