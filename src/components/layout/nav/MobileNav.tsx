import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SwipeableDrawer, Hidden, Box, Grid, Theme } from '@mui/material'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import CloseModalButton from 'components/common/CloseModalButton'
import LocaleButton from '../LocaleButton'
import DonationMenuMobile from './DonationMenuMobile'
import ProjectMenuMobile from './ProjectMenuMobile'
import { createStyles, makeStyles } from '@mui/styles'
import { AuthLinks } from './AuthLinks'

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    localeButton: {
      borderTop: '2px solid lightgrey',

      '& button': {
        justifyContent: 'start',
        marginLeft: theme.spacing(1.3),
        fontSize: theme.spacing(1.75),
      },
    },
    closeModalButton: {
      marginRight: '10px',
    },
    podkrepiLogoIcon: {
      margin: '23px 0 12px 0',
    },
  }),
)

export default function MobileNav({ mobileOpen, setMobileOpen }: NavDeckProps) {
  const router = useRouter()
  const closeNavMenu = () => setMobileOpen(false)
  const classes = useStyles()

  // Register route change event handlers
  useEffect(() => {
    router.events.on('routeChangeStart', closeNavMenu)

    return () => {
      router.events.off('routeChangeStart', closeNavMenu)
    }
  }, [])

  return (
    <Hidden mdUp implementation="css">
      <SwipeableDrawer
        anchor="right"
        open={mobileOpen}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        onOpen={() => setMobileOpen(true)}
        onClose={closeNavMenu}>
        <CloseModalButton
          edge="end"
          fontSize="inherit"
          onClose={closeNavMenu}
          className={classes.closeModalButton}
        />
        <Box display="flex" justifyContent="center" px={2}>
          <Grid container direction="column">
            <Grid item>
              <Box width="100%" textAlign="center">
                <PodkrepiIcon className={classes.podkrepiLogoIcon} />
              </Box>
            </Grid>
            <Grid item>
              <DonationMenuMobile />
            </Grid>
            <Grid item>
              <ProjectMenuMobile />
            </Grid>
            <AuthLinks />
            <Box className={classes.localeButton}>
              <LocaleButton />
            </Box>
          </Grid>
        </Box>
      </SwipeableDrawer>
    </Hidden>
  )
}
