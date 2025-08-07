import React, { useEffect } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { SwipeableDrawer, Grid2 } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

import PodkrepiLogo from 'components/common/brand/PodkrepiLogo'
import LocaleButton from '../../LocaleButton'
import DonationMenuMobile from '../DonationMenuMobile'
import ProjectMenuMobile from '../ProjectMenuMobile'
import { AuthLinks } from '../AuthLinks/AuthLinks'
import { routes } from 'common/routes'

import {
  CloseButton,
  DonateButton,
  LocaleButtonWrapper,
  NavMenuWrapper,
  OpenMenuHeader,
} from './MobileNav.styled'

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileNav({ mobileOpen, setMobileOpen }: NavDeckProps) {
  const { t } = useTranslation()

  const router = useRouter()
  const { locale } = useRouter()
  const closeNavMenu = () => setMobileOpen(false)

  // Register route change event handlers
  useEffect(() => {
    router.events.on('routeChangeStart', closeNavMenu)

    return () => {
      router.events.off('routeChangeStart', closeNavMenu)
    }
  }, [])

  return (
    <Grid2 sx={{ display: { xs: 'flex', md: 'none' } }}>
      <SwipeableDrawer
        anchor="right"
        open={mobileOpen}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        onOpen={() => setMobileOpen(true)}
        onClose={closeNavMenu}>
        <NavMenuWrapper>
          <OpenMenuHeader>
            <Link href={routes.index} passHref>
              <PodkrepiLogo locale={locale} variant="adaptive" />
            </Link>
            <CloseButton edge="end" fontSize="large" onClose={closeNavMenu} />
          </OpenMenuHeader>
          <Grid2>
            <DonationMenuMobile />
          </Grid2>
          <Grid2>
            <ProjectMenuMobile />
          </Grid2>
          <AuthLinks />
          <LocaleButtonWrapper>
            <LocaleButton />
          </LocaleButtonWrapper>
          <Grid2 textAlign="center">
            <DonateButton
              size="large"
              variant="outlined"
              href={routes.campaigns.index}
              endIcon={<FavoriteIcon color="primary" fontSize="medium" />}>
              {t('nav.donate')}
            </DonateButton>
          </Grid2>
        </NavMenuWrapper>
      </SwipeableDrawer>
    </Grid2>
  )
}
