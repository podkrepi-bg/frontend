import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Button, Menu, MenuItem } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { routes } from 'common/routes'
import { featureFlagEnabled, Features } from 'common/util/featureFlag'

export default function DonationMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button
        variant="text"
        color="primary"
        onClick={handleMenu}
        style={{ whiteSpace: 'nowrap' }}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
        {t('nav.donation-menu')}
      </Button>
      <Menu
        keepMounted
        id="menu-donation"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {featureFlagEnabled(Features.CAMPAIGN) && (
          <Link href={routes.campaigns.index} passHref>
            <MenuItem component="a" selected={router.asPath === routes.campaigns.index}>
              {t('nav.campaigns.index')}
            </MenuItem>
          </Link>
        )}
        {featureFlagEnabled(Features.CAMPAIGN) && (
          <Link href={routes.campaigns.create} passHref>
            <MenuItem component="a" selected={router.asPath.startsWith(routes.campaigns.create)}>
              {t('nav.campaigns.create')}
            </MenuItem>
          </Link>
        )}
        <Link href={routes.termsOfService} passHref>
          <MenuItem component="a" selected={router.asPath.startsWith(routes.termsOfService)}>
            {t('components.footer.terms-of-service')}
          </MenuItem>
        </Link>
        <Link href={routes.faq} passHref>
          <MenuItem component="a" selected={router.asPath.startsWith(routes.faq)}>
            {t('nav.faq')}
          </MenuItem>
        </Link>
      </Menu>
    </>
  )
}
