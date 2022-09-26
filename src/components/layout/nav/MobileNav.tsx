import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SwipeableDrawer, Hidden, Box, Grid, Theme } from '@mui/material'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import CloseModalButton from 'components/common/CloseModalButton'
import LocaleButton from '../LocaleButton'
import DonationMenuMobile from './DonationMenuMobile'
import ProjectMenuMobile from './ProjectMenuMobile'
import { createStyles, makeStyles } from '@mui/styles'
import { AuthLinks } from './AuthLinks'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import FavoriteIcon from '@mui/icons-material/Favorite'

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    localeButton: {
      borderTop: '2px solid lightgrey',
      display: 'flex',
      minHeight: theme.spacing(8),

      '& button': {
        justifyContent: 'start',
        marginLeft: theme.spacing(1.3),
        fontSize: theme.spacing(1.75),
      },
    },
    closeModalButton: {
      marginRight: theme.spacing(1.25),
    },
    podkrepiLogoIcon: {
      margin: '23px 0 12px 0',
    },
    donateButtonWrapper: {
      borderTop: '2px solid lightgrey',
      textAlign: 'center',
      minHeight: theme.spacing(8),
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(3),
    },
    donateButton: {
      padding: theme.spacing(1, 6),
    },
    donateIcon: {
      fontSize: '14px',
    },
  }),
)

export default function MobileNav({ mobileOpen, setMobileOpen }: NavDeckProps) {
  const router = useRouter()
  const closeNavMenu = () => setMobileOpen(false)
  const classes = useStyles()
  const { t } = useTranslation()

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
        <Grid display="flex" justifyContent="center" px={2}>
          <Grid container direction="column">
            <Grid item>
              <Grid width="100%" textAlign="center">
                <PodkrepiIcon className={classes.podkrepiLogoIcon} />
              </Grid>
            </Grid>
            <Grid item>
              <DonationMenuMobile />
            </Grid>
            <Grid item>
              <ProjectMenuMobile />
            </Grid>
            <AuthLinks />
            <Grid item className={classes.localeButton}>
              <LocaleButton />
            </Grid>
            <Grid item className={classes.donateButtonWrapper}>
              <LinkButton
                size="large"
                variant="outlined"
                color="primary"
                href={routes.campaigns.index}
                className={classes.donateButton}
                endIcon={<FavoriteIcon color="primary" className={classes.donateIcon} />}>
                {t('nav.donatе')}
              </LinkButton>
            </Grid>
          </Grid>
        </Grid>
      </SwipeableDrawer>
    </Hidden>
  )
}
