import React from 'react'
import { styled, lighten } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericNavMenu from './GenericNavMenu'

const PREFIX = 'DonationMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}

const StyledGenericNavMenu = styled(GenericNavMenu)(({ theme }) => ({
  [`& .${classes.dropdownLinkButton}`]: {
    '&:hover': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
    },
  },

  [`& .${classes.dropdownLinkText}`]: {
    width: '100%',
  },
}))

type NavItem = {
  href: string
  label: string
  enabled?: boolean
}

const allNavItems: NavItem[] = [
  {
    href: routes.campaigns.index,
    label: 'nav.campaigns.all-campaigns',
  },
  {
    href: routes.faq_campaigns, //temporarily lead to FAQ
    label: 'nav.campaigns.create',
  },
]

export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

export default function DonationMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <StyledGenericNavMenu id="menu-donation" label={t('nav.donation-menu')}>
      {navItems.map(({ href, label }, key) => (
        <LinkMenuItem
          href={href}
          selected={router.asPath === href}
          key={key}
          className={classes.dropdownLinkButton}>
          <Typography variant="button" className={classes.dropdownLinkText}>
            {t(label)}
          </Typography>
        </LinkMenuItem>
      ))}
    </StyledGenericNavMenu>
  )
}
