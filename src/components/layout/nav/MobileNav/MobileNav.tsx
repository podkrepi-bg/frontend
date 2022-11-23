import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SwipeableDrawer, Hidden, Box, Grid, Theme } from '@mui/material'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import CloseModalButton from 'components/common/CloseModalButton'
import LocaleButton from '../../LocaleButton'
import DonationMenuMobile from '../DonationMenuMobile'
import ProjectMenuMobile from '../ProjectMenuMobile'
import { createStyles, makeStyles } from '@mui/styles'
import { AuthLinks } from '../AuthLinks'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  CloseButton,
  DonateButtonWrapper,
  StyledLocaleButton,
  StyledPodkrepiIcon,
} from './MobileNav.styled'
import theme from 'common/theme'

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        <CloseButton edge="end" fontSize="inherit" onClose={closeNavMenu} />
        <Grid display="flex" justifyContent="center" px={2}>
          <Grid container direction="column">
            <Grid item textAlign="center">
              <StyledPodkrepiIcon />
            </Grid>
            <Grid item>
              <DonationMenuMobile />
            </Grid>
            <Grid item>
              <ProjectMenuMobile />
            </Grid>
            <AuthLinks />
            <StyledLocaleButton>
              <LocaleButton />
            </StyledLocaleButton>
            <Grid textAlign="center" py={2}>
              <LinkButton
                size="large"
                variant="outlined"
                color="primary"
                href={routes.campaigns.index}
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
