import React, { useEffect } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { SwipeableDrawer, Hidden, Grid, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

import LocaleButton from '../../LocaleButton'
import DonationMenuMobile from '../DonationMenuMobile'
import ProjectMenuMobile from '../ProjectMenuMobile'
import { AuthLinks } from '../AuthLinks/AuthLinks'
import { routes } from 'common/routes'

import {
  CloseButton,
  NavMenuWrapper,
  LocaleButtonWrapper,
  StyledPodkrepiIcon,
  DonateButton,
} from './MobileNav.styled'
import ReportButton from 'components/layout/ReportButton'

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileNav({ mobileOpen, setMobileOpen }: NavDeckProps) {
  const { t } = useTranslation()

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
    <Hidden mdUp implementation="css">
      <SwipeableDrawer
        anchor="right"
        open={mobileOpen}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        onOpen={() => setMobileOpen(true)}
        onClose={closeNavMenu}>
        <CloseButton edge="end" fontSize="inherit" onClose={closeNavMenu} />
        <NavMenuWrapper>
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
          <LocaleButtonWrapper>
            <LocaleButton />
          </LocaleButtonWrapper>
          <Box marginTop={3} textAlign="center">
            <DonateButton
              size="large"
              variant="outlined"
              href={routes.campaigns.index}
              endIcon={<FavoriteIcon color="primary" fontSize="medium" />}>
              {t('nav.donatе')}
            </DonateButton>
            <ReportButton />
          </Box>
        </NavMenuWrapper>
      </SwipeableDrawer>
    </Hidden>
  )
}
